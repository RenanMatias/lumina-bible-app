import { PageLayout } from "@primer/react";

import Content from "./components/Content/index.jsx";

export default function Landing() {
  return (
    <PageLayout>
      <PageLayout.Header hidden="true"></PageLayout.Header>
      <PageLayout.Content>
        <Content />
      </PageLayout.Content>
    </PageLayout>
  );
}
