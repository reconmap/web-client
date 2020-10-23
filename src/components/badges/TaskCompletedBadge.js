
export default function TaskCompletedBadge({ completed }) {
    return (
        <div className={`w-12 h-1 rounded-full border-2 border-smoke ${parseInt(completed) === 1 ? 'bg-green-500' : 'bg-red-500'}`}></div>
    )
}
