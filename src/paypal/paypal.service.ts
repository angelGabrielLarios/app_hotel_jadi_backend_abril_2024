import { Injectable } from '@nestjs/common';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';
import { ConfigService } from '@nestjs/config';
import { IPaypalAccesToken } from './interfaces/paypal-acess-token.interface';

@Injectable()
export class PaypalService {
  private client_id: string
  private client_secret: string
  private endpoint_url: string

  constructor(private configService: ConfigService) {
    this.client_id = this.configService.get<string>('PAYPAL_CLIENT_ID')

    this.client_secret = this.configService.get<string>('PAYPAL_CLIENT_SECRET')

    this.endpoint_url = this.configService.get<string>('PAYPAL_ENVIRONMENT') === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
    console.log(this.configService.get<string>('PAYPAL_ENVIRONMENT'))


  }

  async getAccessToken() {


    const client_id = this.client_id
    const client_secret = this.client_secret


    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'


    const response = await fetch(`${this.endpoint_url}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
      },
      body: data
    })

    const dataAPI: IPaypalAccesToken = await response.json() as IPaypalAccesToken

    console.log(dataAPI)
    return dataAPI

  }

  async createOrder({ intent, amount_value }: { intent: string, amount_value: number }) {


    console.log(amount_value)
    try {
      const { access_token } = await this.getAccessToken()



      const orderDataJSON = {
        intent: intent.toUpperCase(),
        'purchase_units': [{
          'amount': {
            'currency_code': 'MXN',
            'value': `${amount_value}`
          }
        }],
        application_context: {
          return_url: "https://example.com/return",
          cancel_url: "https://example.com/cancel"
        }
      }
      const response = await fetch(`${this.endpoint_url}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(orderDataJSON)
      })

      const dataAPI = await response.json()


      console.log(dataAPI)
      return dataAPI
    } catch (error) {
      console.error(error)
    }
  }

  async completeOrder({ order_id, intent }: { order_id: string, intent: string }) {
    const { access_token } = await this.getAccessToken()

    const response = await fetch(`${this.endpoint_url}/v2/checkout/orders/${order_id}/${intent}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })

    const dataAPI = await response.json()
    return dataAPI
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createPaypalDto: CreatePaypalDto) {
    return 'This action adds a new paypal';
  }

  findAll() {
    return `This action returns all paypal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypal`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePaypalDto: UpdatePaypalDto) {
    return `This action updates a #${id} paypal`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypal`;
  }
}
