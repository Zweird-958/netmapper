import clsx from "clsx"
import Link from "next/link"

const MainLink = (props) => {
  const { children, className, href } = props

  return (
    <Link
      href={href}
      className={clsx(
        "my-2 rounded bg-gradient-to-b from-green-400 to-emerald-400 px-3 py-2 font-bold text-white shadow-lg shadow-emerald-600 transition-transform hover:scale-150",
        className
      )}
    >
      {children}
    </Link>
  )
}

export default MainLink
