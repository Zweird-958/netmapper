import Page from "@/web/Page"
import Button from "@/web/components/Button"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import HistorySummary from "@/web/components/HistorySummary"
import Radio from "@/web/components/Radio"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import { useState } from "react"
import * as yup from "yup"
// import child_process from "node:child_process"

const initialValues = {
  ip: "",
  retries: "",
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

const Scan = () => {
  const [currentResult, setCurrentResult] = useState()

  const resetResult = () => {
    setCurrentResult()
  }

  const handleSubmit = async (values) => {
    const {
      data: { result },
    } = await api.post("/command", values)
    setCurrentResult(result)
  }

  return (
    <Page>
      <div className="absolute -z-10 flex h-screen w-full flex-col items-center justify-center">
        {!currentResult ? (
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <p className="mx-auto w-fit text-3xl font-bold tracking-wider text-blue-400 transition-all hover:scale-110 dark:text-blue-600">
              SCAN
            </p>
            <Field name="ip" placeholder="IP" />
            <div className="flex justify-center gap-2">
              <Radio name="scanOptions" label="-sV" value="-sV" />
              <Radio name="scanOptions" label="-sS" value="-sS" />
            </div>
            <Field name="retries" placeholder="Max retries" type="number" />
            <SubmitButton>SCAN</SubmitButton>
          </Form>
        ) : currentResult.result ? (
          <>
            <HistorySummary
              result={currentResult.result}
              id={currentResult._id}
            />
            <Button
              className="bg-blue-500 transition-all hover:bg-blue-600"
              onClick={resetResult}
            >
              Faire un nouveau scan
            </Button>
          </>
        ) : (
          <p>{currentResult}</p>
        )}
      </div>
    </Page>
  )
}

export default Scan
