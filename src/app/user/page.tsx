"use client";

import { useState } from "react";

export default function User() {
  const [isSubmitted, hasSubmittedTeam] = useState<boolean>(false);

  const submitLagnavn = () => {
    console.log("submit");
    hasSubmittedTeam(true);
  };

  return (
    <main>
      {!isSubmitted ? (
        <>
          <h2>Skriv inn ditt lagnavn</h2>
          <input placeholder="srkiv inn svaret ditt" />
          <button onClick={submitLagnavn}>Lagre navn</button>
        </>
      ) : (
        <h1>Vent på at spillet settes i gangg</h1>
      )}
    </main>
  );
}
