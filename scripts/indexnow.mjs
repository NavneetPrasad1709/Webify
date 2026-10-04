// Tells Bing (and through it ChatGPT search, DuckDuckGo and Yahoo) plus
// Yandex, Seznam and Naver that every URL in the live sitemap has changed.
// Google does not take IndexNow; it reads the sitemap via Search Console.
// Run after a deploy has gone live: `npm run indexnow`.

const HOST = "www.webify.org.in";
const KEY = "4feb207863173016fd94bf65d93f5135"; // served at /<KEY>.txt

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
