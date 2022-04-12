import { useQuasar, date } from 'quasar'
import { api } from 'src/boot/axios'
import usuarioNovo from './usuario-novo.vue'
import usuarioEditar from './usuario-editar.vue'
import usuarioDetalhe from './usuario-detalhe.vue'
import usuarioPermissao from './usuario-permissao.vue'
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
    name: 'email',
    align: 'left',
    label: 'E-mail',
    field: row => row.email,
    sortable: true
  },
  {
    name: 'tipoStatus',
    align: 'left',
    label: 'Status',
    field: row => row.tipoStatus,
    sortable: true
  },
  {
    name: 'tipoUsuario',
    align: 'left',
    label: 'Usuário',
    field: row => row.tipoUsuario,
    sortable: true
  },
  {
    name: 'dhCadastro',
    align: 'left',
    label: 'DH Cadastro',
    field: row => date.formatDate(row.dhCadastro, 'DD/MM/YYYY HH:mm'),
    sortable: true
  },
  {
    name: 'dhUltimoAcesso',
    align: 'left',
    label: 'DH Último Acesso',
    field: row => date.formatDate(row.dhUltimoAcesso, 'MM/DD/YYYY HH:mm'),
    sortable: true
  }
]

export default {
  name: 'usuario',
  components: { usuarioNovo, usuarioDetalhe, usuarioPermissao, usuarioEditar },
  data () {
    return {
      columns: COLUMNS,
      rows: []
    }
  },

  mounted () {
    $q = useQuasar()
  },

  created () {
    this.buscarUsuarios()
  },

  methods: {
    buscarUsuarios () {
      api.get('/usuario')
        .then(res => {
          this.rows = res.data
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'Erro ao buscar usuários'
          })
        })
    },

    detalhar () {

    },

    remover (usuario) {
      $q.dialog({
        dark: true,
        title: 'Atenção',
        message: 'Confirma a remoção do usuário?',
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
        api.delete('/usuario/remover/' + usuario.id)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Usuário removido com sucesso'
            })

            this.buscarUsuarios()
          })
          .catch(() => {
            $q.notify({
              type: 'negative',
              message: 'Erro ao remover usuário'
            })
          })
      })
    },

    abrirUsuarioNovo () {
      this.$refs.usuarioNovo.abrir()
    },

    abrirUsuarioDetalhe (usuario) {
      this.$refs.usuarioDetalhe.abrir(usuario)
    },

    abrirUsuarioEditar (usuario) {
      this.$refs.usuarioEditar.abrir(usuario)
    },

    abrirPermissao () {
      this.$refs.usuarioPermissao.abrir()
    }
  }
}
