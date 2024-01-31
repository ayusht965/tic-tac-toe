import Box from "./box"

export default function Game({side}) {
    return <div className="mt-4 grid grid-cols-3">
            {[...Array(9)].map((val, index) => <Box key={index} index={index} side={side} />)}
        </div>
}
