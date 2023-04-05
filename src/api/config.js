const config = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  pagination: {
    limit: 10,
  },
}

export default config
