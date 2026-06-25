import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Banner } from "@primer/react";
import { SkeletonBox, SkeletonText } from "@primer/react/experimental";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import ChapterContent from "components/ChapterContent/index.jsx";

function ChapterSkeleton() {
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

export default function ChapterPage() {
  const router = useRouter();
  const { book_id, chapter_id } = router.query;

  const [chapterFounded, setChapterFounded] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!book_id || !chapter_id) return;

    fetchChapter();

    async function fetchChapter() {
      const response = await fetch(`/api/v1/scriptures/books/${book_id}/${chapter_id}`);
      const responseBody = await response.json();

      if (response.ok) {
        setChapterFounded(responseBody);
      } else {
        setError(responseBody);
      }
      setLoading(false);
    }
  }, [book_id, chapter_id]);

  return (
    <MainTemplate>
      {loading && <ChapterSkeleton />}

      {!loading && error && <Banner variant="critical" title={error.message} description={error.action} />}

      {!loading && chapterFounded && <ChapterContent chapter={chapterFounded} />}
    </MainTemplate>
  );
}
