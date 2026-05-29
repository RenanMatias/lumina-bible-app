import { useState, useCallback, useEffect, useMemo } from "react";
import { ValidationError } from "../infra/errors.js";

const INITIAL_VIEW_STATE = { level: "testaments", items: [] };

function useBibleNavigation({ isOpen, language = "pt-br", version = "Edições CNBB" } = {}) {
  const [bookMetadataList, setBookMetadataList] = useState([]);
  const [currentViewState, setCurrentViewState] = useState(INITIAL_VIEW_STATE);
  const [testamentsViewState, setTestamentsViewState] = useState(INITIAL_VIEW_STATE);
  const [booksViewState, setBooksViewState] = useState({ level: "books", items: [] });
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const loadBooksMetadata = useCallback(async () => {
    const params = new URLSearchParams({ language, version });
    const response = await fetch(`/api/v1/scriptures/books?${params.toString()}`);

    if (!response.ok) {
      throw new ValidationError({
        message: "Falha ao carregar os livros da bíblia.",
        action: "Tente recarregar a página ou entre em contato com o suporte.",
      });
    }

    const booksMetadata = await response.json();
    setBookMetadataList(booksMetadata);

    const nextTestamentsViewState = createTestamentsViewState(booksMetadata);
    setTestamentsViewState(nextTestamentsViewState);
    setCurrentViewState(nextTestamentsViewState);
  }, [language, version]);

  const selectTestament = useCallback(
    (testamentName) => {
      const nextBooksViewState = createBooksViewState(bookMetadataList, testamentName);
      setBooksViewState(nextBooksViewState);
      setCurrentViewState(nextBooksViewState);
    },
    [bookMetadataList],
  );

  const selectBook = useCallback(
    async (bookId) => {
      const selectedBookMetadata = bookMetadataList.find((book) => String(book.id) === String(bookId));
      if (!selectedBookMetadata) return;

      const response = await fetch(`/api/v1/scriptures/books/${selectedBookMetadata.id}`);
      if (!response.ok) {
        throw new ValidationError({
          message: "Falha ao carregar os capítulos do livro selecionado.",
          action: "Tente selecionar outro livro ou entre em contato com o suporte.",
        });
      }

      const bookDetails = await response.json();
      const nextChaptersViewState = createChaptersViewState(bookDetails, selectedBookMetadata.name);

      setCurrentViewState(nextChaptersViewState);
    },
    [bookMetadataList],
  );

  const selectChapter = useCallback((chapterItem) => {
    setSelectedChapter(chapterItem);
  }, []);

  const goBack = useCallback(() => {
    setCurrentViewState((currentState) => {
      if (currentState.level === "chapters") return booksViewState;
      if (currentState.level === "books") return testamentsViewState;
      return currentState;
    });
  }, [booksViewState, testamentsViewState]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const loadNavigationData = async () => {
      try {
        setIsNavigationLoading(true);
        await loadBooksMetadata();
      } catch (error) {
        console.error("Error loading navigation data:", error);
      } finally {
        if (isMounted) setIsNavigationLoading(false);
      }
    };

    loadNavigationData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, loadBooksMetadata]);

  const subtitle = useMemo(() => {
    if (currentViewState.level === "testaments") return version;
    if (currentViewState.level === "books") return currentViewState.testamentName;
    if (currentViewState.level === "chapters") return currentViewState.bookName;
    return "";
  }, [currentViewState, version]);

  return {
    title: "Navegação da Bíblia",
    subtitle,
    viewLevel: currentViewState.level,
    items: currentViewState.items,
    isLoading: isNavigationLoading,
    selectedChapter,
    actions: {
      selectTestament,
      selectBook,
      selectChapter,
      goBack,
    },
  };
}

function createTestamentsViewState(booksMetadata) {
  const testamentNames = [...new Set(booksMetadata.map((book) => book.testament))];
  const testamentActionItems = testamentNames.map((testament) => ({
    key: testament,
    name: testament,
  }));

  return { level: "testaments", items: testamentActionItems };
}

function createBooksViewState(booksMetadata, testamentName) {
  const bookActionItems = booksMetadata
    .filter((book) => book.testament === testamentName)
    .map((book) => ({
      key: book.id,
      name: book.name,
      testament: book.testament,
    }));

  return { level: "books", items: bookActionItems, testamentName };
}

function createChaptersViewState(bookDetails, bookName) {
  const chapterActionItems = (bookDetails?.chapters ?? []).map((chapter) => ({
    key: chapter.id ?? `${bookName}-${chapter.number}`,
    id: chapter.id,
    number: chapter.number,
  }));

  return { level: "chapters", items: chapterActionItems, bookName };
}

export default useBibleNavigation;
