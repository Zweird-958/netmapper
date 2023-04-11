import clsx from "clsx"
import Link from "next/link"

const HeaderLink = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <Link
      className={clsx(
        "rounded border-b-blue-400 py-2 transition-all duration-500 hover:bg-blue-500 hover:px-2 hover:text-white",
        className
      )}
      {...otherProps}
    >
      {children}
    </Link>
  )
}

export default HeaderLink
