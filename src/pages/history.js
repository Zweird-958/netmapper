import Button from "@/web/components/Button"
import HistorySummary from "@/web/components/HistorySummary"
import Link from "@/web/components/Link"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import { useEffect, useState } from "react"

const History = () => {
  const [history, setHistory] = useState([])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (deleting) {
        return
      }

      try {
        const {
          data: { result },
        } = await api.get("/command")

        setHistory(result)
      } catch (err) {
        return
      }
    })()
  }, [deleting])

  const deleteCommand = (id) => async () => {
    try {
      setDeleting(true)
      await api.delete(`/command/${id}`)
      setDeleting(false)
    } catch (err) {
      setDeleting(false)

      return
    }
  }

  return (
    <Page>
      <div className="mx-auto mt-2 w-2/5">
        {history.length > 0 ? (
          history.map(({ result, _id }, index) => (
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
          ))
        ) : (
          <p className="mt-12 text-center text-2xl dark:text-white">
            Vous n'avez pas d'historique pour le moment !
          </p>
        )}
      </div>
    </Page>
  )
}

export default History
