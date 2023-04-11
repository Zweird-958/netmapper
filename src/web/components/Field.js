import clsx from "clsx"
import { ErrorMessage, Field as FieldFormik } from "formik"

const Field = (props) => {
  const { name, placeholder, className, ...otherProps } = props

  return (
    <>
      <FieldFormik
        name={name}
        placeholder={placeholder}
        className={clsx(
          "mx-auto w-3/4 rounded border-2 border-blue-400 px-2 py-1",
          className
        )}
        {...otherProps}
      />
      <ErrorMessage
        name={name}
        component="span"
        className="mx-auto w-3/4 text-sm text-red-500"
      />
    </>
  )
}

export default Field
