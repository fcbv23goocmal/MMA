# Megan's Macaw Aviary: launch checklist

1. Buy/connect the domain in Vercel, then run: `node setup.mjs --domain yourdomain.com`
2. Google Search Console + Bing Webmaster Tools: add the site, copy each meta tag's content value, run
   `node setup.mjs --google CODE --bing CODE`, redeploy, click Verify, submit https://yourdomain.com/sitemap.xml
3. Optional: `node setup.mjs --indexnow` then submit URLs to IndexNow.
4. Claim the Google Business Profile for Megan's Macaw Aviary (Raleigh, NC) and use the same name and phone as the site.
5. Replace the SAMPLE birds in app.js (BIRDS list) with real birds, and check the 4.9 rating / 7 reviews text on the home page matches Google.
6. Add an EMAIL in config.js if you want an email option (it also becomes the contact point).
7. Vercel dashboard: enable the Firewall / rate limiting and Attack Challenge Mode if needed (a static site has no server code to rate-limit itself).
8. Have a North Carolina attorney review the legal pages, and confirm macaw species rules with USFWS and NC Wildlife Resources Commission.
