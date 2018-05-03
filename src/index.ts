import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError } from "routing-controllers"
import { verify } from './jwt'
import UsersController from './authentication'

const port = process.env.PORT || 4005

const app = createKoaServer({
  cors: true,
  controllers: [
    UsersController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }
    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      if (token) {
        const {id} = verify(token)
        return {id}
      }
    }
    return {}
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
