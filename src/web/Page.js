import Link from "next/link"

const Page = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col bg-white">
      <div className="mx-auto flex justify-between py-3 sm:w-full md:w-2/3">
        <Link href="/" className="font-bold">
          NETMAPPER
        </Link>
        <div className="flex gap-6">
          <Link href="/scan">SCAN</Link>
          <p>HISTORIQUE</p>
        </div>
      </div>
      <hr />
      {children}
    </div>
  )
}

export default Page
