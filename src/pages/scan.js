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
  ip: yup.string().required().label("🌐 IP"),
  retries: yup.string().label("Max retries"),
})

const Scan = () => {
  const handleSubmit = async (values) => {
    // const { ip } = values
    // child_process.spawn("nmap", ip)
    console.log(values)
    await api.post("/nmap", values)
    console.log("submited")
    // console.log(values)
  }

  return (
    <Page>
      <div className="absolute -z-10 flex h-screen w-full items-center justify-center">
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="shadow-lg shadow-blue-400"
        >
          <p className="text-center text-3xl font-bold tracking-wider text-blue-400">
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
