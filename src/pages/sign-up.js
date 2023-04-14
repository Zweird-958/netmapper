import Page from "@/web/Page"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import * as yup from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().required().label("😀 Username"),
  email: yup.string().email().required().label("✉️ E-mail"),
  password: yup.string().min(8).required().label("🔒 Password"),
})

const SignUp = () => {
  const handleSubmit = async (values) => {
    await api.post("/sign-up", values)
  }

  return (
    <Page>
      <Form
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Field name="username" placeholder="Username" />
        <Field name="email" placeholder="E-mail" />
        <Field name="password" placeholder="Password" type="password" />
        <SubmitButton>S'inscrire</SubmitButton>
      </Form>
    </Page>
  )
}

export default SignUp
