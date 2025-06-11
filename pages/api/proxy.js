export default async function handler(req, res) {
  const baseStreamUrl = "http://hidra.live:80/live/eufTQNgNXv/ojxBLcjY/334597";
  const { url } = req;

  const pathname = url.split("/api/proxy")[1] || "";
  const isTS = pathname.endsWith(".ts");
  const targetUrl = `${baseStreamUrl}${pathname || ".m3u8"}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).send("Error al cargar el stream");
    }

    if (isTS) {
      res.setHeader("Content-Type", "video/MP2T");
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
    } else {
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      let playlist = await response.text();

      // Reescribir URLs absolutas del playlist para usar el proxy
      playlist = playlist.replace(/(334597\/[^\s]+)/g, "/api/proxy/$1");

      return res.send(playlist);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del proxy");
  }
}
