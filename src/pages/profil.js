import Page from "@/web/components/Page"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AppContext from "@/web/components/AppContext"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useEffect, useContext, useState } from "react"

const ProfilText = (props) => {
  const { label, children } = props

  return (
    <div className="w-3/4">
      <p className="font-bold text-slate-400">{label}</p>
      <p className="my-2 rounded-lg border-2 px-2 py-2 dark:text-white">
        {children}
      </p>
    </div>
  )
}

const Profil = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  const {
    state: { session },
  } = useContext(AppContext)

  useEffect(() => {
    ;(async () => {
      if (session) {
        try {
          const {
            data: { result },
          } = await api.get(`/user/${session.userId}`)

          setUser(result)
        } catch (err) {
          router.push("/sign-in")
        }
      }
    })()
  }, [router, session])

  return (
    <Page>
      {user && (
        <AbsoluteDiv>
          <div className="flex h-2/5 w-1/3 flex-col items-center justify-center rounded border-2 shadow-md">
            <ProfilText label="Nom d'utilisateur:">{user.username}</ProfilText>
            <ProfilText label="Email:">{user.email}</ProfilText>
            <ProfilText label="Date de création:">{user.username}</ProfilText>
          </div>
        </AbsoluteDiv>
      )}
    </Page>
  )
}

export default Profil
