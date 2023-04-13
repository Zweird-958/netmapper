const PrettyResult = (props) => {
  const { result } = props

  return (
    <>
      {result.split("\n").map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </>
  )
}

export default PrettyResult
