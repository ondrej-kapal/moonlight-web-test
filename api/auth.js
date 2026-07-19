// Decap CMS GitHub OAuth relay — step 1: redirect the editor to GitHub's consent page.
// Requires env vars OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET (see api/callback.js).
import crypto from "node:crypto";

export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("OAuth is not configured (missing OAUTH_GITHUB_CLIENT_ID).");
    return;
  }

  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `https://${host}/api/callback`,
    scope: "repo",
    state,
  });

  res.setHeader(
    "Set-Cookie",
    `decap_oauth_state=${state}; HttpOnly; Secure; Path=/api; Max-Age=600; SameSite=Lax`
  );
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
