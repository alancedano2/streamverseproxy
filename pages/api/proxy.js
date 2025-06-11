export default async function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const isM3U8 = pathname.endsWith(".m3u8");
  const isTS = pathname.endsWith(".ts");

  const targetUrl = `http://hidra.live:80/live/eufTQNgNXv/ojxBLcjY/334597${isTS ? pathname.split("/proxy")[1] : ".m3u8"}`;

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      res.status(response.status).send("Error cargando el stream");
      return;
    }

    if (isTS) {
      res.setHeader("Content-Type", "video/MP2T");
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } else {
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      let playlist = await response.text();

      // Reemplazar URLs absolutas por el mismo proxy
      playlist = playlist.replace(/(https?:\/\/hidra\.live:80\/live\/eufTQNgNXv\/ojxBLcjY\/334597\/[^\s]+)/g, match => {
        const pathOnly = match.split("/334597")[1]; // /xxxxx.ts
        return `/api/proxy${pathOnly}`;
      });

      res.send(playlist);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el proxy");
  }
}

