import logo from './logo.svg';
import StockOverviewPage from './Pages/StockOverviewPage'
import StockDeatils from './Pages/StocksDetails'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<StockOverviewPage/>}></Route>
          <Route path="/details/:symbol" element={<StockDeatils/>}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
