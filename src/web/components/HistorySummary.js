import CommandDiv from "@/web/components/CommandDiv"
import PrettyResult from "@/web/components/PrettyResult"
import api from "@/web/services/api"
import Link from "next/link"

const HistorySummary = (props) => {
  const { result, id } = props

  const deleteCommand = async () => {
    await api.delete("/command", { id })
    // await api.delete("/command", { id })
  }

  return (
    <CommandDiv>
      <PrettyResult result={result} />
      <div className="flex justify-between text-white">
        <button
          onClick={deleteCommand}
          className="rounded bg-red-500 px-3 py-2 shadow-md"
        >
          SUPPRIMER
        </button>
        <Link
          href={`/command/${id}`}
          className="rounded bg-blue-500 px-3 py-2 shadow-md"
        >
          VOIR PLUS
        </Link>
      </div>
    </CommandDiv>
  )
}

export default HistorySummary
