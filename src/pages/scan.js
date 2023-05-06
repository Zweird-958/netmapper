import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Button from "@/web/components/Button"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import HistorySummary from "@/web/components/HistorySummary"
import Label from "@/web/components/Label"
import Loading from "@/web/components/Loading"
import Page from "@/web/components/Page"
import Radio from "@/web/components/Radio"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import { useEffect, useState } from "react"
import * as yup from "yup"

const initialValues = {
  ip: "",
  options: {
    maxRetries: "",
    maxRate: "",
    maxTimeout: "",
  },
  scanOptions: undefined,
}

const validationSchema = yup.object().shape({
  ip: yup
    .string()
    .required()
    .matches(
      /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      "❌ Veuillez mettre une ip valide"
    )
    .label("🌐 IP"),
  retries: yup.string().label("Max retries"),
})

const ScanButton = (props) => {
  const { onClick } = props

  return (
    <Button
      className="mx-auto my-5 w-fit bg-blue-500 text-center transition-all hover:bg-blue-600"
      onClick={onClick}
    >
      Faire un nouveau scan
    </Button>
  )
}

const Scan = () => {
  const [currentResult, setCurrentResult] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const resetResult = () => {
    setCurrentResult()
  }

  const handleSubmit = async (values) => {
    setIsLoading(true)

    try {
      const {
        data: { result },
      } = await api.post("/command", values)
      setCurrentResult(result)
    } catch (err) {
      setCurrentResult("Accès non autorisé")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        await api.get("/isScanning")
      } catch (err) {
        setIsLoading(true)

        const scanningInterval = setInterval(async () => {
          try {
            await api.get("/isScanning")

            setIsLoading(false)
            clearInterval(scanningInterval)
          } catch (err) {
            return
          }
        }, 3000)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page>
      {!currentResult ? (
        <AbsoluteDiv className="flex-col">
          {isLoading ? (
            <Loading />
          ) : (
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              title="SCAN"
            >
              <Field name="ip" placeholder="127.0.0.1" label="IP" />
              <div className="mx-auto w-3/4">
                <Label>Scan Options</Label>
                <div className="flex justify-center gap-2">
                  <Radio name="scanOptions" label="-sV" value="-sV" />
                  <Radio name="scanOptions" label="-sS" value="-sS" />
                </div>
              </div>
              <Field
                name="options.maxRetries"
                placeholder="5"
                type="number"
                label="Max Retries"
              />
              <Field
                name="options.maxRate"
                placeholder="500"
                type="number"
                label="Max Rate"
              />
              <Field
                name="options.hostTimeout"
                placeholder="0"
                label="Host Timeout"
                type="number"
              />
              <SubmitButton>SCAN</SubmitButton>
            </Form>
          )}
        </AbsoluteDiv>
      ) : currentResult.result ? (
        <div className="mx-auto mt-5 flex w-3/5 flex-col">
          <HistorySummary
            result={currentResult.result}
            id={currentResult._id}
          />
          <ScanButton onClick={resetResult} />
        </div>
      ) : (
        <AbsoluteDiv className="flex-col">
          <div className="flex h-1/4 w-1/3 flex-col justify-center rounded border-2 border-blue-950 p-4 text-center text-white">
            <p>Oups il y a une erreur : </p>
            <p>{currentResult}</p>
          </div>
          <ScanButton onClick={resetResult} />
        </AbsoluteDiv>
      )}
    </Page>
  )
}

export default Scan
