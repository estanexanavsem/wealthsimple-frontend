export const CHAT_SCRIPT = `
var onWebChat={ar:[], set: function(a,b){if (typeof onWebChat_==='undefined'){this.ar.
push([a,b]);}else{onWebChat_.set(a,b);}},get:function(a){return(onWebChat_.get(a));},
w:(function(){ var ga=document.createElement('script'); ga.type = 'text/javascript';
ga.async=1;ga.src=('https:'==document.location.protocol?'https:':'http:') +
'//www.onwebchat.com/clientchat/a24554ac11aad668eb5675c08035ef39';var s=
document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})()}
`;
