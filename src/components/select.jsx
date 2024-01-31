export default function Select({onClick}) {
    const click = (val) => {
        const pageUrl = "?gameState=" + [1, 1, 1, 1, 1, 1, 1, 1, 1]
        window.history.pushState("", "", pageUrl)
        onClick(val)
    }
    return <div>
        <h3 className="text-xl text-gray-600 text-center">
            Please select your side
        </h3>
        <div className="flex">
            <div onClick={() => click("X")} className="m-8 cursor-pointer hover:border-4 hover:border-blue-700 rounded-3xl shadow-lg text-9xl text-red-700 bg-slate-800 h-[20vh] w-[20vh] text-center flex justify-center items-center">
                X
            </div>
            <div onClick={() => click("O")} className="m-8 cursor-pointer hover:border-4 hover:border-blue-700 rounded-3xl shadow-lg text-9xl text-blue-500 bg-slate-800 h-[20vh] w-[20vh] text-center flex justify-center items-center">
                O
            </div>
        </div>
    </div>
}
