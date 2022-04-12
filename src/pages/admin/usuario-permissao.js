import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import usuarioPermissaoNovo from './usuario-permissao-novo.vue'
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
  name: 'usuarioPermissao',
  components: { usuarioPermissaoNovo },

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
    abrir () {
      this.buscarPermissao()
      this.$refs.dialog.show()
    },

    sair () {
      this.$refs.dialog.hide()
    },

    buscarPermissao () {
      api.get('/permissao')
        .then((res) => {
          this.rows = res.data
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'Erro ao removido usuário'
          })
        })
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
        api.delete('/permissao/' + permissao.id)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Permissão removida com sucesso'
            })

            this.buscarPermissao()
          })
          .catch((error) => {
            $q.notify({
              type: 'negative',
              message: error.response.data.error_description
            })
          })
      })
    },

    novaPermissao () {
      this.$refs.usuarioPermissaoNovo.abrir()
    }
  }
}
