import { useEffect, useState } from "react";
import finHubb from '../Apis/finnHub'; // Make sure this import is correct
import { FaCaretDown,FaCaretUp } from "react-icons/fa";


export default function StockList() {
    const [stocks, setStocks] = useState([]);
    const symbols = ["MSFT", "AAPL", "GOOGL"]; // Add more symbols if needed

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const promises = symbols.map(e =>
                    finHubb.get("/quote", {
                        params: {
                            symbol: e
                        }
                    })
                );

                const res = await Promise.all(promises);

                if (isMounted) {
                    setStocks(res);
                }

                console.log(res);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array to run the effect only once
    
    return (
        <div>
            <table className="table hover mt-5">
               <thead style={{color:"rgb(79,89,102)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">change</th>
                    <th scope="col">change%</th>
                    <th scope="col">high</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>
               </thead>
               <tbody>
                    {stocks.map((e, index) => (
                        <tr className="table-row" key={index}>
                            <th scope="row">{symbols[index]}</th>
                            <td>{e.data.c}</td>
                            <td style={{ color: e.data.d > 0 ? 'green' : 'red' }}>{e.data.d}</td>
                            <td style={{ color: e.data.dp > 0 ? 'green' : 'red' }}>{e.data.dp}</td>
                            <td>{e.data.h}</td>
                            <td>{e.data.l}</td>
                            <td>{e.data.o}</td>
                            <td>{e.data.pc}</td>
                        </tr>
                    ))}
               </tbody>
            </table>
        </div>
    );
}
