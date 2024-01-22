import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import finnHub from '../Apis/finnHub';

export default function StockDetails() {
    const {symbol}=useParams()

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
         <a>API access denied for {symbol}</a>
        </div>
      );
}
