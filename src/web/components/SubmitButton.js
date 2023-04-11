import clsx from "clsx"

const SubmitButton = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <button
      type="submit"
      className={clsx(
        "mx-auto w-3/4 rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white shadow-md shadow-blue-600 dark:bg-blue-600",
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default SubmitButton
