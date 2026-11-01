#!/usr/bin/env node
/* One-time launch setup. Run from the site folder:
   node setup.mjs --domain example.com [--google CODE] [--bing CODE] [--indexnow]
   - --domain    replaces YOUR-DOMAIN.com in every page, sitemap, robots, llms.txt, security.txt
   - --google    adds the Google Search Console verification meta tag (the content value only)
   - --bing      adds the Bing Webmaster Tools msvalidate.01 meta tag (the content value only)
   - --indexnow  creates an IndexNow key file in the site root (submit URLs to Bing/Yandex with that key) */
import fs from "node:fs";
import crypto from "node:crypto";
const a = process.argv.slice(2), arg = n => { const i = a.indexOf("--" + n); return i > -1 ? a[i + 1] : null };
const domain = arg("domain"), google = arg("google"), bing = arg("bing");
const safe = v => /^[A-Za-z0-9_-]{8,120}$/.test(v || "");
if (domain && !/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(domain)) { console.error("Domain should look like example.com (no https://, no slash)."); process.exit(1) }
if (google && !safe(google)) { console.error("--google should be only the content value, letters, numbers, - and _"); process.exit(1) }
if (bing && !/^[A-Za-z0-9]{8,64}$/.test(bing)) { console.error("--bing should be only the content value, letters and numbers"); process.exit(1) }
const files = fs.readdirSync(".", { recursive: true }).filter(f => !String(f).startsWith("node_modules") && /\.(html|xml|txt|webmanifest|js)$/.test(f) && f !== "setup.mjs" && !String(f).startsWith("fonts"));
for (const f of files) {
  let s = fs.readFileSync(f, "utf8"), o = s;
  if (domain) s = s.split("YOUR-DOMAIN.com").join(domain.toLowerCase());
  if (f.endsWith(".html")) {
    s = s.replace(/<meta name="(google-site-verification|msvalidate\.01)"[^>]*>\n?/g, m => (google && m.includes("google-")) || (bing && m.includes("msvalidate")) ? "" : m);
    const tags = (google ? `<meta name="google-site-verification" content="${google}">` : "") + (bing ? `<meta name="msvalidate.01" content="${bing}">` : "");
    if (tags) s = s.replace("<!-- verification -->", "<!-- verification -->\n" + tags);
  }
  if (s !== o) fs.writeFileSync(f, s);
}
if (a.includes("--indexnow")) { const k = crypto.randomBytes(16).toString("hex"); fs.writeFileSync(k + ".txt", k); console.log("IndexNow key file written: " + k + ".txt  (key = " + k + ")") }
console.log("Done." + (domain ? " Domain set to " + domain + "." : " No domain given, nothing replaced."));
