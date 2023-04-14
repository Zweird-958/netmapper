import Page from "@/web/Page"
import CommandDiv from "@/web/components/CommandDiv"
import CommandInfo from "@/web/components/CommandInfo"
import api from "@/web/services/api"
import { useEffect, useState } from "react"

const { useRouter } = require("next/router")

const CommandPage = () => {
  const router = useRouter()
  const commandId = router.query.commandId
  const [command, setCommand] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (commandId) {
        try {
          const {
            data: { result },
          } = await api.get(`/command/${commandId}`)

          setCommand(result)
        } catch {
          return
        }
      }
    })()
  }, [commandId])

  return (
    <Page>
      {command && (
        <CommandDiv className="mx-auto w-2/3">
          <CommandInfo result={command.ip} label="Adresse Ip" />
          <CommandInfo result={command.result} label="Résultat" />
          <CommandInfo
            result={
              command.options.lenght > 0 ? command.options.join(",") : "Aucune"
            }
            label="Options utilisé"
          />
          <CommandInfo result={command.createdAt} label="Date du scan" />
          <p>{command.options.toString()}</p>
        </CommandDiv>
      )}
    </Page>
  )
}

export default CommandPage
