import { COUNTRY_HEADER, DECISION_HEADER } from "@/vars";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function getDecision(request?: NextRequest) {
  if (request) {
    return (request.headers.get(DECISION_HEADER) ?? "white") as CloakDecision;
  }

  return ((await headers()).get(DECISION_HEADER) ?? "white") as CloakDecision;
}

export async function getCountry(request?: NextRequest): Promise<string> {
  if (request) {
    return request.headers.get(COUNTRY_HEADER) ?? "UNKNOWN";
  }

  return (await headers()).get(COUNTRY_HEADER) ?? "UNKNOWN";
}

export async function getBaseUrl(request?: NextRequest) {
  if (request) {
    return request.nextUrl.origin;
  }

  return `https://${(await headers()).get("host") ?? "acme.com"}`;
}
