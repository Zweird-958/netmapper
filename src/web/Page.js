import HeaderLink from "@/web/components/HeaderLink"

const Page = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto flex w-full justify-between py-3 sm:w-2/3">
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
        </div>
      </div>
      <hr />
      {children}
    </div>
  )
}

export default Page
