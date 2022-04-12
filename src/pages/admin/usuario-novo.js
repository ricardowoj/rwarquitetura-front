import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
let $q

const CADASTRO = {
  email: '',
  senha: '',
  tipoStatus: null,
  tipoUsuario: null
}

const TIPO_USUARIO = ['Admin', 'Arquiteto', 'Cliente Secundário']

const TIPOS = [
  { id: 1, nome: 'Ativo' },
  { id: 0, nome: 'Bloqueado' }
]

export default {
  name: 'UsuarioNovo',

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
      cadastro: CADASTRO,
      tipoUsuario: TIPO_USUARIO,
      tipoStatus: TIPOS
    }
  },

  mounted () {
    $q = useQuasar()
  },

  methods: {
    abrir () {
      this.cadastro = Object.assign({}, CADASTRO)
      this.$refs.dialog.show()
    },

    sair () {
      this.$refs.dialog.hide()
    },

    salvar () {
      this.$refs.inputEmail.validate()
      this.$refs.inputSenha.validate()
      if (this.$refs.inputEmail.hasError || this.$refs.inputEmail.hasError) {
        $q.notify({
          type: 'warning',
          message: 'E-mail e/ou senha incorreto(s)'
        })
        return
      }

      $q.dialog({
        dark: true,
        title: 'Atenção',
        message: 'Confirma a criação do usuário?',
        ok: {
          push: false,
          color: 'primary',
          label: 'Sim'
        },
        cancel: {
          push: false,
          color: 'dark',
          label: 'Não'
        },
        persistent: true
      }).onOk(() => {
        api.post('/usuario/salvar', this.cadastro)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Usuário Cadastrado com sucesso'
            })
            this.sair()
            this.$emit('buscarUsuarios')
          })
          .catch((error) => {
            if (error.response) {
              $q.notify({
                type: 'negative',
                message: error.response.data.error_description
              })
            }
          })
      })
    },

    validarEmail (emaiInput) {
      const regex = /\S+@\S+\.\S+/
      return regex.test(emaiInput)
    }
  }
}
