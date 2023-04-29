import Page from "@/web/Page"
import Button from "@/web/components/Button"
import HistorySummary from "@/web/components/HistorySummary"
import Link from "@/web/components/Link"
import api from "@/web/services/api"
import { useEffect, useState } from "react"

const History = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/command")

        setHistory(result)
      } catch (err) {
        return
      }
    })()
  }, [])

  const deleteCommand = (id) => async () => {
    try {
      await api.delete("/command", { id })
    } catch (err) {
      return
    }
  }

  return (
    <Page>
      <div className="mx-auto mt-2 w-2/5">
        {history.map(({ result, _id }, index) => (
          <HistorySummary key={index} result={result} id={_id}>
            <div className="mt-5 flex justify-between text-white">
              <Button
                onClick={deleteCommand(_id)}
                className="bg-red-500 transition-all hover:bg-red-600"
              >
                SUPPRIMER
              </Button>
              <Link
                href={`/command/${_id}`}
                className="bg-blue-500 hover:bg-blue-600"
              >
                VOIR PLUS
              </Link>
            </div>
          </HistorySummary>
        ))}
      </div>
    </Page>
  )
}

export default History
