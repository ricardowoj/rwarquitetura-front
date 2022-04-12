import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
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
  name: 'usuarioDetalhePermissaoNovo',
  components: { },

  data () {
    return {
      columns: COLUMNS,
      rows: [],
      usuario: [],
      validacao: false
    }
  },

  mounted () {
    $q = useQuasar()
  },

  methods: {
    abrir (usuario) {
      this.rows = []
      this.validacao = false
      this.usuario = usuario
      this.buscarPermissao(usuario.permissoes)
      this.$refs.dialog.show()
    },

    sair () {
      this.$refs.dialog.hide()
    },

    buscarPermissao (permissoesUsuario) {
      api.get('/permissao')
        .then((res) => {
          this.montarPermissoes(permissoesUsuario, res.data)
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'Erro ao buscar permissões'
          })
        })
    },

    montarPermissoes (permissoesUsuario, permissoesBase) {
      permissoesBase.forEach(permissaoBase => {
        this.validacao = false
        permissoesUsuario.forEach(permissaoUsuario => {
          if (permissaoBase.descricao === permissaoUsuario.descricao) {
            this.validacao = true
          }
        })

        if (this.validacao === false) {
          this.rows.push(permissaoBase)
        }
      })
    },

    adicionar (permissao) {
      $q.dialog({
        dark: true,
        title: 'Atenção',
        message: 'Confirma adição da permissão ao usuário?',
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
        const cadastro = {
          id: null,
          permissoes: []
        }
        cadastro.id = this.usuario.id
        cadastro.permissoes.push(permissao)
        api.put('/usuario/salvarPermissao', cadastro)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Permissão cadastrada com sucesso'
            })

            this.sair()
            this.$emit('buscarUsuario')
          })
          .catch((error) => {
            $q.notify({
              type: 'negative',
              message: error.response.data.error_description
            })
          })
      })
    }
  }
}
