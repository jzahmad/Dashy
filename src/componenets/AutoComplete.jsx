import React, { useState, useEffect, useContext } from 'react';
import './AutoComplete.css'; // Assuming you have the corresponding CSS file
import finnHub from '../Apis/finnHub';
import { WatchListContext } from "../Context/WatchListContext";

export default function AutoComplete() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const {symbols,setSymbols} = useContext(WatchListContext)

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (e) => {
        if (!symbols.includes(e.symbol)) {
            setSymbols([...symbols, e.symbol]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await finnHub.get("search", {
                    params: {
                        q: search
                    }
                })
                setResult(res.data.result)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (search.length > 0) {
            fetchData();
        } else {
            setResult([]);
        }
    }, [search]);


    const containerClassName = result.length > 0 ? 'dropdown-menu show' : 'dropdown-menu';

    return (
        <div className="w-50 p-5 rounded mx-auto autocomplete-container">
            <div className="form-floating">
                <input
                    className="autocomplete-input"
                    placeholder="Type something..."
                    value={search}
                    onChange={handleInputChange}
                />
            {result.length > 0 && (
                <ul style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer" }} className={containerClassName}>
                    {result.map((e, index) => (
                        <li key={index} onClick={() => handleClick(e)}>
                            {e.symbol} {e.description}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}
