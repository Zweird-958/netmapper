import clsx from "clsx"

const Button = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <button
      className={clsx(
        "rounded px-3 py-2 font-mono font-bold text-white shadow-md",
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
