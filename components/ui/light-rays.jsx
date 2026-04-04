import { useEffect, useState } from "react";

const createRays = (count, cycle) => {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    };
  });
};

const Ray = ({ left, rotate, width, swing, delay, duration, intensity }) => {
  return (
    <div
      className="pure-light-ray"
      style={{
        "--ray-left": `${left}%`,
        "--ray-rotate": `${rotate}deg`,
        "--ray-rotate-from": `${rotate - swing}deg`,
        "--ray-rotate-to": `${rotate + swing}deg`,
        "--ray-width": `${width}px`,
        "--ray-intensity": intensity,
        "--ray-duration": `${duration}s`,
        "--ray-delay": `${delay}s`,
      }}
    />
  );
};

export function LightRays({
  className = "",
  style = {},
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}) {
  const [rays, setRays] = useState([]);
  const cycleDuration = Math.max(speed, 0.1);

  useEffect(() => {
    setRays(createRays(count, cycleDuration));
  }, [count, cycleDuration]);

  const containerStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
    isolation: "isolate",
    "--light-rays-color": color,
    "--light-rays-blur": `${blur}px`,
    "--light-rays-length": length,
    ...style,
  };

  return (
    <div ref={ref} style={containerStyle} className={className} {...props}>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Gradientes de ambiência */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            background: `radial-gradient(circle at 20% 15%, var(--light-rays-color), transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            background: `radial-gradient(circle at 80% 10%, var(--light-rays-color), transparent 75%)`,
          }}
        />

        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  );
}
