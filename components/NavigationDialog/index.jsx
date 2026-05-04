import React, { useState, useEffect } from "react";
import { ActionList } from "@primer/react";
import { Dialog, SkeletonText } from "@primer/react/experimental";

const fetchBibleMetadata = async () => {
  const response = await fetch("/api/v1/scriptures/books?language=pt-br&version=cnbb");
  const books = await response.json();
  const activeTestaments = new Set(books.map((book) => book.testament));

  return [
    { name: "Antigo Testamento", activated: activeTestaments.has("Antigo Testamento") },
    { name: "Novo Testamento", activated: activeTestaments.has("Novo Testamento") },
  ];
};

export default function BibleDialog({ isOpen, onClose, returnFocusRef }) {
  const [view, setView] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    fetchBibleMetadata()
      .then(setView)
      .finally(() => setIsLoading(false));
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
        ) : (
          view.map((item, index) => (
            <ActionList.Item key={index} disabled={!item.activated}>
              {item.name}
              {!item.activated && <ActionList.Description variant="inline">Disponível em breve</ActionList.Description>}
            </ActionList.Item>
          ))
        )}
      </ActionList>
    </Dialog>
  );
}
