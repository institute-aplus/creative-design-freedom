import React from 'react';

export default function Header() {

    const [position, setPosition] = React.useState<String>("");

    return (
        <>
        <button onClick={() => {setPosition("puzzle")}}>Puzzle</button>
        <button>Contents</button>
        <button>About</button>
        </>
    )
}