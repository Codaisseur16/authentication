import { JsonController, Get, Param } from "routing-controllers"
import * as request from "superagent"
import { sign } from "./jwt"

const usersUrl = process.env.USERS_URL || "http://localhost:4003"

@JsonController()
export default class UsersController {

  @Get("/users/:id")
  async getUsersId(
    @Param('id') userId: number
  ) {
    console.log('line 21 auth', userId)
    return request
      .get(`${usersUrl}/users/${userId}`)
      .then(result => {
        console.log('line 28 auth', result.body)
        const jwt = sign({ id: userId! })
          console.log({jwt})
          return {jwt}
      })
      .catch(err => {
        return { message: err.message + userId };
      });
  }

  // @Get("/:users/:id")
  // async getUsersId(
  //   @Param('id') userId: number,
  //   @Param('users') users: string
  // ) {
  //   console.log('line 21 auth', userId, users)
  //   return request
  //     .get(`${usersUrl}/${users}/${userId}`)
  //     .then(result => {
  //       console.log('line 28 auth', result.body)
  //       const jwt = sign({ id: userId! })
  //         console.log({jwt})
  //         return {jwt}
  //     })
  //     .catch(err => {
  //       return { message: err.message + userId };
  //     });
  // }
}
