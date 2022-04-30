import { Server } from '@logux/server'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url
  })
)

server.auth(({ userId, token }) => {
  return true
})

const db = {
  id: null,
  counter: 0
}

server.channel('counter', {
  access () {
    // Access control is mandatory
    return true
  },
  async load (ctx) {
    // Load initial state when client subscribing to the channel.
    // You can use any database.
    let value = db.counter
    return { type: 'INC', value }
  }
})

server.type('INC', {
  access () {
    return true
  },
  resend () {
    return 'counter'
  },
  async process () {
    db.counter = db.counter + 1;
  }
})

server.listen()