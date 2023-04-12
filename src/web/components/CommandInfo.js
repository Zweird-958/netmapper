const CommandInfo = (props) => {
  const { label, result } = props

  return (
    <div className="flex">
      <p>
        <span className="font-bold">{label}</span> : {result}
      </p>
    </div>
  )
}

export default CommandInfo
