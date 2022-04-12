<template >
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('auth/init')

    const token = this.$store.getters.getToken

    if (token) {
      api.defaults.headers.common.Authorization = 'Bearer' + token.access
    } else {
      api.defaults.headers.common.Authorization = ''
    }
  },

  created () {
    this.$q.dark.set(false)
  }
})
</script>
