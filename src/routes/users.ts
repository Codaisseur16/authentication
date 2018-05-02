import { JsonController, Get, CurrentUser } from "routing-controllers"
import * as request from "superagent"

const usersUrl = process.env.USERS_URL || "http://localhost:4008"

@JsonController()
export default class UsersController {
  @Get("/users")
  async getUsers(@CurrentUser() user: { id }) {
    return request
      .get(`${usersUrl}/users`)
      .set({ "x-user-id": user.id || null })
      .catch(err => {
        return { message: err.message };
      });
  }
}
