import { Label, Stack, Heading, Text } from "@primer/react";
import { AuroraText } from "@/components/ui/aurora-text.tsx";

export default function HeadingContent() {
  return (
    <>
      <Label variant="attention" style={{ alignSelf: "start", marginBottom: 20 }}>
        Em construcao
      </Label>
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
        <Text as="span" weight="light" size="large" className="text-center self-center text-sky-400">
          A PALAVRA VIVA EM CADA DETALHE.
        </Text>
        <Text as="span" weight="light" size="large" className="self-center text-slate-400">
          Estamos construindo o futuro da leitura bíblica: imersiva, comunitária e profundamente fiel à Tradição.
        </Text>
      </Stack>
    </>
  );
}
