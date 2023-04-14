import { createContext, useState } from "react"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)

  const signIn = () => {}

  const signOut = () => {
    setSession(null)
  }

  return (
    <AppContext.Provider
      value={{ state: session, actions: { signIn, signOut } }}
      {...props}
    />
  )
}

export default AppContext
