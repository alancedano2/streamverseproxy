export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>📺 Hidra Stream via HTTPS (Clappr)</h1>
      <div id="player" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}></div>

      <script src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          new Clappr.Player({
            source: "/api/proxy",
            parentId: "#player",
            autoPlay: true,
            width: "100%",
            height: "480px",
            mute: false,
            playback: {
              hlsjsConfig: {
                xhrSetup: function(xhr) {
                  xhr.withCredentials = false;
                }
              }
            }
          });
        `
      }} />
    </div>
  );
}
