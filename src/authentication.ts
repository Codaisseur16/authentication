import { JsonController, Put, CurrentUser, Body } from "routing-controllers"
import * as request from "superagent"

const usersUrl = process.env.USERS_URL || "http://localhost:4003"

@JsonController()
export default class UsersController {
  
  @Put("/users/:id")
  async getUsersId(
    @CurrentUser() user: {id},
    @Body() update: {firstName: string, lastName: string, email: string, password: string, teacher: boolean} 
) {
    const result = await request
      .put(`${usersUrl}/users/${user.id}`)
      .send({ ...update })

    return result.body
  }

  // @Get("/:users/:id")
  // async getUsersId(
  //   @Param('id') userId: number,
  //   @Param('users') users: string
  // ) {
  //   return request
  //     .get(`${usersUrl}/${users}/${userId}`)
  //     .then(result => {
  //       console.log('line 32 auth', result.body)
  //     })
  //     .catch(err => {
  //       return { message: err.message + userId };
  //     });
  // }
}
