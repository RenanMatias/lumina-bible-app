import React, { memo } from "react";

const DEFAULT_COLORS = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"];

const containerStyle = {
  position: "relative",
  display: "inline-block",
};

// Estilo para leitores de tela (substitui o sr-only do tailwind)
const srOnlyStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
};

// Os keyframes `aurora-text-move` ficam em styles/globals.css.
export const AuroraText = memo(({ children, className = "", colors = DEFAULT_COLORS, speed = 1 }) => {
  const auroraStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    backgroundSize: "200% auto",
    position: "relative",
    animation: `aurora-text-move ${10 / speed}s linear infinite`,
  };

  return (
    <span style={containerStyle} className={className}>
      <span style={srOnlyStyle}>{children}</span>
      <span style={auroraStyle} className="aurora-text" aria-hidden="true">
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = "AuroraText";
