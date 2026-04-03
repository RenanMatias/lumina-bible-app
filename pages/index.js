import React from "react";
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

const verses = [
  {
    verse:
      "||Sabrina|| disse-lhe: 'De onde me conheces?' Jesus respondeu: 'Antes que Filipe te chamasse, quando estavas debaixo da figueira, eu te vi.'",
    passage: "Evangelho de São João 1, 48",
  },
  {
    verse: "Não tenhas medo, ||Sofia||, pois eu te resgatei, chamei-te pelo teu nome, tu és meu!",
    passage: "Isaías 43, 1",
  },
  {
    verse:
      "Caminhando junto ao mar da Galileia, Jesus viu ||Maria|| e seu irmão. Estavam lançando as redes ao mar, pois eram pescadores. Jesus lhes disse: 'Vinde após mim, e eu farei de vós pescadores de homens.'",
    passage: "Evangelho de São Mateus 4, 18-19",
  },
  {
    verse: "||José||, isso te escrevo para que não peques.",
    passage: "Primeira Carta de São João 2, 1",
  },
  {
    verse: "Não vos admireis, ||Ana||, se o mundo vos odeia.",
    passage: "Primeira Carta de São João 3, 13",
  },
  {
    verse:
      "Bem-aventurado és tu, ||João||, quando vos injuriarem e perseguirem e, mentindo, disserem todo mal contra vós por causa de mim.",
    passage: "Evangelho de São Mateus 5, 11",
  },
  {
    verse:
      "||Antônio||, quando orares, entra no teu quarto, fecha a porta e ora a teu Pai, que está em segredo. E teu Pai, que vê o que está em segredo, te retribuirá.",
    passage: "Evangelho de São Mateus 6, 6",
  },
  {
    verse:
      "Então, ||Francisco|| lhe disse: 'Senhor, se és tu, manda-me ir sobre as águas até junto de ti.' Ele respondeu: 'Vem!' ||Francisco|| desceu do barco e começou a andar sobre as águas, em direção a Jesus.",
    passage: "Evangelho de São Mateus 14, 28-29",
  },
  {
    verse:
      "Jesus, então, olhou bem para ||Pedro||, com amor, e disse-lhe: 'Uma só coisa te falta: vai, vende tudo o que tens, dá aos pobres e terás um tesouro no céu. Depois, vem e segue-me.'",
    passage: "Evangelho de São Marcos 10, 21",
  },
  {
    verse:
      "Quando chegou ao lugar, Jesus olhou para cima e disse: '||Carlos||, desce depressa! Hoje eu devo ficar na tua casa.'",
    passage: "Evangelho de São Lucas 19, 5",
  },
  {
    verse:
      "Depois de comerem, Jesus perguntou a ||Lucas||: '||Lucas||, tu me amas mais do que estes?' ||Lucas|| respondeu: 'Sim, Senhor, tu sabes que te amo.' Jesus disse-lhe: 'Apascenta meus cordeiros.'",
    passage: "Evangelho de São João 21, 15",
  },
  {
    verse:
      "Enfim, ||Luiz||, fortalece-te no Senhor, no poder de sua força; reveste-te da armadura de Deus, para que possas resistir às ciladas do diabo.",
    passage: "Carta de São Paulo aos Efésios 6, 10-11",
  },
  {
    verse: "Vinde a mim, ||Paulo||, tu que estás cansado e carregado de fardos, e eu te darei descanso.",
    passage: "Evangelho de São Mateus 11, 28",
  },
  {
    verse: "Não tenhas medo, ||Gabriel||, pois agradou ao teu Pai dar-te o Reino.",
    passage: "Evangelho de São Lucas 12, 32",
  },
  {
    verse:
      "Eu sou a videira, e tu, ||Luísa||, és o ramo. Aquele que permanece em mim, como eu nele, esse dá muito fruto; pois sem mim nada podes fazer.",
    passage: "Evangelho de São João 15, 5",
  },
  {
    verse:
      "||Julia||, não tendes sido provada além do que é humanamente suportável. Deus é fiel e não permitirá que sejais provada acima de vossa força.",
    passage: "Primeira Carta de São Paulo aos Coríntios 10, 13",
  },
  {
    verse:
      "Não tenhas medo, ||Marcos||, pois estou contigo; não te assustes, pois eu sou teu Deus. Eu te dou coragem, eu te ajudo e te sustento com a minha mão justiceira.",
    passage: "Isaías 41, 10",
  },
  {
    verse:
      "Confia no Senhor de todo o teu coração, ||Davi||, e não te apoies em tua própria prudência: pensa nele em todos os teus caminhos, e ele conduzirá os teus passos.",
    passage: "Provérbios 3, 5-6",
  },
  {
    verse:
      "||Adriana||, sê forte e corajosa! Não tenhas medo, nem te apavoreis diante deles. O Senhor, teu Deus, ele vai contigo e não te deixará, nem te abandonará.",
    passage: "Deuteronômio 31, 6",
  },
  {
    verse: "||Rafael||, eis que estou convosco todos os dias, até o fim dos tempos.",
    passage: "Evangelho de São Mateus 28, 20",
  },
];

const firstRow = verses.slice(0, verses.length / 2);
const secondRow = verses.slice(verses.length / 2);
const VerseCard = ({ verse, passage }) => {
  const parts = verse.split("||");

  return (
    <Flash>
      <Stack gap="condensed" style={{ width: 500, padding: "clamp(12px, 2vw, 16px)" }}>
        <Text as="p" size="medium" weight="light" style={{ color: "#8892B0" }}>
          {parts.map((part, index) =>
            index % 2 === 1 ? (
              <Text
                key={index}
                as="span"
                size="medium"
                weight="semibold"
                style={{ color: "var(--bgColor-accent-emphasis)" }}
              >
                {part}
              </Text>
            ) : (
              <React.Fragment key={index}>{part}</React.Fragment>
            ),
          )}
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
              <Marquee pauseOnHover className="[--duration:200s]">
                {firstRow.map((verse) => (
                  <VerseCard key={verse.username} {...verse} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:200s]">
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
