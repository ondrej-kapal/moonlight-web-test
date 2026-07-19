// Decap CMS GitHub OAuth relay — step 2: exchange the code for a token and hand it
// back to the CMS window via the postMessage handshake Decap expects.

function popupResponse(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html>
<html><body><script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script></body></html>`;
}

export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send("OAuth is not configured (missing client id/secret).");
    return;
  }

  const { code, state } = req.query;
  const cookieState = (req.headers.cookie ?? "")
    .split(/;\s*/)
    .find((c) => c.startsWith("decap_oauth_state="))
    ?.split("=")[1];

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (!code || !state || state !== cookieState) {
    res.status(400).send(popupResponse("error", { error: "Invalid OAuth state or missing code." }));
    return;
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenRes.json();

    if (!tokenRes.ok || data.error || !data.access_token) {
      res.status(400).send(popupResponse("error", { error: data.error_description ?? "Token exchange failed." }));
      return;
    }

    res.status(200).send(popupResponse("success", { token: data.access_token, provider: "github" }));
  } catch {
    res.status(500).send(popupResponse("error", { error: "Token exchange failed." }));
  }
}
