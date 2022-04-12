import { useQuasar, QSpinnerOval } from 'quasar'
import { mapActions } from 'vuex'
import { ref } from 'vue'
let $q
import jwtDecode from 'jwt-decode'

export default {
  name: 'Login',
  setup () {
    const inputEmail = ref(null)
    const inputSenha = ref(null)

    return {
      model: ref(''),
      inputEmail,
      inputSenha,

      reset () {
        inputEmail.value.resetValidation()
        inputSenha.value.resetValidation()
      }
    }
  },
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      validacao: false
    }
  },
  mounted () {
    $q = useQuasar()
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async formLogin () {
      this.$refs.inputEmail.validate()
      this.$refs.inputSenha.validate()
      if (this.$refs.inputEmail.hasError || this.$refs.inputEmail.hasError) {
        $q.notify({
          type: 'warning',
          message: 'E-mail e/ou senha incorreto(s)'
        })
        return
      }

      try {
        $q.loading.show({
          spinner: QSpinnerOval,
          spinnerColor: 'yellow',
          spinnerSize: 70,
          backgroundColor: 'purple-2'
        })

        await this.doLogin(this.login)
        const usuarioAdmin = this.usuarioAdmin()
        if (usuarioAdmin === true) {
          const toPath = this.$route.query.to || '/usuario'
          this.$router.push(toPath)
        } else {
          const toPath = this.$route.query.to || '/meu-perfil'
          this.$router.push(toPath)
        }
        $q.loading.hide()
      } catch (error) {
        if (error.response.data.error_description === 'Bad credentials') {
          $q.notify({
            type: 'warning',
            message: 'E-mail e/ou senha incorreto(s)'
          })
        } else if (error.response.data.error === 'unauthorized') {
          $q.notify({
            type: 'warning',
            message: 'E-mail e/ou senha incorreto(s)'
          })
        }
        $q.loading.hide()
      }
    },
    validarEmail (emaiInput) {
      const regex = /\S+@\S+\.\S+/
      return regex.test(emaiInput)
    },
    usuarioAdmin () {
      const tokenDecoded = jwtDecode(window.localStorage.getItem('token'))
      this.validacao = false
      tokenDecoded.authorities.forEach(permissao => {
        if (permissao === 'ROLE_GERENCIAR_USUARIO') {
          this.validacao = true
        }
      })
      return this.validacao
    },
    esqueciSenha () {
    },
    criarConta () {
    }
  }
}
