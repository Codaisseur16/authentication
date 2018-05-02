import { JsonController, Post, Body } from 'routing-controllers'
import { sign } from '../jwt'
import * as request from 'superagent'
const usersUrl = process.env.USERS_URL || 'http://localhost:4008'

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() body: body
    //body includes email and password
  ) {
    return request
      .post(`${usersUrl}/users`)

      .send(body)
      .then(function(res) {
        const jwt = sign({ id: res.body.id!, role: res.body.role! })
        return { jwt }
      })
      .catch(err => {
        return {message: err.message}
      })
    }
}