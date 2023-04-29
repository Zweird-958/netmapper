import Page from "@/web/components/Page"
import Button from "@/web/components/Button"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import HistorySummary from "@/web/components/HistorySummary"
import Radio from "@/web/components/Radio"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import { useState } from "react"
import * as yup from "yup"
import { CgSpinner } from "react-icons/cg"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"

const initialValues = {
  ip: "",
  options: {
    maxRetries: undefined,
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
    const {
      data: { result, error },
    } = await api.post("/command", values)

    setCurrentResult(result ?? error)
    setIsLoading(false)
  }

  return (
    <Page>
      {!currentResult ? (
        <AbsoluteDiv className="flex-col">
          {isLoading ? (
            <CgSpinner className="h-16 w-16 animate-spin text-blue-700" />
          ) : (
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              title="SCAN"
            >
              <Field name="ip" placeholder="IP" />
              <div className="flex justify-center gap-2">
                <Radio name="scanOptions" label="-sV" value="-sV" />
                <Radio name="scanOptions" label="-sS" value="-sS" />
              </div>
              <Field
                name="options.maxRetries"
                placeholder="Max retries"
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
