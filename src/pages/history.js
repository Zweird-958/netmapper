import Page from "@/web/Page"
import HistorySummary from "@/web/components/HistorySummary"
import api from "@/web/services/api"
import { useEffect, useState } from "react"

const History = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api.get("/nmap")

      setHistory(result)
    })()
  }, [])

  return (
    <Page>
      <div className="mx-auto mt-2 w-2/5">
        {history.map(({ result, _id }, index) => (
          <HistorySummary key={index} result={result} id={_id} />
        ))}
      </div>
    </Page>
  )
}

export default History
