import useSWR from "swr";
import { Stack, Heading, Text } from "@primer/react";
import { MainTemplate } from "templates/MainTemplate/index.jsx";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <MainTemplate>
      <Stack>
        <Heading as="h1">Status</Heading>
        <UpdatedAt />
        <DatabaseStatus />
      </Stack>
    </MainTemplate>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <Text>Última atualização: {updatedAtText}</Text>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <Text>Versão: {data.dependencies.database.version}</Text>
        <Text>Conexões abertas: {data.dependencies.database.opened_connections}</Text>
        <Text>Conexões máximas: {data.dependencies.database.max_connections}</Text>
      </>
    );
  }

  return (
    <>
      <Heading variant="medium">Banco de Dados</Heading>
      {databaseStatusInformation}
    </>
  );
}
