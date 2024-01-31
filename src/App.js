import logo from './logo.svg';
import './App.css';
import Select from "./components/select";
import {useEffect, useState} from "react";
import Game from "./components/game";

function App() {
    const [side, setSide] = useState("");
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState("")
    useEffect(() => {
        document.addEventListener("win", (e) => {
            setWin(true)
            setMessage(e.detail.winner + " Win!")
        })
    }, []);
    return (
        <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
            {win && <div className="h-screen w-screen bg-black bg-opacity-85 absolute flex flex-col items-center justify-center">
                <h1 className="text-6xl font-black text-amber-500">{message}</h1>
                <a className="mt-8 p-4 relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" href="/">
                    Play Again !
                </a>
            </div>}
            <h1 className="text-4xl text-gray-300 font-semibold">
                Tic Tac Toe
            </h1>
            {side === "" && <Select onClick={setSide} />}
            {(side === "X" || side === "O") && <Game side={side} />}
        </div>
    );
}

export default App;
