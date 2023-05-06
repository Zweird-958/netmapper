import Page from "@/web/components/Page"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AppContext from "@/web/components/AppContext"
import Field from "@/web/components/Field"
import Form from "@/web/components/Form"
import SubmitButton from "@/web/components/SubmitButton"
import api from "@/web/services/api"
import { useContext } from "react"
import * as yup from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().required().label("😀 Username"),
  email: yup.string().email().required().label("✉️ E-mail"),
  password: yup
    .string()
    .min(8)
    // .matches(
    //   "❌ Votre mot de passe doit contenir au moins un caractère spécial (@$!%*#?&), un chiffre et une majuscule et une minuscule"
    // )
    .required()
    .label("🔒 Password"),
})

const SignUp = () => {
  const {
    actions: { signIn },
  } = useContext(AppContext)

  const handleSubmit = async (values) => {
    await api.post("/sign-up", values)
    const { email, password } = values
    await signIn(email, password)
  }

  return (
    <Page>
      <AbsoluteDiv>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          title="INSCRIPTION"
        >
          <Field
            name="username"
            placeholder="_nmap_"
            label="Nom d'utilisateur"
          />
          <Field name="email" placeholder="nmap@gmail.com" label="E-mail" />
          <Field name="password" type="password" label="Mot de passe" />
          <SubmitButton>S'inscrire</SubmitButton>
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignUp
