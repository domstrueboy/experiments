<template>
  <h1 v-if="isSubscribing">Loading...</h1>
  <div v-else>
    <h1>{{ counter }}</h1>
    <button @click="increment">+</button>
    <p>{{ id }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore, useSubscription } from '@logux/vuex'

export default {
  setup () {
    console.log('HISTORY', location.pathname.slice(1));
    
    // Inject store into the component
    let store = useStore()
    // Load current counter from server and subscribe to counter changes
    let isSubscribing = useSubscription(['id', 'counter'])
    // Retrieve counter state from store
    let id = computed(() => store.state.id)
    let counter = computed(() => store.state.counter)

    function increment () {
      // Send action to the server and all tabs in this browser
      store.commit.sync({ type: 'INC' })
    }

    return {
      counter,
      increment,
      isSubscribing
    }
  }
}
</script>