import AppContext from "@/web/components/AppContext"
import Button from "@/web/components/Button"
import HeaderLink from "@/web/components/HeaderLink"
import Switch from "@/web/components/Switch"
import { useContext } from "react"

const Page = (props) => {
  const { children } = props
  const {
    actions: { signOut },
    state: { session },
  } = useContext(AppContext)

  return (
    <div className="flex flex-col">
      {/* Header Background */}
      <div className="w-full bg-white py-3 shadow-md dark:bg-gray-900 dark:text-white">
        {/* Header Texts */}
        <div className="mx-auto flex w-full justify-between sm:w-2/3">
          <HeaderLink href="/" className="font-bold">
            NETMAPPER
          </HeaderLink>
          {/* Right texts */}
          <div className="flex gap-6">
            {session ? (
              <>
                <HeaderLink href="/scan" className="font-medium">
                  SCAN
                </HeaderLink>
                <HeaderLink href="/history" className="font-medium">
                  HISTORIQUE
                </HeaderLink>
                <button
                  onClick={signOut}
                  className="rounded border-b-blue-400 py-2 font-medium transition-all duration-500 hover:bg-blue-500 hover:px-2 hover:text-white dark:hover:text-black"
                >
                  SE DECONNECTER
                </button>
              </>
            ) : (
              <>
                <HeaderLink href="/sign-in" className="font-medium">
                  SE CONNECTER
                </HeaderLink>
                <HeaderLink href="/sign-up" className="font-medium">
                  S'INSCRIRE
                </HeaderLink>
              </>
            )}
            <Switch />
          </div>
        </div>
      </div>
      {/* Body */}
      {children}
    </div>
  )
}

export default Page
