import React, { createContext, useState } from "react";

// Crea el contexto
export const CorreoContext = createContext();

// Proveedor del contexto
export const CorreoProvider = ({ children }) => {
    const [correoC, setCorreoC] = useState("");

    return (
        <CorreoContext.Provider value={{ correoC, setCorreoC }}>
            {children}
        </CorreoContext.Provider>
    );
};

