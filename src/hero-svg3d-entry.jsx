import React from "react";
import { createRoot } from "react-dom/client";
import { SVG3D } from "3dsvg";

const mountNode = document.getElementById("hero-svg3d");

function HeroSvg3D() {
  const [smoothness, setSmoothness] = React.useState(0.28);

  React.useEffect(() => {
    const timerId = window.setTimeout(() => {
      setSmoothness(0.45);
    }, 850);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <SVG3D
      text="Si."
      font="Pacifico"
      smoothness={smoothness}
      material="metal"
      metalness={0.9}
      roughness={0.2}
      animate="spin"
      animateSpeed={1.8}
      lightPosition={[0, 8, 4]}
      shadow={false}
      zoom={5.3}
      background="transparent"
      width="100%"
      height="100%"
      intro="none"
    />
  );
}

if (mountNode) {
  createRoot(mountNode).render(<HeroSvg3D />);
}
