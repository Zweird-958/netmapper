import { Field } from "formik"

const Radio = (props) => {
  const { label, name, value } = props

  return (
    <div className="flex items-center gap-1 dark:text-white">
      <Field type="radio" name={name} className="h-4 w-4" value={value} />
      <p className="">{label}</p>
    </div>
  )
}

export default Radio
