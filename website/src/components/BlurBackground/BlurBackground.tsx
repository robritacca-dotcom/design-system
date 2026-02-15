interface BlurBackgroundProps {
  fullHeight?: boolean;
}

export default function BlurBackground({ fullHeight }: BlurBackgroundProps) {
  return (
    <div className={`blur-container${fullHeight ? " blur-container-full" : ""}`}>
      <div className="blur-ellipse blur-yellow" />
      <div className="blur-ellipse blur-green" />
      <div className="blur-ellipse blur-purple" />
      <div className="blur-ellipse blur-neutral" />
      <div className="blur-ellipse blur-blue" />
      <div className="blur-ellipse blur-red" />
      <div className="blur-ellipse blur-orange" />
      <div className="blur-ellipse blur-teal" />
    </div>
  );
}
