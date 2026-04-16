import { PageLayout } from "@primer/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export function MainTemplate({ children }) {
  return (
    <>
      <Header />
      <PageLayout containerWidth="large" padding="none">
        <PageLayout.Content padding="normal">{children}</PageLayout.Content>
        <PageLayout.Footer divider="line">
          <Footer />
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
