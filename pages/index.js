import React from "react";
import { Button } from "@primer/react";
import { RocketIcon } from "@primer/octicons-react";

export default function LeadingVisual() {
  return (
    <Button variant="primary" leadingVisual={RocketIcon}>
      Primer is working with Next.js!
    </Button>
  );
}
