"use client";

import BlurBackground from "../../components/BlurBackground/BlurBackground";

export default function RrAnimatedPreviewPage() {
  return (
    <>
      <BlurBackground fullHeight />

      <main
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
