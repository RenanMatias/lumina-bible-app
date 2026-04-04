import { Stack, Heading, Text } from "@primer/react";
import { AuroraText } from "components/ui/aurora-text.jsx";

export default function HeadingContent() {
  return (
    <>
      <Stack gap="normal" style={{ flex: 1, minWidth: 0 }}>
        <Heading
          as="h1"
          style={{
            display: "block",
            fontSize: "clamp(3.5rem, 5vw, 5rem)",
            lineHeight: 1.2,
            fontWeight: "bold",
            letterSpacing: "-0.02em",
            alignSelf: "center",
          }}
        >
          <AuroraText>Lumina Escritura</AuroraText>
        </Heading>
        <Text
          as="span"
          weight="light"
          size="large"
          style={{ alignSelf: "center", color: "var(--data-blue-color-emphasis)" }}
        >
          A PALAVRA VIVA EM CADA DETALHE.
        </Text>
        <Text as="span" weight="light" size="large" style={{ alignSelf: "center", color: "var(--fgColor-draft)" }}>
          Estamos construindo o futuro da leitura bíblica: imersiva, comunitária e profundamente fiel à Tradição.
        </Text>
      </Stack>
    </>
  );
}
