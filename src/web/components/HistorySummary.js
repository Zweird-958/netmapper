import CommandDiv from "@/web/components/CommandDiv"
import PrettyResult from "@/web/components/PrettyResult"
import Link from "next/link"

const HistorySummary = (props) => {
  const { result, id } = props

  return (
    <CommandDiv>
      <PrettyResult result={result} />
      <Link
        href={`/command/${id}`}
        className="ml-auto mt-2 w-fit rounded bg-blue-500 px-3 py-2 text-white shadow-md"
      >
        VOIR PLUS
      </Link>
    </CommandDiv>
  )
}

export default HistorySummary