import PrettyResult from "@/web/components/PrettyResult"

const CommandInfo = (props) => {
  const { label, result } = props

  return (
    <p>
      <span className="text-lg font-bold">{label}</span> :{" "}
      {label == "Résultat" ? <PrettyResult result={result} /> : result}
    </p>
  )
}

export default CommandInfo
