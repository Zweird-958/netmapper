const CommandInfo = (props) => {
  const { label, result } = props

  return (
    <p>
      <span className="font-bold">{label}</span> : {result}
    </p>
  )
}

export default CommandInfo
