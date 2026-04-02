import React from "react";
import { useEffect, useState } from "react";
import { Label, Stack, Heading, Text, Flash } from "@primer/react";
import { CodeOfConductIcon, FeedMergedIcon, FeedStarIcon } from "@primer/octicons-react";
import { AuroraText } from "@/components/ui/aurora-text.tsx";
import { Marquee } from "@/components/ui/marquee.tsx";

const styles = {
  quote: {
    margin: 0,
    padding: "clamp(12px, 2vw, 16px)",
    borderLeft: "4px solid var(--borderColor-attention-emphasis)",
    borderRadius: 10,
    background: "var(--bgColor-attention-muted)",
    fontStyle: "italic",
    minWidth: 0,
  },
};

const names = [
  "Sofia",
  "Sabrina",
  "Fátima",
  "Francisco",
  "Renato",
  "Lívia",
  "Guilherme",
  "Matheus",
  "Bella",
  "Emma",
  "Lurdes",
  "Silvio",
  "Rafael",
  "Susana",
  "Silvana",
  "Roberto",
  "Ronaldo",
  "Antônio",
  "Allana",
];

const verses = [
  {
    verse:
      '{{name}} disse-lhe: "De onde me conheces?" Jesus respondeu: "Antes que Felipe te chamasse, quando estavas debaixo da figueira, eu te vi."',
    passage: "João 1,48",
  },
  {
    verse: "Não tenhas. medo, {{name}}, pois eu te resgatei, chamei-te pelo teu nome, tu és meu!",
    passage: "Isaías 43,1",
  },
  {
    verse:
      'Caminhando junto ao mar da Galileia, Jesus viu {{name}} e seu irmão. Estavam lançando as rede ao mar, pois eram pescadores. Jesus lhes disse: "Vinde após mim, e eu farei de vós pescadores de homens."',
    passage: "João 4, 18-19",
  },
];

const getRandomName = () => {
  return names[Math.floor(Math.random() * names.length)];
};

const firstRow = verses.slice(0, verses.length / 2);
const secondRow = verses.slice(verses.length / 2);
const VerseCard = ({ verse, passage }) => {
  const [randomName, setRandomName] = useState(null);

  useEffect(() => {
    setRandomName(getRandomName());
  }, []);

  const renderVerse = () => {
    if (!randomName) return verse; // evita mismatch inicial

    const parts = verse.split("{{name}}");

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <span style={{ color: "#38bdf8", fontWeight: 600 }}>{randomName}</span>}
      </React.Fragment>
    ));
  };

  return (
    <Flash>
      <Stack gap="condensed" style={{ width: 500, padding: "clamp(12px, 2vw, 16px)" }}>
        <Text as="p" size="medium" weight="light" style={{ color: "#8892B0" }}>
          {renderVerse()}
        </Text>

        <Text as="span" size="small" weight="medium" style={{ color: "#FF0080" }}>
          {passage}
        </Text>
      </Stack>
    </Flash>
  );
};
export default function Home() {
  return (
    <>
      <Stack gap="normal" style={{ flex: 1, minWidth: 0 }}>
        <Stack gap="normal" style={{ margin: 80 }}>
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
            <Text as="span" weight="light" size="large" style={{ alignSelf: "center", color: "#38bdf8" }}>
              A PALAVRA VIVA EM CADA DETALHE.
            </Text>
            <Text as="span" weight="light" size="large" style={{ alignSelf: "center", color: "#8892B0" }}>
              Estamos construindo o futuro da leitura bíblica: imersiva, comunitária e profundamente fiel à Tradição.
            </Text>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:40s]">
                {firstRow.map((verse) => (
                  <VerseCard key={verse.username} {...verse} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:40s]">
                {secondRow.map((verse) => (
                  <VerseCard key={verse.username} {...verse} />
                ))}
              </Marquee>
              <div className="from-[var(--bgColor-default)] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
              <div className="from-[var(--bgColor-default)] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
            <Stack style={styles.quote}>
              <Text color="fg.default">
                O{" "}
                <Text as="strong" color="fg.default">
                  Lumina Escritura
                </Text>{" "}
                nasce para romper a barreira entre o leitor e o texto sagrado. Imagine abrir sua Bíblia e ver que a
                mensagem de Cristo é dirigida nominalmente a você, enquanto conta com o suporte de uma comunidade de
                estudos privada e a sabedoria milenar de Santo Agostinho e São Tomás de Aquino. É mais que um app de
                leitura, é uma imersão na Verdade.
              </Text>
            </Stack>
          </Stack>
          <Stack gap="normal" style={{ flex: 1, minWidth: 0 }}>
            <Heading as="h2" style={{ fontSize: "clamp(1.5rem, 3vw, 1.7rem)" }}>
              O que estamos preparando
            </Heading>
            <Flash>
              <Stack direction="row" gap={2} align="center" style={{ marginBottom: 4 }}>
                <CodeOfConductIcon size={"clamp(1.5rem, 3vw, 1.875rem)"} />
                <Text as="p" style={{ margin: 0, fontWeight: 600 }}>
                  Leitura Imersiva
                </Text>
              </Stack>
              <Text as="p" style={{ margin: "6px 0 0" }}>
                A Palavra de Deus como você nunca viu. Estamos desenvolvendo uma tecnologia exclusiva de personalização
                onde, o nome do leitor é integrado ao texto sagrado, reforçando que a mensagem divina é uma carta de
                amor direta para você.
              </Text>
            </Flash>
            <Flash>
              <Stack direction="row" gap={2} align="center" style={{ marginBottom: 4 }}>
                <FeedMergedIcon size={"clamp(1.5rem, 3vw, 1.875rem)"} />
                <Text as="p" style={{ margin: 0, fontWeight: 600 }}>
                  Comunidades de Estudo e Áreas Exclusivas
                </Text>
              </Stack>
              <Text as="p" style={{ margin: "6px 0 0" }}>
                Sua caminhada em grupo, com total privacidade. Crie áreas exclusivas onde você organiza seus próprios
                sumários, fixa comentários importantes e compartilha marcações que ajudam todos a crescerem juntos na
                fé.
              </Text>
            </Flash>
            <Flash>
              <Stack direction="row" gap={2} align="center" style={{ marginBottom: 4 }}>
                <FeedStarIcon size={"clamp(1.5rem, 3vw, 1.875rem)"} />
                <Text as="p" style={{ margin: 0, fontWeight: 600 }}>
                  Navegação Ágil e Ferramentas de Estudo
                </Text>
              </Stack>
              <Text as="p" style={{ margin: "6px 0 0" }}>
                Encontre o que precisa em poucos cliques. Desenvolvemos um sistema de busca inteligente por versículos,
                marcações coloridas e organização por temas, para que sua leitura seja fluida e você gaste seu tempo no
                que realmente importa: a oração.
              </Text>
            </Flash>
          </Stack>
        </Stack>

        <Stack direction="row" gap={2} align="center" style={{ marginBottom: 4 }}>
          <Text weight="semibold">Deus abencoe e salve Maria.</Text>
          <Text as="span" size="small" weight="light">
            {new Date().getFullYear()} • Lumina Escritura
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
