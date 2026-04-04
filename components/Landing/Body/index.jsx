import { Stack, Heading, Text } from "@primer/react";

export default function BodyContent() {
  return (
    <>
      <Stack>
        <Heading
          as="h2"
          align="center"
          style={{ fontSize: "clamp(1.5rem, 3vw, 1.7rem)", color: "var(--data-blue-color-emphasis)" }}
        >
          Onde a Palavra de Deus chama você pelo nome.
        </Heading>
        <Text
          as="span"
          weight="light"
          size="large"
          style={{
            maxWidth: "var(--breakpoint-medium)",
            textAlign: "center",
            alignSelf: "center",
            color: "var(--fgColor-draft)",
            lineHeight: 1.5,
          }}
        >
          O <Text style={{ fontWeight: "bold" }}>Lumina Escritura</Text> nasce para romper a barreira entre o leitor e o
          texto sagrado. Imagine abrir sua Bíblia e ver que a mensagem de Cristo é dirigida nominalmente a você,
          enquanto conta com o suporte de uma comunidade de estudos privada e a sabedoria milenar de Santo Agostinho e
          São Tomás de Aquino. É mais que um app de leitura, é uma imersão na Verdade.
        </Text>
      </Stack>
    </>
  );
}
