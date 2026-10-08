import React from "react";

import DefaultLayout from "interface/DefaultLayout";
import TestamentContent from "components/TestamentContent/index.jsx";
import scripture from "models/scripture.js";

export default function TestamentPage({ content, error }) {
  return (
    <DefaultLayout>
      <TestamentContent type="Antigo Testamento" content={content} error={error} />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  try {
    const booksByTestament = await scripture.findBooksByTestament("pt-br", "Ave Maria", "Antigo Testamento");

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
