import React from "react";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import BibleContent from "components/BibleContent/index.jsx";
import scripture from "models/scripture.js";

export default function BiblePage({ content, error }) {
  return (
    <MainTemplate>
      <BibleContent content={content} error={error} />
    </MainTemplate>
  );
}

export async function getStaticProps() {
  try {
    const bibleData = await scripture.getAllBooks("pt-br", "Edições CNBB");

    const booksByTestament = bibleData.reduce((acc, { testament, id, name }) => {
      if (!acc[testament]) acc[testament] = [];

      acc[testament].push({ id, name });

      return acc;
    }, {});

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
