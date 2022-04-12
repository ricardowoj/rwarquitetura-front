import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import usuarioDetalhePermissaoNovo from './usuario-detalhe-permissao-novo.vue'
let $q

const COLUMNS = [
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: 'actions'
  },
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'descricao',
    align: 'left',
    label: 'Descrição',
    field: row => row.descricao,
    sortable: true
  }
]

export default {
  name: 'UsuarioDetalhe',
  components: { usuarioDetalhePermissaoNovo },

  data () {
    return {
      cadastro: [],
      columns: COLUMNS,
      rows: []
    }
  },

  mounted () {
    $q = useQuasar()
  },

  methods: {
    abrir (usuario) {
      this.cadastro = Object.assign({}, usuario)
      this.preencherPermissoes()
      this.$refs.dialog.show()
    },

    preencherPermissoes () {
      this.rows = []
      for (let i = 0; i < this.cadastro.permissoes.length; i++) {
        this.rows.push(this.cadastro.permissoes[i])
      }
    },

    sair () {
      this.$refs.dialog.hide()
    },

    remover (permissao) {
      $q.dialog({
        dark: true,
        title: 'Atenção',
        message: 'Confirma a remoção da permissão?',
        ok: {
          push: false,
          color: 'primary',
          label: 'Sim'
        },
        cancel: {
          push: false,
          color: 'primary',
          label: 'Não'
        },
        persistent: true
      }).onOk(() => {
        const teste = this.cadastro.permissoes.filter((item) => item.id !== permissao.id)
        this.cadastro.permissoes = teste
        this.cadastro.dhUltimoAcesso = null
        api.put('usuario/removerPermissao', this.cadastro)
          .then(() => {
            this.buscarUsuario()

            $q.notify({
              type: 'positive',
              message: 'permissão removida com sucesso'
            })
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

    novaPermissao () {
      this.$refs.usuarioDetalhePermissaoNovo.abrir(this.cadastro)
    },

    buscarUsuario () {
      const email = {
        email: this.cadastro.email
      }
      api.post('/usuario/buscarPorEmail', email)
        .then((res) => {
          this.cadastro = Object.assign({}, res.data)
          this.preencherPermissoes()
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'Erro ao buscar usuário'
          })
        })
    }
  }
}
