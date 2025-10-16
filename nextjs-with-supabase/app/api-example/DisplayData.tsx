"use client";

import { useEffect, useState } from "react";

export default function DisplayData() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    if (!data) return <p>Loading...</p>;
    return (
        <div>
            <h2>Api Response:</h2>
            <pre>{JSON.stringify(data, null, 2)} </pre>
        </div>
    )
}