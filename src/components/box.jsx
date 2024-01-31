import {useEffect, useState} from "react";
import {computerGameplay} from "../service/api";

export default function Box({index, side}) {
    const [val, setVal] = useState(null)
    const [win, setWin] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const gameState = urlParams.get('gameState').split(",")
        setVal(gameState[index])
        document.addEventListener("computerMove", (e) => {
            if(Number(e.detail.resp) === index) {
                setVal(side === "X" ? "O" : "X")
            }
        })
        document.addEventListener("win", (e) => {
            const winIndex = e.detail.winSequence;
            if(winIndex.includes(index)) {
                setWin(true)
            }
        })
    }, [val, index]);
    const stateHandler = () => {
        if(val !== "1") {
            return
        }
        setVal(side)
        const urlParams = new URLSearchParams(window.location.search);
        const gameState = urlParams.get('gameState').split(",")
        gameState[index] = side
        const pageUrl = "?gameState=" + gameState.join(",")
        window.history.pushState("", "", pageUrl)
        computerGameplay(side)
    }
    return <div
        onClick={stateHandler}
        className={`m-2 cursor-pointer hover:border-4 hover:border-blue-700 rounded-3xl shadow-lg text-9xl bg-slate-800 h-[20vh] w-[20vh] text-center flex justify-center items-center ${val === "X" ? "text-red-700" : "text-blue-500"} ${win && "border-2 border-amber-500"}`} style={{ boxShadow: win ? "0 0 10px #fcd34d" : "" }}>
        {val !== "1" && val}
    </div>
}
