import { Stack, Heading } from "@primer/react";
import { MainTemplate } from "templates/MainTemplate/index.jsx";

export default function TermsOfUse() {
  return (
    <MainTemplate>
      <Stack>
        <Heading as="h1" variant="large">
          Termos de Uso e Privacidade
        </Heading>
        <span>Ao utilizar o Lumina Escritura você está de acordo com os seguintes termos:</span>
        <Mission /> {/* 1. Missão e Valor Concreto */}
        <FreeSpace /> {/* 2. Um Espaço Livre e Protegido */}
        <Privacy /> {/* 3. Privacidade, Proteção de Dados e Comunicações */}
        <Curated /> {/* 4. Curadoria e Convivência */}
        <Posture /> {/* 5. Postura e Caridade na Verdade */}
        <Zelo /> {/* 6. Zelo pelo Espaço de Estudo */}
        <Respect /> {/* 7. Respeito à Dignidade Humana */}
        <Security /> {/* 8. Segurança e Honestidade */}
        <UserRights /> {/* 9. Direitos sobre o Conteúdo do Usuário */}
        <IntellectualProperty /> {/* 10. Propriedade Intelectual e Código-Fonte */}
        <Protection /> {/* 11. Proteção dos Textos Bíblicos e Traduções */}
        <Guarantee /> {/* 12. Garantias e Disponibilidade */}
        <Assets /> {/* 13. Ativos e Funcionalidades Virtuais */}
        <TechnicalResponsibility /> {/* 14. Responsabilidade Técnica */}
        <SubscriptionsCancellationsRefunds /> {/* 15. Assinaturas, Cancelamentos e Reembolsos */}
        <DeletionAndLGPD /> {/* 16. Exclusão de Conta e LGPD */}
        <LegalCapacity /> {/* 17. Idade Mínima e Capacidade Legal */}
        <JurisdictionLaw /> {/* 18. Foro e Legislação Aplicável */}
        <Changes /> {/* 19. Alterações nos Termos de Uso */}
      </Stack>
    </MainTemplate>
  );
}

function Title({ children }) {
  return (
    <Heading as="h2" variant="medium">
      {children}
    </Heading>
  );
}

function Mission() {
  return (
    <>
      <Title>1. Missão e Valor Concreto</Title>
      <span>
        O <strong>Lumina Escritura</strong> tem como objetivo principal servir como uma plataforma de
        <strong>imersão bíblica e comunidade acadêmica-espiritual</strong>, oferecendo conteúdos de valor concreto para
        quem busca o aprofundamento na Palavra de Deus.
      </span>

      <span>Consideramos conteúdos de valor concreto:</span>

      <ul>
        <li>Comentários que auxiliem na exegese e compreensão dos textos sagrados.</li>
        <li>Resumos e sumários que facilitem o estudo individual ou em grupo.</li>
        <li>
          Interações que respeitem e promovam os <strong>valores cristãos</strong>.
        </li>
      </ul>
      <span>
        Daremos preferência à <strong>qualidade e à fidelidade doutrinária</strong> sobre a quantidade. Nosso objetivo é
        que cada minuto passado no Lumina Escritura contribua para que o usuário perceba que a Palavra de Deus é
        dirigida pessoalmente a ele.
      </span>
    </>
  );
}

function FreeSpace() {
  return (
    <>
      <Title>2. Um Espaço Livre e Protegido</Title>
      <span>O Lumina Escritura é um ambiente digital que:</span>
      <ul>
        <li>
          <strong>Nunca</strong> aplicará práticas malignas de engajamento ou algoritmos viciantes.
        </li>
        <li>
          <strong>Nunca</strong> exibirá anúncios de terceiros que poluam a experiência de leitura imersiva.
        </li>
        <li>
          <strong>Sempre</strong> protegerá o usuário para que ele tenha clareza mental e foco total na leitura e no
          estudo das Sagradas Escrituras.
        </li>
      </ul>
    </>
  );
}

