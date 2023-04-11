import HeaderLink from "@/web/components/HeaderLink"
import Switch from "@/web/components/Switch"

const Page = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col bg-white shadow-md dark:bg-gray-900">
      <div className="mx-auto flex w-full justify-between py-3 dark:text-white sm:w-2/3">
        <HeaderLink href="/" className="font-bold">
          NETMAPPER
        </HeaderLink>
        <div className="flex gap-6">
          <HeaderLink href="/scan" className="font-medium">
            SCAN
          </HeaderLink>
          <HeaderLink href="/historic" className="font-medium">
            HISTORIQUE
          </HeaderLink>
          <Switch />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Page
