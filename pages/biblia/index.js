import React from "react";
import scripture from "models/scripture.js";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import BibleContent from "components/BibleContent/index.jsx";

export default function BiblePage({ content, error }) {
  return (
    <MainTemplate>
      <BibleContent content={content} error={error} />
    </MainTemplate>
  );
}

export async function getStaticProps() {
  try {
    const booksByTestament = await scripture.findBooksByTestament("pt-br", "Edições CNBB");

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
