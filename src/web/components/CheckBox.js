import { Field } from "formik"

const CheckBox = (props) => {
  const { label, name } = props

  return (
    <div className="flex items-center gap-1 dark:text-white">
      <Field type="checkbox" name={name} className="h-4 w-4" />
      <p className="">{label}</p>
    </div>
  )
}

export default CheckBox
