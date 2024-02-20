import { useEffect,useState,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import finnHub from '../Apis/finnHub';
import StockChart from '../componenets/StockChart'
import { WatchListContext } from "../Context/WatchListContext";
import { StockData } from './StockData';

export default function StockDetails() {
    const {symbol}=useParams()
    
    const [graphData, setGraphData] = useState({
        day: [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 3, y: 15 },
          { x: 4, y: 25 },
          { x: 5, y: 18 },
          { x: 6, y: 30 },
          { x: 7, y: 22 },
          { x: 8, y: 35 },
          { x: 9, y: 28 },
          { x: 10, y: 40 }
        ],
        month: [
          { x: 1, y: 5 },
          { x: 2, y: 15 },
          { x: 3, y: 8 },
          { x: 4, y: 18 },
          { x: 5, y: 12 },
          { x: 6, y: 25 },
          { x: 7, y: 20 },
          { x: 8, y: 30 },
          { x: 9, y: 22 },
          { x: 10, y: 35 }
        ],
        year: [
          { x: 2021, y: 100 },
          { x: 2022, y: 120 },
          { x: 2023, y: 90 },
          { x: 2024, y: 110 },
          { x: 2025, y: 130 },
          { x: 2026, y: 105 },
          { x: 2027, y: 125 },
          { x: 2028, y: 145 },
          { x: 2029, y: 120 },
          { x: 2030, y: 150 }
        ]
      });

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const date = new Date();
    //         const currentTime = Math.floor(date.getTime() / 1000);
    //         const oneDay = currentTime - 24 * 60 * 60;
    
    //         const response = await finnHub.get('/stock/candle', {
    //           params: {
    //             symbol,
    //             from: oneDay,
    //             to: currentTime,
    //             resolution: 30,
    //           },
    //         });
    
    //         // Process the response data as needed
    //         console.log(response);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    
    //     // Call the fetchData function
    //     fetchData();
    //   }, []);

    return (
      <div>
          {/* <a>API access denied for {symbol}. Hard Coded Data is used</a> */}
          <StockChart chartData={graphData} symbol={symbol}/> 
          <StockData symbol={symbol}/>
      </div>
  );
}
