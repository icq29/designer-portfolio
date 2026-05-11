import React from "react";
import { createRoot } from "react-dom/client";
import { SVG3D } from "3dsvg";

const mountNode = document.getElementById("hero-svg3d");

if (mountNode) {
  createRoot(mountNode).render(
    <SVG3D
      text="Si."
      font="Pacifico"
      smoothness={0.6}
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
