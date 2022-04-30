import { CrossTabClient, badge, badgeEn, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import { createStoreCreator } from '@logux/vuex'

const client = new CrossTabClient({
  server: process.env.NODE_ENV === 'development'
    ? 'ws://localhost:31337'
    : 'wss://logux.example.com',
  subprotocol: '1.0.0',
  userId: 'false', // we don't need authentication
})

const createStore = createStoreCreator(client)

const store = createStore({
  state: {
    id: null,
    counter: 0
  },
  mutations: {
    'SET_ID': (state, { value }) => {
      state.id = value;
    },
    'INC': (state, { value }) => {
      state.counter = value !== undefined ? value : state.counter + 1;
    }
  },
  actions: {},
  modules: {}
})

badge(store.client, { messages: badgeEn, styles: badgeStyles })
log(store.client)

store.client.start()

export default store