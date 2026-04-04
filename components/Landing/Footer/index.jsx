import { Stack, Text } from "@primer/react";

export default function FooterContent() {
  return (
    <>
      <Stack direction="row" gap={2} align="center">
        <Text weight="semibold">Deus abencoe e salve Maria.</Text>
        <Text as="span" size="small" weight="light">
          {new Date().getFullYear()} • Lumina Escritura
        </Text>
      </Stack>
    </>
  );
}
