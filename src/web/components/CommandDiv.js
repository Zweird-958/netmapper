import clsx from "clsx"

const CommandDiv = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <div
      className={clsx(
        "dark:to-blue-transparent my-4 flex flex-col rounded border-2 border-sky-600 bg-gradient-to-r px-3 py-2 font-mono shadow-md shadow-blue-600 dark:from-transparent dark:text-white",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default CommandDiv
