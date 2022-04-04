/* eslint-disable camelcase */
import HttpClient from '../utils/http'

interface IPayment {
  email: string,
  first_name: string,
  last_name: string,
  phone: {
    area_code: string,
    number: string
  },
  identification: {
    type: string,
    number: string
  },
  default_address: string,
  address: {
    id: string,
    zip_code: string,
    street_name: string,
    street_number: number
  },
  date_registered: Date,
  description: string,
  default_card: string
}

export class UseUser {
  async testUser () {
    const option = {
      'Content-Type': 'application/json'
    }

    const queryParams = {
      access_token: `${process.env.ACESS_TOKEN_TEST}`
    }

    const url = new URL('https://api.mercadopago.com/users/test_user')
    url.search = new URLSearchParams(queryParams).toString()

    const content: any = {
      method: 'POST',
      headers: option,
      body: JSON.stringify({ site_id: 'MLB' })
    }

    const response = HttpClient(url.toString(), content)

    console.log(response)
  }

  async createCliente (data: IPayment) {
    const url = new URL('https://api.mercadopago.com/v1/customers')

    const option = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACESS_TOKEN}`
    }

    const body = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: {
        area_code: data.phone.area_code,
        number: data.phone.number
      },
      identification: {
        type: data.identification.type,
        number: data.identification.number
      },
      default_address: data.default_address,
      address: {
        id: data.address.id,
        zip_code: data.address.zip_code,
        street_name: data.address.street_name,
        street_number: data.address.street_number
      },
      date_registered: data.date_registered,
      description: data.description,
      default_card: data.default_card
    }

    const result = HttpClient(url.toString(), {
      method: 'POST',
      headers: option,
      body: JSON.stringify(body)
    })

    console.log(result)
  }
}
