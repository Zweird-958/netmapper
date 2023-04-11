import { Switch as SwitchComponent } from "@headlessui/react"
import { useState, useEffect } from "react"

const Switch = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      setEnabled(true)
    } else {
      document.documentElement.classList.remove("dark")
      setEnabled(false)
    }
  }, [])

  return (
    <SwitchComponent
      checked={enabled}
      onChange={(val) => {
        setEnabled(val)
        localStorage.theme = val ? "dark" : "white"

        if (localStorage.theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative my-auto inline-flex h-6 w-11 items-center rounded-full py-2`}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition dark:bg-white`}
      />
    </SwitchComponent>
  )
}

export default Switch
