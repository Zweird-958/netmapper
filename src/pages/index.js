import MainLink from "@/web/components/MainLink"

const HomePage = () => {
  return (
    <div className="absolute -z-10 flex h-screen w-full flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-500 to-blue-500 font-mono text-white dark:from-cyan-600 dark:to-blue-700">
      <p className="text-6xl font-bold tracking-widest transition-all hover:tracking-normal">
        NETMAPPER
      </p>
      <p className="max-w-md text-center ">
        Bienvenue sur Netmapper 👋 ! Si vous êtes nouveau effectuez votre
        premier scan 🌐 ou bien regardez l'historique 📄!
      </p>
      <div className="flex gap-7">
        <MainLink href="/scan" className="bg-blue-400">
          SCAN
        </MainLink>
        <MainLink href="/scan" className="bg-blue-400">
          HISTORIQUE
        </MainLink>
      </div>
    </div>
  )
}

export default HomePage