function Privacy() {
  return (
    <>
      <Title>3. Privacidade, Proteção de Dados e Comunicações</Title>
      <span>Seguindo o princípio da minimização e em conformidade com a LGPD, o Lumina Escritura:</span>
      <ul>
        <li>Nunca venderá os dados de seus usuários a anunciantes ou corretores de dados.</li>
        <li>
          Nunca compartilhará informações com terceiros, exceto quando estritamente necessário para o processamento de
          pagamentos de assinaturas (via parceiros como Stripe, Apple ou Google).
        </li>
        <li>
          Coletará apenas o fundamental: Nome, e-mail e dados básicos de perfil (como sexo biológico, para fins de
          tratamento e estatística interna) para identificação, gestão de tiers (Padrão, Assinante, Especial ou
          Influence) e segurança da conta.
        </li>
        <li>
          Utilizará tecnologias locais (como tokens de sessão/cookies essenciais) única e exclusivamente para manter o
          usuário conectado e garantir o funcionamento seguro do aplicativo.
        </li>
        <li>
          Ao se cadastrar, o usuário concorda em receber e-mails transacionais estritamente relacionados à sua conta
          (segurança, faturamento, avisos de curadoria e atualizações críticas do serviço).
        </li>
      </ul>
    </>
  );
}

function Curated() {
  return (
    <>
      <Title>4. Curadoria e Convivência</Title>
      <span>
        Para garantir que o ambiente permaneça saudável e alinhado aos princípios cristãos, todos os comentários
        públicos passarão por um processo de curadoria:
      </span>
      <ul>
        <li>
          <strong>Etapa 1:</strong> Análise por Inteligência Artificial.
        </li>
        <li>
          <strong>Etapa 2:</strong> Se houver dúvida ou rejeição inicial, uma avaliação humana será realizada para
          garantir a justiça e o respeito ao conteúdo.
        </li>
        <li>
          Conteúdos ofensivos ou que firam os valores da comunidade serão rejeitados para preservar a integridade do
          ecossistema.
        </li>
        <li>
          <strong>Direito de Remoção:</strong> O Lumina Escritura reserva-se o direito soberano de remover qualquer
          comentário, publicação ou sumário, bem como restringir contas a qualquer momento e a seu exclusivo critério,
          caso identifique violações a estes termos ou risco à integridade da plataforma, sem necessidade de aviso
          prévio.
        </li>
      </ul>
    </>
  );
}

function Posture() {
  return (
    <>
      <Title>5. Postura e Caridade na Verdade</Title>
      <span>
        O usuário do Lumina Escritura busca o crescimento espiritual e o rigor acadêmico. O termômetro para suas
        interações é a <strong>edificação</strong>: suas palavras estão aproximando os irmãos da compreensão das
        Escrituras ou estão gerando discórdia e confusão?
      </span>
      <span>
        Qualquer usuário que, através de seus comentários ou publicações, utilize o espaço para promover ataques
        pessoais, sarcasmo contra a fé ou contra membros da comunidade, ou que mantenha uma postura agressiva, poderá
        ter sua conta permanentemente bloqueada. O objetivo é preservar um ambiente de paz e reverência à Palavra.
      </span>
    </>
  );
}

