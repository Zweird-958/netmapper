import HeaderLink from "@/web/components/HeaderLink"
import Switch from "@/web/components/Switch"

const Page = (props) => {
  const { children } = props

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
            <HeaderLink href="/scan" className="font-medium">
              SCAN
            </HeaderLink>
            <HeaderLink href="/history" className="font-medium">
              HISTORIQUE
            </HeaderLink>
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
