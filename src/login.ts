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
    return request
      .post(`${usersUrl}/logins`)
      .send(body)
      .then(result => {
        const jwt = sign ({id: result.body.user.id!})
          const received = result.body
          return {jwt, received}
      })
      .catch(err => {
        return {message: err.message}
      })
    }
}