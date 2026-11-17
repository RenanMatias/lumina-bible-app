# Lumina Bible App

Lumina é uma plataforma de estudo da Bíblia moderna e minimalista, voltada para leitura profunda, marcações coloridas (highlights) e comentários pessoais. Lema: _"Shed light on the Word."_

Esta versão do Next.js tem mudanças incompatíveis com versões anteriores. Consulte `node_modules/next/dist/docs/` antes de escrever código que dependa de APIs do Next. O `next dev` pode inserir neste arquivo um bloco próprio com instruções, delimitado por `<!-- BEGIN:nextjs-agent-rules -->` e `<!-- END:nextjs-agent-rules -->`; não o remova.

## Stack

- **Next.js 16** (Pages Router) + **React 19**
- **Primer React** (`@primer/react`, `@primer/octicons-react`) como design system
- **PostgreSQL** via Docker (`infra/compose.yaml`), acessado com `pg` em SQL puro (sem ORM)
- **node-pg-migrate** para migrations (`infra/migrations/`)
- **next-connect** para os handlers da API e **SWR** para buscar dados no cliente
- **Jest** para testes unitários e de integração
- Node **24** (definido em `engines`)

## Comandos

- `npm run dev`: sobe o Docker, espera o Postgres, roda as migrations e inicia o `next dev`
- `npm test`: sobe os serviços e roda `next dev` junto com o Jest (`--runInBand`)
- `npm run test:watch`: Jest em modo watch (os serviços precisam estar no ar)
- `npm run migrations:create <nome>` / `npm run migrations:up`
- `npm run lint:prettier:check`, `npm run lint:eslint:check`
- `npm run commit`: commit guiado pelo commitizen

Os commits seguem **Conventional Commits** (husky + commitlint), por exemplo `feat:`, `fix:`, `style:`.

## Estrutura

- `pages/`: rotas, com URLs em português (`/biblia`, `/cadastro`, `/termos-de-uso`)
- `pages/api/v1/`: API REST versionada
- `models/`: regras de negócio e acesso ao banco
- `components/`: componentes de UI, cada um em sua pasta com um arquivo `index` e estilos em `styles.module.css` (CSS Modules)
- `interface/`: layouts das páginas
- `hooks/`: hooks React
- `infra/`: Docker Compose, migrations e scripts de infraestrutura
- `tests/`: `orchestrator.js` (helpers de teste), `unit/` e `integration/`

## Convenções

- Navegação no cliente com `router.push` (não use `location.href` nem `redirect` em componentes)
- Use os componentes do Primer antes de criar UI própria
- Todo endpoint novo deve ter testes de integração em `tests/integration/api/v1/...`, espelhando a estrutura de `pages/api/v1/`

## Visão do produto

O Lumina (Lumina Escritura) será um lugar para ler a Palavra de Deus em comunidade, fiel aos valores cristãos e à tradição da Igreja Católica. Use esta seção para orientar decisões de modelagem e de produto.

### Pilares

- **Comentários públicos** organizados em quatro níveis: a Bíblia como um todo, os testamentos, os livros e os capítulos.
- **Curadoria de comentários** em duas etapas. Uma IA analisa primeiro; se ela rejeitar, uma pessoa revisa. Comentários ofensivos ou desalinhados com os valores cristãos são rejeitados.
- **Área exclusiva de estudos** para assinantes. Assinantes especiais podem convidar outros usuários e formar um grupo de estudos particular, em que só aparecem os comentários autorizados pelo organizador. Os membros podem escrever o próprio sumário de cada livro e fazer marcações na Bíblia para o grupo ver e entender a mensagem.
- **Estudos alinhados aos doutores da Igreja**, como Santo Agostinho e São Tomás de Aquino.
- **Leitura imersiva**: o nome do apóstolo central do capítulo é trocado pelo nome do leitor, para que ele perceba que a Palavra é dirigida a ele. Essa versão também poderá ser comprada impressa.
- **Influenciadores católicos** entram gratuitamente como membros especiais, com tratamento prioritário, para ajudar na divulgação.
- **Várias traduções e idiomas** da Bíblia, como as versões da CNBB e da Ave Maria.

### Níveis de usuário

**Anônimo** (sem login)

- Lê a Bíblia em todas as versões e idiomas disponíveis
- Lê os comentários

**Padrão** (grátis)

- Tudo do anônimo
- Reage aos comentários de outros usuários com um conjunto selecionado de emojis
- Escreve comentários, que passam pela curadoria em duas etapas
- Usa a leitura imersiva
- Destaca versículos e adiciona notas e tags aos destaques
- Pode comprar a Bíblia impressa na versão imersiva, com o próprio nome no lugar do apóstolo central de cada capítulo

**Assinante**

- Tudo do padrão
- Perfil verificado
- Comentários com peso maior, para aparecerem em destaque
- Área exclusiva de estudos individual

**Assinante especial**

- Tudo do assinante
- Convida outros usuários para a sua área exclusiva e forma um grupo de estudos
- Escreve descrições próprias para cada capítulo
- Adiciona tags a cada capítulo, para facilitar a busca por assunto
- Fixa comentários na sua área exclusiva
- Faz marcações de destaque para os outros membros consultarem

| Recurso                            | Anônimo | Padrão (grátis) |    Assinante     | Assinante especial |
| ---------------------------------- | :-----: | :-------------: | :--------------: | :----------------: |
| Leitura da Bíblia (várias versões) |   ✅    |       ✅        |        ✅        |         ✅         |
| Ver comentários públicos           |   ✅    |       ✅        |        ✅        |         ✅         |
| Interagir com emojis e comentar    |   ❌    |  ✅ (moderado)  | ✅ (prioritário) |         ✅         |
| Marcações, notas e tags            |   ❌    |       ✅        |        ✅        |         ✅         |
| Perfil verificado                  |   ❌    |       ❌        |        ✅        |         ✅         |
| Área exclusiva de estudos          |   ❌    |       ❌        | ✅ (individual)  |    ✅ (grupal)     |
| Gestão de grupos e convites        |   ❌    |       ❌        |        ❌        |         ✅         |
| Sumário próprio por livro          |   ❌    |       ❌        |        ❌        |         ✅         |

### Funcionalidades gerais

1. **Navegação rápida pela Palavra**: Testamento > Livro > Capítulo > Versículo, chegando a qualquer ponto com poucos cliques. Inclui busca por referência no formato católico, por exemplo `Gn 1,12-15.20`.
2. **Marcações e destaques de versículos** com opção de cores.
3. **Organização das marcações** por data, por livro em ordem alfabética, pela ordem dos livros na Bíblia e por cor.
4. **Liturgia diária.**
5. **Mensagens diárias** dos doutores da Igreja.
