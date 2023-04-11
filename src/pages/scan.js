import Page from "@/web/Page"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import SubmitButton from "@/web/components/SubmitButton"
import * as yup from "yup"
// import child_process from "node:child_process"

const initialValues = {
  ip: "",
  retries: "",
}

const validationSchema = yup.object().shape({
  ip: yup.string().required().label("🌐 IP"),
  retries: yup.string().label("Max retries"),
})

const Scan = () => {
  const handleSubmit = (values) => {
    // const { ip } = values
    // child_process.spawn("nmap", ip)
    console.log(values)
  }

  return (
    <Page>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-xl font-bold text-blue-400">SCAN</h1>
        <Field name="ip" placeholder="IP" />
        <Field name="retries" placeholder="Max retries" type="number" />
        <SubmitButton>SCAN</SubmitButton>
      </Form>
    </Page>
  )
}

export default Scan
