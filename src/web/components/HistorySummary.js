import Link from "next/link"

const HistorySummary = (props) => {
  const { result, id } = props

  return (
    <div className="my-4 flex flex-col rounded border-2 border-sky-600 px-3 py-2 font-mono shadow-lg">
      <p className="tundercate dark:text-white">{result}</p>
      <Link
        href={`/command/${id}`}
        className="ml-auto mt-2 w-fit rounded bg-blue-500 px-3 py-2 text-white shadow-md"
      >
        VOIR PLUS
      </Link>
    </div>
  )
}

export default HistorySummary
