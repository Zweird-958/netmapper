import clsx from "clsx"
import { Formik, Form as FormFormik } from "formik"

const Form = (props) => {
  const { children, className, title, ...otherProps } = props

  return (
    <Formik {...otherProps}>
      <FormFormik
        noValidate
        className={clsx(
          "mx-auto my-5 flex w-1/2 flex-col gap-4 rounded border-2 border-blue-400 px-2 py-6 shadow-lg shadow-blue-400 dark:border-blue-600 dark:shadow-blue-600 md:w-2/5 lg:w-1/4",
          className
        )}
      >
        <p className="mx-auto w-fit text-3xl font-bold tracking-wider text-blue-400 transition-all hover:scale-110 dark:text-blue-600">
          {title}
        </p>
        {children}
      </FormFormik>
    </Formik>
  )
}

export default Form
