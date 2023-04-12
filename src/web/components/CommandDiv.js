import clsx from "clsx"

const CommandDiv = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <div
      className={clsx(
        "my-4 flex flex-col rounded border-2 border-sky-600 px-3 py-2 font-mono shadow-lg dark:text-white",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default CommandDiv
