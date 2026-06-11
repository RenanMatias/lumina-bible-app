import React from "react";
import { ActionList, Stack } from "@primer/react";
import { ArrowLeftIcon, ListOrderedIcon } from "@primer/octicons-react";
import { Dialog, SkeletonText } from "@primer/react/experimental";

function BibleNavigationDialogView({
  isOpen,
  onClose,
  returnFocusRef,
  title,
  subtitle,
  viewLevel,
  items,
  isLoading,
  onBack,
  onSelectTestament,
  onSelectBook,
  onSelectChapter,
}) {
  if (!isOpen) return null;
  console.log(items);

  return (
    <Dialog title={title} subtitle={subtitle} width="medium" onClose={onClose} returnFocusRef={returnFocusRef}>
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
        ) : viewLevel === "testaments" ? (
          items.map((option) => (
            <ActionList.Item key={option.key} onSelect={() => onSelectTestament(option.name)}>
              {option.name}
            </ActionList.Item>
          ))
        ) : viewLevel === "books" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={onBack}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            {items.map((option) => (
              <ActionList.LinkItem href={`/biblia/livro/${option.key}`} key={option.key}>
                {option.name}
                <ActionList.TrailingAction
                  label="Capítulos"
                  icon={ListOrderedIcon}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelectBook(option.key);
                  }}
                />
              </ActionList.LinkItem>
            ))}
          </>
        ) : viewLevel === "chapters" ? (
          <>
            <ActionList.Item variant="danger" key="back" onSelect={onBack}>
              <ActionList.LeadingVisual>
                <ArrowLeftIcon />
              </ActionList.LeadingVisual>
              Voltar
            </ActionList.Item>
            <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center">
              {items.map((option) => (
                <ActionList.LinkItem
                  href={`/biblia/livro/${option.book_id}/${option.id}`}
                  key={option.key}
                  onSelect={() => onSelectChapter(option)}
                >
                  {option.number}
                </ActionList.LinkItem>
              ))}
            </Stack>
          </>
        ) : null}
      </ActionList>
    </Dialog>
  );
}

export default BibleNavigationDialogView;
