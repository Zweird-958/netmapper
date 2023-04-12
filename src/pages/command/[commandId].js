import Page from "@/web/Page"
import api from "@/web/services/api"
import { useEffect, useState } from "react"

const { useRouter } = require("next/router")

const CommandPage = () => {
  const router = useRouter()
  const commandId = router.query.commandId
  const [command, setCommand] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.post("/command", { id: commandId })

        setCommand(result)
      } catch {
        return
      }
    })()
  }, [commandId])

  return (
    <Page>
      <p>{command.result}</p>
    </Page>
  )
}

export default CommandPage
