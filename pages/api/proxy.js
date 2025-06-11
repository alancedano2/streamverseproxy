export default async function handler(req, res) {
  const baseUrl = "http://hidra.live:80/live/eufTQNgNXv/ojxBLcjY/334597";
  const path = req.url.replace("/api/proxy", "");

  const isSegment = path.endsWith(".ts");
  const targetUrl = `${baseUrl}${path || ".m3u8"}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).send("Error al obtener el stream");
    }

    if (isSegment) {
      res.setHeader("Content-Type", "video/MP2T");
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
    } else {
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      let playlist = await response.text();

      // 🔄 Reescribe todas las rutas a través del proxy
      playlist = playlist.replace(/(\d+\.ts)/g, (match) => `/api/proxy/${match}`);
      return res.send(playlist);
    }

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error interno");
  }
}
