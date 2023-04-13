import clsx from "clsx"
import NextLink from "next/link"

const Link = (props) => {
  const { href, className, children } = props

  return (
    <NextLink
      href={href}
      className={clsx(
        "rounded px-3 py-2 font-bold text-white shadow-md",
        className
      )}
    >
      {children}
    </NextLink>
  )
}

export default Link
