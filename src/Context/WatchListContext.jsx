import React, { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
  const [symbols,setSymbols] = useState(["MSFT", "AAPL", "GOOGL"]);

  return (
    <WatchListContext.Provider value={{ symbols,setSymbols }}>
      {children}
    </WatchListContext.Provider>
  );
};
