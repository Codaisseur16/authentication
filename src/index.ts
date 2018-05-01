import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"

const port = process.env.PORT || 4008

const app = createKoaServer({
  controllers: [
    //..
  ]
})

app.listen(port, () => console.log(`Listening on port ${port}`))