import React, { useEffect, useState, useContext } from "react";
import finHubb from '../Apis/finnHub';
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { WatchListContext } from "../Context/WatchListContext";

export default function StockList() {
    const [stocks, setStocks] = useState([]);
    const { symbols, setSymbols } = useContext(WatchListContext);
    const navigate = useNavigate();

    const handleDelete = (symbolToDelete) => {
        const updatedSymbols = symbols.filter(symbol => symbol !== symbolToDelete);
        const updatedStocks = stocks.filter(stock => stock.data.t !== symbolToDelete);
        setSymbols(updatedSymbols);
        setStocks(updatedStocks);
    };

    const handleNavigate = (symbol) => {
        navigate(`details/${symbol}`);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                // Check if symbols array is not empty
                if (symbols.length > 0) {
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
                } else {
                    // If symbols array is empty, reset stocks
                    setStocks([]);
                }
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [symbols]);
    console.log(stocks);

    return (
        <div>
            <style>{`
                .table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .table th,
                .table td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                
                .table th {
                    background-color: #f2f2f2;
                }
                
                .table-row:hover {
                    background-color: #f2f2f2;
                }
                
                .table th:nth-child(n+2),
                .table td:nth-child(n+2) {
                    text-align: right;
                }
                
                .button {
                    background-color: #007bff;
                    border: none;
                    color: white;
                    padding: 8px 16px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 4px;
                }
                
                .button:hover {
                    background-color: #0056b3;
                }
                
                .red {
                    color: red;
                }
                
                .green {
                    color: green;
                }
                
                .icon {
                    margin-left: 4px;
                    vertical-align: middle;
                }
            `}</style>
            <table className="table hover mt-5">
                <thead style={{ color: "rgb(79,89,102)" }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">change</th>
                        <th scope="col">change%</th>
                        <th scope="col">high</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((e, index) => (
                        <tr className="table-row" key={index}>
                            <th scope="row" onClick={() => handleNavigate(symbols[index])}>{symbols[index]}</th>
                            <td>{e.data.c}</td>
                            <td style={{ color: e.data.d > 0 ? 'green' : 'red' }}>{e.data.d}{e.data.d > 0 ? <FaCaretUp /> : <FaCaretDown />}</td>
                            <td style={{ color: e.data.dp > 0 ? 'green' : 'red' }}>{e.data.dp}{e.data.dp > 0 ? <FaCaretUp /> : <FaCaretDown />}</td>
                            <td>{e.data.h}</td>
                            <td>{e.data.l}</td>
                            <td>{e.data.o}</td>
                            <td>{e.data.pc}</td>
                            <td>
                                <button className="button" onClick={() => handleDelete(symbols[index])}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
