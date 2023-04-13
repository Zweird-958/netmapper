import Button from "@/web/components/Button"
import clsx from "clsx"

const SubmitButton = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <Button
      type="submit"
      className={clsx(
        "mx-auto w-3/4 bg-blue-500 text-lg shadow-blue-600 dark:bg-blue-600",
        className
      )}
      {...otherProps}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
