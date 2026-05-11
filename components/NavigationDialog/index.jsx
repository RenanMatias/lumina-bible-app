import React, { useState, useEffect } from "react";
import { ActionList } from "@primer/react";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { Dialog, SkeletonText } from "@primer/react/experimental";

export default function BibleDialog({ isOpen, onClose, returnFocusRef }) {
  const [allBooks, setAllBooks] = useState([]);
  const [view, setView] = useState({ view: "testaments", data: [] });
  const [testamentsView, setTestamentsView] = useState({ view: "testaments", data: [] });
  const [booksView, setBooksView] = useState({ view: "books", data: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBibleMetadata = async () => {
    const response = await fetch("/api/v1/scriptures/books?language=pt-br&version=cnbb");
    if (!response.ok) {
      console.error("Failed to fetch books metadata:", response.statusText);
      return;
    }
    const books = await response.json();
    setAllBooks(books);

    const testamentNames = [...new Set(books.map((book) => book.testament))];
    const data = testamentNames.map((testament) => ({
      key: testament,
      name: testament,
    }));
    const nextTestamentsView = { view: "testaments", data };
    setTestamentsView(nextTestamentsView);
    setView(nextTestamentsView);
  };

  const openBooksByTestament = async (testamentName) => {
    const data = allBooks
      .filter((book) => book.testament === testamentName)
      .map((book) => ({
        key: book.id,
        name: book.name,
      }));

    const nextBookView = { view: "books", data, testamentName };
    setBooksView(nextBookView);
    setView(nextBookView);
  };

  const openChaptersByBook = async (bookName) => {
    const bookFound = allBooks.find((book) => book.name === bookName);
    if (!bookFound) return;

    const response = await fetch(`/api/v1/scriptures/books/${bookFound.id}`);
    const responseBody = await response.json();

    const data = responseBody.chapters.map((chapter) => ({
      key: chapter.id,
      name: chapter.number,
    }));

    setView({ view: "chapters", data, bookName });
  };

  const handleBack = () => {
    if (view.view === "chapters") {
      setView(booksView);
      return;
    }

    if (view.view === "books") {
      setView(testamentsView);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      setIsLoading(true);
      await fetchBibleMetadata();
      setIsLoading(false);
    };

    load();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog
      title="Navegação da Bíblia"
      subtitle="Edição CNBB"
      width="medium"
      onClose={onClose}
      returnFocusRef={returnFocusRef}
    >
      <ActionList>
        {isLoading ? (
          <>
            <ActionList.Item disabled>
              <SkeletonText variant="text" width="160px" />
            </ActionList.Item>
            <ActionList.Item disabled>
              <SkeletonText variant="text" width="140px" />
            </ActionList.Item>
          </>
        ) : view.view === "testaments" ? (
          view.data.map((item) => (
            <ActionList.Item key={item.key} onSelect={() => openBooksByTestament(item.name)}>
              {item.name}
            </ActionList.Item>
          ))
        ) : view.view === "books" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={handleBack}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            {view.data.map((item) => (
              <ActionList.Item key={item.key} onSelect={() => openChaptersByBook(item.name)}>
                {item.name}
              </ActionList.Item>
            ))}
          </>
        ) : view.view === "chapters" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={handleBack}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            {view.data.map((item) => (
              <ActionList.Item key={item.key} onSelect={() => alert(`Capítulo ${item.name} selecionado`)}>
                {item.name}
              </ActionList.Item>
            ))}
          </>
        ) : null}
      </ActionList>
    </Dialog>
  );
}
