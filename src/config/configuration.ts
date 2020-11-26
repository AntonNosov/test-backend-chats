export default () => ({
  node: process.env.NODE,
  host: process.env.HOST,
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtMaxAge: process.env.JWT_MAX_AGE || 3600 * 24,
    hashRound: 10
  },
  rabbit: {
    url: process.env.RABBIT_URL,
    queues: {
      completionUnit: {
        name: process.env.RABBIT_QUEUE_COMPLETION_UNIT,
        pattern: process.env.RABBIT_QUEUE_COMPLETION_UNIT_PATTERN
      }
    }
  }
})