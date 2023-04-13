import CommandDiv from "@/web/components/CommandDiv"
import PrettyResult from "@/web/components/PrettyResult"

const HistorySummary = (props) => {
  const { result, children } = props

  return (
    <CommandDiv>
      <PrettyResult result={result} />
      {children}
    </CommandDiv>
  )
}

export default HistorySummary
