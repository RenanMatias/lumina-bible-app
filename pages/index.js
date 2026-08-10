import React from "react";
import Landing from "../components/Landing/index.js";
import DefaultLayout from "interface/DefaultLayout/index.js";

export default function Home() {
  return (
    <DefaultLayout
      metadata={{
        description:
          "Lumina Escritura é uma plataforma de estudo bíblico que oferece recursos gratuitos para leitura, estudo e compreensão da Bíblia.",
      }}
    >
      <Landing />
    </DefaultLayout>
  );
}
