import api from "@/web/services/api"

const HomePage = () => {
  const handleSubmit = async () => {
    const ip = "192.168.10.0"
    console.log(ip)
    await api.post("nmap", { ip })
  }

  return (
    <div className="w-full">
      <button
        className="mx-auto rounded bg-red-500 text-white"
        onClick={handleSubmit}
      >
        CLICK ME
      </button>
    </div>
  )
}

export default HomePage
