import React, { useState, useEffect } from "react";
import { ActionList, Stack } from "@primer/react";
import { ArrowLeftIcon, ListOrderedIcon } from "@primer/octicons-react";
import { Dialog, SkeletonText } from "@primer/react/experimental";

export default function NavigationDialog({ isOpen, onClose, returnFocusRef }) {
  const [bookMetadataList, setBookMetadataList] = useState([]);
  const [currentViewState, setCurrentViewState] = useState({ level: "testaments", items: [] });
  const [testamentsViewState, setTestamentsViewState] = useState({ level: "testaments", items: [] });
  const [booksViewState, setBooksViewState] = useState({ level: "books", items: [] });
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);

  const loadBooksMetadata = async () => {
    const response = await fetch("/api/v1/scriptures/books?language=pt-br&version=cnbb");
    if (!response.ok) {
      console.error("Failed to fetch books metadata:", response.statusText);
      return;
    }
    const booksMetadata = await response.json();
    setBookMetadataList(booksMetadata);

    const testamentNames = [...new Set(booksMetadata.map((book) => book.testament))];
    const testamentActionItems = testamentNames.map((testament) => ({
      key: testament,
      name: testament,
    }));
    const nextTestamentsViewState = { level: "testaments", items: testamentActionItems };
    setTestamentsViewState(nextTestamentsViewState);
    setCurrentViewState(nextTestamentsViewState);
  };

  const showBooksByTestament = async (testamentName) => {
    const bookActionItems = bookMetadataList
      .filter((book) => book.testament === testamentName)
      .map((book) => ({
        key: book.id,
        name: book.name,
      }));

    const nextBooksViewState = { level: "books", items: bookActionItems, testamentName };
    setBooksViewState(nextBooksViewState);
    setCurrentViewState(nextBooksViewState);
  };

  const showChaptersByBook = async (bookName) => {
    const selectedBookMetadata = bookMetadataList.find((book) => book.name === bookName);
    if (!selectedBookMetadata) return;

    const response = await fetch(`/api/v1/scriptures/books/${selectedBookMetadata.id}`);
    const bookDetails = await response.json();

    const chapterActionItems = bookDetails.chapters.map((chapter) => ({
      key: chapter.id,
      name: chapter.number,
    }));

    setCurrentViewState({ level: "chapters", items: chapterActionItems, bookName });
  };

  const handleBackNavigation = () => {
    if (currentViewState.level === "chapters") {
      setCurrentViewState(booksViewState);
      return;
    }

    if (currentViewState.level === "books") {
      setCurrentViewState(testamentsViewState);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const loadNavigationData = async () => {
      setIsNavigationLoading(true);
      await loadBooksMetadata();
      setIsNavigationLoading(false);
    };

    loadNavigationData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog
      title="Navegação da Bíblia"
      subtitle={
        currentViewState.level === "testaments"
          ? "Edição CNBB"
          : currentViewState.level === "books"
            ? currentViewState.testamentName
            : currentViewState.bookName
      }
      width="medium"
      onClose={onClose}
      returnFocusRef={returnFocusRef}
    >
      <ActionList>
        {isNavigationLoading ? (
          <>
            <ActionList.Item disabled>
              <SkeletonText variant="text" width="160px" />
            </ActionList.Item>
            <ActionList.Item disabled>
              <SkeletonText variant="text" width="140px" />
            </ActionList.Item>
          </>
        ) : currentViewState.level === "testaments" ? (
          currentViewState.items.map((option) => (
            <ActionList.Item key={option.key} onSelect={() => showBooksByTestament(option.name)}>
              {option.name}
            </ActionList.Item>
          ))
        ) : currentViewState.level === "books" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={handleBackNavigation}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            {currentViewState.items.map((option) => (
              <ActionList.Item key={option.key}>
                {option.name}
                <ActionList.TrailingAction
                  label="Capítulos"
                  icon={ListOrderedIcon}
                  onClick={() => showChaptersByBook(option.name)}
                />
              </ActionList.Item>
            ))}
          </>
        ) : currentViewState.level === "chapters" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={handleBackNavigation}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center">
              {currentViewState.items.map((option) => (
                <ActionList.Item key={option.key} onSelect={() => alert(`Capítulo ${option.name} selecionado`)}>
                  {option.name}
                </ActionList.Item>
              ))}
            </Stack>
          </>
        ) : null}
      </ActionList>
    </Dialog>
  );
}