function Zelo() {
  return (
    <>
      <Title>6. Zelo pelo Espaço de Estudo</Title>
      <span>
        O Lumina Escritura é um &quot;Santuário Digital&quot;. Para manter a integridade deste ambiente, o usuário se
        compromete a:
      </span>
      <ul>
        <li>
          <strong>Não desviar o propósito:</strong> O foco deve ser sempre o estudo bíblico e teológico. O uso dos
          comentários para fins puramente comerciais, propaganda política ou disseminação de conteúdos que não possuam
          relação com a Palavra de Deus é estritamente proibido.
        </li>
        <li>
          <strong>Integridade das Interações:</strong> O usuário entende que a relevância de um comentário deve ser
          orgânica. Qualquer tentativa de manipular curtidas, destaques ou qualificações de forma artificial resultará
          em banimento.
        </li>
        <li>
          <strong>Privacidade Absoluta:</strong> É proibido utilizar qualquer técnica de rastreamento (<em>tracking</em>
          ) ou coleta de dados de outros usuários dentro da plataforma. Respeitamos o silêncio e a privacidade de cada
          estudante.
        </li>
        <li>
          <strong>Grupos Privados (Áreas Exclusivas):</strong> Usuários do plano Assinante Especial que gerenciam grupos
          de estudo assumem a responsabilidade de zelar pela boa convivência em seus espaços. O Lumina Escritura não
          monitora proativamente os comentários de grupos privados, mas atuará de forma incisiva (com remoção de
          conteúdo e banimento) caso receba denúncias de violações a estes termos dentro dessas áreas.
        </li>
      </ul>
    </>
  );
}

function Respect() {
  return (
    <>
      <Title>7. Respeito à Dignidade Humana</Title>
      <span>
        Em consonância com os valores cristãos, estão <strong>estritamente proibidos</strong> atos discriminatórios de
        qualquer natureza. O Lumina Escritura não tolera discursos de ódio, segregação ou ofensas baseadas em raça, cor,
        sexo, classe social, limitações físicas ou qualquer outra forma de desrespeito à imagem de Deus no próximo.
      </span>
    </>
  );
}

function Security() {
  return (
    <>
      <Title>8. Segurança e Honestidade</Title>
      <span>
        Se um usuário encontrar qualquer falha técnica ou vulnerabilidade que exponha dados de terceiros ou o
        funcionamento do sistema, ele assume o compromisso de agir com honestidade e reportar o problema de forma{" "}
        <strong>privada</strong> ao e-mail: <code>seguranca@luminaescritura.com.br</code>.
      </span>
      <span>O Lumina Escritura se compromete a:</span>
      <ol>
        <li>
          Tratar o erro com transparência, publicando um relato (<em>Postmortem</em>) sobre o que aconteceu e como foi
          resolvido, sem esconder as falhas da comunidade, mas sempre protegendo os dados sensíveis dos usuários.
        </li>
      </ol>
    </>
  );
}

function UserRights() {
  return (
    <>
      <Title>9. Direitos sobre o Conteúdo do Usuário</Title>
      <span>
        O usuário possui os direitos autorais sobre os conteúdos que publicou na plataforma (como comentários, notas e
        sumários próprios) e se responsabiliza integralmente por eles.
      </span>
      <ul>
        <li>
          Ao publicar, o usuário declara possuir os direitos de uso do conteúdo ou que este se enquadra dentro das
          limitações aos direitos de autor (Fair Use), conforme a Lei de Direitos Autorais (LDA).
        </li>
        <li>
          O usuário concede ao Lumina Escritura uma licença gratuita e não exclusiva para exibir esse conteúdo dentro do
          ecossistema da plataforma, respeitando as configurações de privacidade (áreas públicas ou exclusivas).
        </li>
      </ul>
    </>
  );
}

function IntellectualProperty() {
  return (
    <>
      <Title>10. Propriedade Intelectual e Código-Fonte</Title>
      <span>
        A marca <strong>Lumina Escritura</strong>, junto ao serviço, ao design da interface e ao domínio{" "}
        <code>luminaescritura.com.br</code> (ou equivalente), são propriedades intelectuais exclusivas de{" "}
        <strong>66.263.177 RENAN DO NASCIMENTO MATIAS</strong>, CNPJ <strong>66.263.177/0001-99</strong>.
      </span>
      <ul>
        <li>
          Diferente de outros projetos, o sistema que sustenta o Lumina Escritura é um{" "}
          <strong>software de código-fonte privado</strong>.
        </li>
        <li>
          É estritamente proibida qualquer tentativa de engenharia reversa, cópia do código-fonte ou reprodução da
          arquitetura do sistema sem autorização prévia e por escrito dos proprietários.
        </li>
      </ul>
    </>
  );
}

