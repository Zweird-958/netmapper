import Page from "@/web/Page"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AppContext from "@/web/components/AppContext"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import SubmitButton from "@/web/components/SubmitButton"
import { useRouter } from "next/router"
import { useContext } from "react"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("✉️ E-mail"),
  password: yup.string().min(8).required().label("🔒 Password"),
})

const SignIn = () => {
  const {
    actions: { signIn },
  } = useContext(AppContext)
  const router = useRouter()

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values
    const [err] = await signIn(email, password)

    if (!err) {
      resetForm()
      router.push("/scan")
    }
  }

  return (
    <Page>
      <AbsoluteDiv>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Field name="email" placeholder="E-mail" />
          <Field name="password" placeholder="Password" type="password" />
          <SubmitButton>Se connecter</SubmitButton>
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignIn
