import React from "react";
import scripture from "models/scripture.js";

import DefaultLayout from "interface/DefaultLayout";
import BibleContent from "components/BibleContent/index.jsx";

export default function BiblePage({ content, error }) {
  return (
    <DefaultLayout>
      <BibleContent content={content} error={error} />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  try {
    const booksByTestament = await scripture.findBooksByTestament("pt-br", "Ave Maria");

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