function Protection() {
  return (
    <>
      <Title>11. Proteção dos Textos Bíblicos e Traduções</Title>
      <span>
        O usuário entende que o Lumina Escritura utiliza traduções da Bíblia oficiais que são de propriedade de seus
        respectivos detentores de direitos autorais e são disponibilizadas sob licença ou autorização específica.
      </span>
      <ul>
        <li>
          O acesso a esses textos é destinado exclusivamente para leitura, estudo e uso espiritual pessoal dentro da
          plataforma.
        </li>
        <li>
          É estritamente proibida a cópia em massa, extração automatizada de dados (scraping), reprodução comercial ou
          redistribuição dos textos bíblicos licenciados fora do ambiente do aplicativo.
        </li>
      </ul>
    </>
  );
}

function Guarantee() {
  return (
    <>
      <Title>12. Garantias e Disponibilidade</Title>
      <span>
        O <strong>Lumina Escritura</strong> é um projeto dedicado à imersão nas Sagradas Escrituras. Embora busquemos a
        excelência técnica e a estabilidade do sistema, o serviço é oferecido &quot;como está&quot; e &quot;conforme
        disponível&quot;.
      </span>
      <ul>
        <li>
          <strong>Disponibilidade:</strong> Não oferecemos garantias absolutas de disponibilidade ininterrupta do
          serviço (uptime). Fatores externos, manutenções necessárias ou falhas em provedores de infraestrutura podem
          causar instabilidades temporárias.
        </li>
        <li>
          <strong>Suporte:</strong> O suporte aos usuários é realizado de forma humana e dedicada através dos canais
          oficiais. Usuários dos planos <strong>Assinante</strong> e <strong>Assinante Especial</strong> possuem
          prioridade no tempo de resposta para questões técnicas e de faturamento.
        </li>
        <li>
          <strong>Natureza do Conteúdo:</strong> As interpretações, notas, sumários e comentários gerados por usuários
          ou pela curadoria são de caráter espiritual, acadêmico e informativo. O Lumina Escritura não se responsabiliza
          por conclusões teológicas individuais ou pelo uso que o usuário faz das informações obtidas na plataforma.
        </li>
        <li>
          <strong>Salvaguarda de Dados:</strong> Embora a equipe técnica empregue as melhores práticas e rotinas de
          backup para proteger as informações, o Lumina Escritura não se responsabiliza por perdas acidentais de
          anotações, destaques, sumários ou configurações resultantes de falhas sistêmicas de força maior. É recomendado
          que os usuários mantenham cópias pessoais de estudos de altíssimo valor.
        </li>
      </ul>
    </>
  );
}

function Assets() {
  return (
    <>
      <Title>13. Ativos e Funcionalidades Virtuais</Title>
      <span>
        Diferente de sistemas com moedas virtuais, os &quot;ativos&quot; do Lumina Escritura (como o selo de{" "}
        <strong>Perfil Verificado</strong>, o <strong>Sumário Próprio</strong> ou o acesso à{" "}
        <strong>Área Exclusiva</strong>) possuem validade e utilidade exclusivamente dentro do ecossistema da
        plataforma.
      </span>
      <ul>
        <li>
          Essas funcionalidades não possuem valor de troca, lastro financeiro ou vínculo com ativos da economia real.
        </li>
        <li>
          A manutenção desses ativos está condicionada à permanência do usuário dentro das{" "}
          <strong>Regras de Conduta</strong> e, nos casos aplicáveis, à manutenção da assinatura ativa.
        </li>
      </ul>
    </>
  );
}

