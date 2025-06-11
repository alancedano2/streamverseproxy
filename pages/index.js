import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js";
    script.onload = () => {
      new window.Clappr.Player({
        source: "/api/proxy",
        parentId: "#player",
        autoPlay: true,
        width: "100%",
        height: "480px",
        mute: false,
        playback: {
          hlsjsConfig: {
            xhrSetup: function (xhr) {
              xhr.withCredentials = false;
            }
          }
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ background: "#000", height: "100vh", paddingTop: "50px" }}>
      <h1 style={{ color: "#fff", textAlign: "center" }}>🔴 Transmisión en vivo</h1>
      <div id="player" style={{ maxWidth: "800px", margin: "0 auto" }}></div>
    </div>
  );
}
