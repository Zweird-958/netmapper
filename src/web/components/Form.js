import clsx from "clsx"
import { Formik, Form as FormFormik } from "formik"

const Form = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <Formik {...otherProps}>
      <FormFormik
        noValidate
        className={clsx(
          "mx-auto my-5 flex w-1/2 flex-col gap-4 rounded border-2 border-blue-400 px-2 py-6 shadow-lg shadow-blue-400 dark:border-blue-600 dark:shadow-blue-600 md:w-2/5 lg:w-1/4",
          className
        )}
      >
        {children}
      </FormFormik>
    </Formik>
  )
}

export default Form