function TechnicalResponsibility() {
  return (
    <>
      <Title>14. Responsabilidade Técnica</Title>
      <span>
        Apesar de utilizarmos tecnologias de ponta para curadoria (IA) e processamento de dados, não podemos garantir
        que o sistema esteja 100% livre de imprecisões ou erros técnicos. Caso o usuário identifique qualquer
        comportamento inesperado, o compromisso da comunidade e da equipe Lumina é trabalhar para a correção o mais
        breve possível.
      </span>
      <span>
        <strong>Links de Terceiros:</strong> Áreas de comentários e grupos de estudo podem conter links inseridos pelos
        próprios usuários direcionando para sites externos. O Lumina Escritura não endossa, não controla e não se
        responsabiliza pelo conteúdo, políticas de privacidade ou segurança dessas plataformas de terceiros.
      </span>
    </>
  );
}

function SubscriptionsCancellationsRefunds() {
  return (
    <>
      <Title>15. Assinaturas, Cancelamentos e Reembolsos</Title>
      <span>
        Para os usuários que optarem pelos planos pagos (Assinante ou Assinante Especial), o processamento será feito
        por plataformas seguras de terceiros (como Stripe, Apple App Store ou Google Play).
      </span>
      <ul>
        <li>
          Renovação Automática: As assinaturas são renovadas automaticamente ao fim de cada ciclo (mensal ou anual), a
          menos que o usuário cancele antes da data de renovação.
        </li>
        <li>
          Cancelamento: O usuário pode cancelar a renovação a qualquer momento nas configurações da sua conta ou da loja
          de aplicativos, mantendo o acesso até o fim do período já pago.
        </li>
        <li>
          Reembolso: Em conformidade com o Código de Defesa do Consumidor brasileiro, o usuário tem o direito de
          arrependimento e pode solicitar o reembolso integral em até 7 (sete) dias corridos após a primeira compra da
          assinatura.
        </li>
      </ul>
      <span>
        <strong>Inadimplência e Fraude:</strong> O Lumina Escritura reserva-se o direito de suspender ou rebaixar a
        conta do usuário para o plano Padrão em caso de falha no pagamento da renovação, contestação indevida de
        cobrança (chargeback) ou detecção de fraude financeira, sem aviso prévio.
      </span>
    </>
  );
}

function DeletionAndLGPD() {
  return (
    <>
      <Title>16. Exclusão de Conta e LGPD</Title>
      <span>
        O usuário tem o direito de solicitar a exclusão de sua conta e de seus dados pessoais a qualquer momento.
      </span>
      <span>Ao excluir a conta, os dados pessoais (nome, e-mail) serão apagados de nossos servidores.</span>
      <span>
        Para preservar a coerência dos estudos e a integridade das discussões em comunidade, comentários públicos e
        interações feitas pelo usuário excluído poderão ser mantidos na plataforma, porém de forma totalmente
        anonimizada (desvinculados de sua identidade original).
      </span>
    </>
  );
}

function LegalCapacity() {
  return (
    <>
      <Title>17. Idade Mínima e Capacidade Legal</Title>
      <span>
        Para utilizar o Lumina Escritura, especialmente para a contratação de planos pagos, o usuário declara ter pelo
        menos 18 (dezoito) anos de idade ou possuir plena capacidade civil. Menores de idade devem utilizar a plataforma
        apenas sob a supervisão e autorização de um responsável legal.
      </span>
    </>
  );
}

function JurisdictionLaw() {
  return (
    <>
      <Title>18. Foro e Legislação Aplicável</Title>
      <span>
        Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer
        controvérsias decorrentes deste documento, fica eleito o foro da Comarca de Rio de Janeiro / RJ, renunciando as
        partes a qualquer outro, por mais privilegiado que seja.
      </span>
    </>
  );
}

function Changes() {
  return (
    <>
      <Title>
        19. <strong>Alterações nos Termos de Uso</strong>
      </Title>
      <span>
        Os termos naturalmente poderão ser alterados quando necessário e estas alterações serão acompanhadas de
        publicações dentro do próprio Lumina Escritura. Iremos sempre destacar com linguajar simples e com total clareza
        quais alterações foram realizadas.
      </span>
    </>
  );
}
