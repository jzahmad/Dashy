import React, { useState, useEffect } from 'react';
import './AutoComplete.css'; // Assuming you have the corresponding CSS file
import finnHub from '../Apis/finnHub';

export default function AutoComplete() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
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
                        <li key={index}>
                            {e.symbol}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}
