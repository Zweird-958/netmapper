const formatDate = (dateString) => {
  const date = new Date(dateString)

  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  }

  const formatter = new Intl.DateTimeFormat("fr-FR", options)

  const formattedDate = formatter.format(date)

  return formattedDate.replace(" ", " à ")
}

export default formatDate
