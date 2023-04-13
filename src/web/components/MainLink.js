import Link from "@/web/components/Link"
import clsx from "clsx"

const MainLink = (props) => {
  const { children, className, href } = props

  return (
    <Link
      href={href}
      className={clsx(
        "my-2 bg-gradient-to-b from-green-400 to-emerald-400  shadow-emerald-600 transition-transform hover:scale-150",
        className
      )}
    >
      {children}
    </Link>
  )
}

export default MainLink
