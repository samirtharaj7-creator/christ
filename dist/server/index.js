const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin"
};

function mergeHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function fetchAsset(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return env.ASSETS.fetch(new Request(url, request));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === "") pathname = "/index.html";
    if (pathname.endsWith("/")) pathname += "index.html";

    let response = await fetchAsset(request, env, pathname);
    if (response.status !== 404) return mergeHeaders(response);

    const acceptsHtml = (request.headers.get("accept") || "").includes("text/html");
    if (acceptsHtml || !pathname.split("/").pop().includes(".")) {
      response = await fetchAsset(request, env, "/index.html");
      return mergeHeaders(response);
    }

    return new Response("Not found", { status: 404, headers: SECURITY_HEADERS });
  }
};
