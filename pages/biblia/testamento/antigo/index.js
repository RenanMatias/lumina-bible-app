import React from "react";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import TestamentContent from "components/TestamentContent/index.jsx";
import scripture from "models/scripture.js";

export default function TestamentPage({ content, error }) {
  return (
    <MainTemplate>
      <TestamentContent type="Antigo Testamento" content={content} error={error} />
    </MainTemplate>
  );
}

export async function getStaticProps() {
  try {
    const booksByTestament = await scripture.findBooksByTestament("pt-br", "Edições CNBB", "Antigo Testamento");

    return {
      props: {
        content: booksByTestament,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    return {
      props: {
        content: [],
        error: {
          message: error.message ?? "An error occurred while fetching the books data.",
        },
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  }
}
