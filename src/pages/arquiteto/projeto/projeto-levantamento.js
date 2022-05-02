import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import jwtDecode from 'jwt-decode'
let $q
import projetoLevantamentoControle from './projeto-levantamento-controle.vue'

const COLUMNS = [
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: 'actions'
  },
  {
    name: 'nome',
    align: 'left',
    label: 'Cliente',
    field: row => row.clienteSecundario.nome,
    sortable: true
  },
  {
    name: 'cidade',
    align: 'left',
    label: 'Cidade',
    field: row => row.cidade,
    sortable: true
  },
  {
    name: 'rua',
    align: 'left',
    label: 'Rua',
    field: row => row.rua,
    sortable: true
  },
  {
    name: 'tipoProjeto',
    align: 'left',
    label: 'Projeto',
    field: row => {
      if (row.tipoProjeto === 1) {
        return 'Residêncial'
      } else if (row.tipoProjeto === 2) {
        return 'Residêncial'
      } else if (row.tipoProjeto === 3) {
        return 'Comercial'
      } else if (row.tipoProjeto === 4) {
        return 'Educacional'
      } else if (row.tipoProjeto === 5) {
        return 'Saúde'
      } else if (row.tipoProjeto === 6) {
        return 'Estatal'
      }
    }
  },
  {
    name: 'tipoCaracteristica',
    align: 'left',
    label: 'Característica',
    field: row => {
      if (row.tipoCaracteristica === 1) {
        return 'Designer de Interiores'
      } else if (row.tipoCaracteristica === 2) {
        return 'Arquitetônico'
      }
    },
    sortable: true
  }
]

export default {
  name: 'projeto-levantamento',
  components: { projetoLevantamentoControle },
  data () {
    return {
      arquiteto: '',
      columns: COLUMNS,
      rows: [],
      email: ''
    }
  },

  mounted () {
    $q = useQuasar()
    this.emailUsuario()
  },

  methods: {
    emailUsuario () {
      const tokenDecoded = jwtDecode(window.localStorage.getItem('token'))
      this.email = tokenDecoded.user_name
      this.buscarArquiteto()
    },

    buscarArquiteto () {
      const emailDTO = { email: this.email }
      api.post('/arquiteto/buscarPorEmail', emailDTO)
        .then((res) => {
          this.arquiteto = res.data
          this.buscarProjetos()
        })
        .catch((error) => {
          if (error.response.data.error === 'Not Found') {
            $q.notify({
              type: 'warning',
              message: 'Cadastro não localizado'
            })
          } else {
            $q.notify({
              type: 'negative',
              message: error.response.data.error
            })
          }
        })
    },

    buscarProjetos () {
      api.get('projeto/arquiteto/' + this.arquiteto.id)
        .then((res) => {
          this.rows = res.data
        })
        .catch((error) => {
          if (error.response.data.error) {
            $q.notify({
              type: 'negative',
              message: error.response.data.error
            })
          }
        })
    },

    abrirEditar (row) {
      this.$refs.projetoLevantamentoControle.abrirEditar(row)
    }
  }
}
