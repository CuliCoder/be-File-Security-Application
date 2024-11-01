import express from 'express'
import dotenv from 'dotenv'
import router from './routes/api.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})