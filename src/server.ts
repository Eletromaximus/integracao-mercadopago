import express from 'express'
// import { router } from './routes'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'
// import { createServer, IncomingMessage, ServerResponse } from 'http'
import fetch from 'node-fetch'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

const option = {
  'Content-Type': 'application/json'
}
async function x () {
  // eslint-disable-next-line no-undef
  const res: any = await fetch(
    `https://api.mercadopago.com/users/test_user?access_token=${process.env.ACESS_TOKEN}`, {
      method: 'POST',
      headers: option,
      body: JSON.stringify({ site_id: 'MLB' })
    })
    .then((response: any) => {
      return response.json()
    })
    .catch((error: any) => {
      console.log(error)
    })

  console.log(res)
  return res
}

const response = x()

app.listen(process.env.PORT || 4000, () => {
  console.log('A resposta é: ' + response)
})
