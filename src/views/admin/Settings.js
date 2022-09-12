import React from "react";

// components

/* import CardSettings from "components/Cards/CardSettings.js"; */
/* import CardProfile from "components/Cards/CardProfile.js"; */
import FormularioProyecto from "components/Formulario/FormularioProyecto";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <FormularioProyecto />
        </div>
      </div>
    </>
  );
}
