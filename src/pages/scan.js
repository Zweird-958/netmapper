import Page from "@/web/Page"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import * as yup from "yup"
// import child_process from "node:child_process"

const initialValues = {
  ip: "",
  retries: "",
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
  const handleSubmit = async (values) => {
    await api.post("/nmap", values)
  }

  return (
    <Page>
      <div className="absolute -z-10 flex h-screen w-full items-center justify-center">
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <p className="mx-auto w-fit text-3xl font-bold tracking-wider text-blue-400 transition-all hover:scale-110 dark:text-blue-600">
            SCAN
          </p>
          <Field name="ip" placeholder="IP" />
          <Field name="retries" placeholder="Max retries" type="number" />
          <SubmitButton>SCAN</SubmitButton>
        </Form>
      </div>
    </Page>
  )
}

export default Scan
