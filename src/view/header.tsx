import React from 'react';
import './styles.css';
export default function Header() {

    const [position, setPosition] = React.useState<String>("");

    return (
        <div className='header'>
            <div>
                <button onClick={() => {setPosition("puzzle")}}>Puzzle</button>
            </div>
            <div>
                <button onClick={() => {setPosition("puzzle")}}>About</button>
            </div>
            <div>
                <button onClick={() => {setPosition("puzzle")}}>Contents</button>
            </div>
        </div>
    )
}