import React, { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
  const [symbols, setSymbols] = useState(["MSFT", "AAPL", "GOOGL"]);

  const addStock = (symbolToAdd) => {
    if (!symbols.includes(symbolToAdd)) {
      setSymbols(prevSymbols => [...prevSymbols, symbolToAdd]);
    }
  };

  return (
    <WatchListContext.Provider value={{ symbols, setSymbols, addStock }}>
      {children}
    </WatchListContext.Provider>
  );
};
