<template>
  <h1>Rota teste</h1>
  <h3>Olá {{getMe}}</h3>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'index',
  computed: {
    ...mapGetters('auth', ['getMe'])
  }
})
</script>
