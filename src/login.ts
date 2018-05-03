import { JsonController, Post, Body } from 'routing-controllers'
import { sign } from './jwt'
import * as request from 'superagent'
const usersUrl = process.env.USERS_URL || 'http://localhost:4003'


@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() body: {email, password}
  ) {
    console.log('line 15 auth')
    return request
      .post(`${usersUrl}/logins`)
      .send(body)
      .then(result => {
        console.log('line 20 auth', result.body)
        const jwt = sign ({id: result.body.id!})
          console.log({jwt})\
          const received = result.body
          return {jwt, received}
      })
      .catch(err => {
        return {message: err.message}
      })
    }
}