
export default function CvssScore({ score, fontSize='text-base' }) {
    const color = Math.floor(score) <= 3 ? 'green' : Math.floor(score) <= 6 ? 'yellow' : 'red'
    return (
        <div className='px-2 py-1 w-32  rounded  flex gap-1 items-center  border-2 border-smoke-50 border-dotted'>
            {Array.from({ length: Math.floor(score) }).map((s, index) =>
                <div key={index} className={`bg-${color}-500 h-4 w-1 rounded`}></div>
            )}
            <span className={`ml-1 text-${color}-500 ${fontSize}`}>{score}</span>
        </div>
    )
}
