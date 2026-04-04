import React from "react";
import { Stack, Heading } from "@primer/react";
import { CodeOfConductIcon, FeedMergedIcon, FeedStarIcon, CommandPaletteIcon } from "@primer/octicons-react";
import FeatureCard from "../../FeatureCard/index.js";

export default function FeatureContent() {
  return (
    <Stack gap="normal" style={{ marginBlock: 50, flex: 1, minWidth: 0 }}>
      <Heading
        as="h2"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: "clamp(1.5rem, 3vw, 1.7rem)",
          color: "var(--fgColor-default)",
        }}
      >
        <CommandPaletteIcon size={24} style={{ color: "var(--data-blue-color-emphasis)", flexShrink: 0 }} />
        <span>O que estamos preparando</span>
      </Heading>

      <FeatureCard
        featured
        icon={CodeOfConductIcon}
        title="Leitura Imersiva"
        description="A Palavra de Deus como você nunca viu. Estamos desenvolvendo uma tecnologia exclusiva de personalização onde o nome do leitor é integrado ao texto sagrado, reforçando que a mensagem divina é uma carta de amor direta para você."
      />

      <FeatureCard
        featured
        icon={FeedMergedIcon}
        title="Comunidades de Estudo e Áreas Exclusivas"
        description="Sua caminhada em grupo, com total privacidade. Crie áreas exclusivas onde você organiza seus próprios sumários, fixa comentários importantes e compartilha marcações que ajudam todos a crescerem juntos na fé."
      />

      <FeatureCard
        featured
        icon={FeedStarIcon}
        title="Navegação Ágil e Ferramentas de Estudo"
        description="Encontre o que precisa em poucos cliques. Desenvolvemos um sistema de busca inteligente por versículos, marcações coloridas e organização por temas, para que sua leitura seja fluida e você gaste seu tempo no que realmente importa: a oração."
      />
    </Stack>
  );
}
