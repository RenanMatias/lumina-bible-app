import React from "react";

import useBibleNavigation from "../../hooks/useBibleNavigation.js";
import BibleNavigationDialogView from "../BibleNavigationDialogView/index.jsx";

export default function NavigationDialog({ isOpen, onClose, returnFocusRef }) {
  const { title, subtitle, viewLevel, items, isLoading, actions } = useBibleNavigation({ isOpen });

  return (
    <BibleNavigationDialogView
      isOpen={isOpen}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      title={title}
      subtitle={subtitle}
      viewLevel={viewLevel}
      items={items}
      isLoading={isLoading}
      onBack={actions.goBack}
      onSelectTestament={actions.selectTestament}
      onSelectBook={actions.selectBook}
      onSelectChapter={actions.selectChapter}
    />
  );
}
