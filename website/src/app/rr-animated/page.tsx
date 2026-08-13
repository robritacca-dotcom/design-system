"use client";

import { FullBleedBackground } from "../../components/BlurBackground/BlurBackground";

export default function RrAnimatedPreviewPage() {
  return (
    <>
      <FullBleedBackground />

      <main
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- the source is an animated SVG, and next/image would need images.dangerouslyAllowSVG in next.config.ts to serve it at all. */}
        <img
          src="/logos/rr-animated.svg"
          alt="Animated rr logo"
          width={128}
          style={{ width: "128px", height: "auto" }}
        />
      </main>
    </>
  );
}
