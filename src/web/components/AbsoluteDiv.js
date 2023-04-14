import clsx from "clsx"

const AbsoluteDiv = (props) => {
  const { className, children } = props

  return (
    <div
      className={clsx(
        "absolute -z-10 flex h-screen w-full items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export default AbsoluteDiv
