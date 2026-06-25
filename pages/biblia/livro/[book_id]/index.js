import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Banner } from "@primer/react";
import { SkeletonBox, SkeletonText } from "@primer/react/experimental";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import BookContent from "components/BookContent/index.jsx";

function BookSkeleton() {
  return (
    <div style={{ padding: "1rem" }}>
      <SkeletonBox size="titleMedium" width="40%" />
      <SkeletonText size="bodyMedium" width="25%" />

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ marginTop: "1.5rem" }}>
          <SkeletonBox size="titleSmall" width="20%" />
          <SkeletonText size="bodyMedium" />
          <SkeletonText size="bodyMedium" />
          <SkeletonText size="bodyMedium" width="80%" />
        </div>
      ))}
    </div>
  );
}

export default function BookPage() {
  const router = useRouter();
  const { book_id } = router.query;

  const [bookFound, setBookFound] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!book_id) return;

    fetchBook();

    async function fetchBook() {
      const response = await fetch(`/api/v1/scriptures/books/${book_id}`);
      const responseBody = await response.json();

      if (response.ok) {
        setBookFound(responseBody);
      } else {
        setError(responseBody);
      }
      setLoading(false);
    }
  }, [book_id]);

  return (
    <MainTemplate>
      {loading && <BookSkeleton />}

      {!loading && error && <Banner variant="critical" title={error.message} description={error.action} />}

      {!loading && bookFound && <BookContent book={bookFound} />}
    </MainTemplate>
  );
}
