import React from "react";

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  style = {},
  ...props
}) {
  const containerStyle = {
    display: "flex",
    gap: "var(--gap, 1rem)",
    overflow: "hidden",
    padding: "8px",
    flexDirection: vertical ? "column" : "row",
    position: "relative",
    "--duration": "40s",
    "--gap": "1rem",
    ...style,
  };

  const itemStyle = {
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-around",
    gap: "var(--gap, 1rem)",
    flexDirection: vertical ? "column" : "row",
    animationDirection: reverse ? "reverse" : "normal",
    animationName: vertical ? "marquee-vertical" : "marquee",
    animationDuration: "var(--duration, 40s)",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  };

  return (
    <div {...props} style={containerStyle} className={`marquee-group ${className}`}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={itemStyle}
            className={`marquee-content ${pauseOnHover ? "pause-on-hover" : ""}`}
            aria-hidden={i > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
