import { type NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { DECISION_HEADER } from "./vars";

const CLOAK_ENDPOINT = "https://cloakit.house/api/v1/check";
const REQUEST_LABEL = "61eb8c9a040ace0e5806f7cb7f050721";
const REQUEST_TIMEOUT_MS = 15000;
const SUCCESS_CODES = new Set([200, 201, 204, 206]);
const IP_HEADER_CANDIDATES = [
  "cf-connecting-ip",
  "true-client-ip",
  "x-real-ip",
  "x-forwarded-for",
  "x-forwarded",
  "x-client-ip",
  "client-ip",
  "forwarded-for",
  "forwarded",
  "forwarded-for-ip",
  "x-cluster-client-ip",
  "x-coming-from",
  "coming-from",
];

type CloakRequestPayload = {
  label: string;
  user_agent: string;
  referer: string;
  query: string;
  lang: string;
  ip_address: string;
};

type CloakResponse = {
  filter_type?: string;
  filter_page?: CloakDecision;
};

export const config = {
  matcher: ["/((?!_next/|api/|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)"],
};

export async function proxy(request: NextRequest): Promise<NextResponse> {
  if (shouldBypass(request)) {
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set(DECISION_HEADER, "offer");
    return response;
  }

  const payload = buildPayload(request);

  let cloakResponse: CloakResponse | null = null;
  let decision: string = "offer";
  let message: string | null = null;

  try {
    cloakResponse = await callCloakApi(payload);
  } catch {
    decision = "error";
    message = "Try again later or contact support.";
  }

  if (cloakResponse) {
    if (cloakResponse.filter_page === "white") {
      decision = "white";
    } else if (cloakResponse.filter_page === "offer") {
      decision = "offer";
    } else {
      decision = "white";
    }
  } else if (!message) {
    decision = "error";
    message = "Try again later or contact support.";
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(DECISION_HEADER, decision);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(DECISION_HEADER, decision);

  return response;
}

function shouldBypass(request: NextRequest): boolean {
  if (env.DISABLE_CLOAK) {
    return true;
  }

  if (request.method === "OPTIONS") {
    return true;
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return true;
  }

  if (pathname === "/favicon.ico") {
    return true;
  }

  if (/\.[^/]+$/.test(pathname)) {
    return true;
  }

  return false;
}

function buildPayload(request: NextRequest): CloakRequestPayload {
  return {
    label: REQUEST_LABEL,
    user_agent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer") ?? "",
    query: request.nextUrl.searchParams.toString(),
    lang: request.headers.get("accept-language") ?? "",
    ip_address: getRealIpAddress(request),
  };
}

async function callCloakApi(payload: CloakRequestPayload): Promise<CloakResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CLOAK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": payload.user_agent,
      },
      body: new URLSearchParams(payload),
      signal: controller.signal,
    });

    if (!SUCCESS_CODES.has(response.status)) {
      return null;
    }

    try {
      return (await response.json()) as CloakResponse;
    } catch {
      return null;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function getRealIpAddress(request: NextRequest): string {
  for (const headerName of IP_HEADER_CANDIDATES) {
    const values = request.headers.get(headerName);
    if (!values) {
      continue;
    }

    for (const rawIp of values.split(",")) {
      const ip = normalizeIp(rawIp.trim());
      if (isValidPublicIp(ip)) {
        return ip;
      }
    }
  }

  const directIp = normalizeIp((request as { ip?: string | null }).ip ?? "");
  if (isValidPublicIp(directIp)) {
    return directIp;
  }

  const fallback =
    normalizeIp(request.headers.get("x-real-ip") ?? "") ||
    normalizeIp(request.headers.get("remote_addr") ?? "") ||
    "0.0.0.0";

  return fallback;
}

function normalizeIp(ip: string): string {
  if (ip.startsWith("::ffff:")) {
    return ip.slice(7);
  }
  return ip;
}

function isValidPublicIp(ip: string): boolean {
  if (!ip) {
    return false;
  }

  if (ip.includes(":")) {
    const value = ip.toLowerCase();
    if (value === "::1") {
      return false;
    }
    if (value.startsWith("fe80") || value.startsWith("fc") || value.startsWith("fd")) {
      return false;
    }
    return true;
  }

  const parts = ip.split(".");
  if (parts.length !== 4) {
    return false;
  }

  const octets = parts.map((part) => Number.parseInt(part, 10));
  if (octets.some((octet) => Number.isNaN(octet) || octet < 0 || octet > 255)) {
    return false;
  }

  const [a, b] = octets;

  if (a === 10 || a === 127 || a === 0) {
    return false;
  }

  if (a === 169 && b === 254) {
    return false;
  }

  if (a === 192 && b === 168) {
    return false;
  }

  if (a === 172 && b >= 16 && b <= 31) {
    return false;
  }

  if (a === 100 && b >= 64 && b <= 127) {
    return false;
  }

  return true;
}
