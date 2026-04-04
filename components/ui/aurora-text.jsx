import React, { memo } from "react";

export const AuroraText = memo(
  ({ children, className = "", colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"], speed = 1 }) => {
    // Estilo para o container principal
    const containerStyle = {
      position: "relative",
      display: "inline-block",
    };

    // Estilo para o texto com efeito Aurora
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

    return (
      <span style={containerStyle} className={className}>
        <span style={srOnlyStyle}>{children}</span>
        <span style={auroraStyle} aria-hidden="true">
          {children}
        </span>

        {/* Injeção da animação keyframes via Tag Style */}
        <style>{`
          @keyframes aurora-text-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </span>
    );
  },
);

AuroraText.displayName = "AuroraText";
