import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
let $q

const CADASTRO = {
  descricao: ''
}

export default {
  name: 'UsuarioNovo',

  data () {
    return {
      cadastro: CADASTRO
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
      $q.dialog({
        dark: true,
        title: 'Atenção',
        message: 'Confirma a criação da permisão?',
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
        api.post('/permissao', this.cadastro)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Permissão cadastrada com sucesso'
            })
            this.sair()
            this.$emit('buscarPermissao')
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
    }
  }
}
