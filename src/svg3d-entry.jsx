import React from "react";
import { createRoot } from "react-dom/client";
import { SVG3D } from "3dsvg";

function AboutExperienceAnimation() {
  return (
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
      width="100%"
      height="100%"
      background="transparent"
    />
  );
}

const mountNode = document.getElementById("svg3d-mount");

if (mountNode) {
  createRoot(mountNode).render(<AboutExperienceAnimation />);
}
