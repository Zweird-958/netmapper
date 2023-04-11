import MainLink from "@/web/components/MainLink"
import { motion } from "framer-motion"

const HomePage = () => {
  return (
    <div className="absolute -z-10 flex h-screen w-full items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <motion.div
        className="flex flex-col items-center gap-10 font-mono text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
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
      </motion.div>
    </div>
  )
}

export default HomePage
