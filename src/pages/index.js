import AppContext from "@/web/components/AppContext"
import MainLink from "@/web/components/MainLink"
import api from "@/web/services/api"
import { useContext, useEffect, useState } from "react"

const HomePage = () => {
  const {
    state: { session },
  } = useContext(AppContext)

  const [username, setUsername] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (session) {
        const {
          data: { result },
        } = await api.get(`/user/${session.userId}`)

        setUsername(result.username)
      }
    })()
  }, [session])

  return (
    <div className="absolute -z-10 flex h-screen w-full flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-500 to-blue-500 font-mono text-white dark:from-cyan-600 dark:to-blue-700">
      <p className="text-6xl font-bold tracking-widest transition-all hover:tracking-normal">
        NETMAPPER
      </p>
      <p className="max-w-md text-center ">
        {username
          ? `Bon retour parmi nous ${username} 👋 ! Effectue un scan 🌐 ou bien regarde ton historique 📄`
          : " Bienvenue sur Netmapper 👋 ! Si vous êtes nouveau veuillez créer un compte ou bien connectez vous!"}
      </p>
      <div className="flex gap-7">
        {session ? (
          <>
            <MainLink href="/scan">SCAN</MainLink>
            <MainLink href="/history">HISTORIQUE</MainLink>
          </>
        ) : (
          <>
            <MainLink href="/sign-up">S'INSCRIRE</MainLink>
            <MainLink href="/sign-in">SE CONNECTER</MainLink>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
