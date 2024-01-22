import StockOverviewPage from './Pages/StockOverviewPage'
import StockDeatils from './Pages/StocksDetails'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WatchListContextProvider } from './Context/WatchListContext';

function App() {
  return (
    <main>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/details/:symbol" element={<StockDeatils />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
