import { useQuasar, date } from 'quasar'
import { api } from 'src/boot/axios'
import jwtDecode from 'jwt-decode'
let $q
import clienteNovo from './cliente-novo.vue'
import clienteDetalhe from './cliente-detalhe.vue'

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
    label: 'Nome',
    field: row => row.nome,
    sortable: true
  },
  {
    name: 'email',
    align: 'left',
    label: 'E-mail',
    field: row => row.usuario.email,
    sortable: true
  },
  {
    name: 'dhCadastro',
    align: 'left',
    label: 'DH Cadastro',
    field: row => date.formatDate(row.dhCadastro, 'DD/MM/YYYY HH:mm'),
    sortable: true
  }
]

export default {
  name: 'Cliente',
  components: { clienteNovo, clienteDetalhe },
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
          this.buscarClientes()
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

    buscarClientes () {
      api.get('/cliente/arquiteto/' + this.arquiteto.id)
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

    abrirNovo () {
      this.$refs.clienteNovo.abrirNovo(this.arquiteto)
    },

    buscarCep () {
      if (!(/^[0-9]{8}$/).test(this.cadastro.cep.replace(/[^a-zA-Z0-9]/g, ''))) {
        return
      }
      const cep = {
        cep: this.cadastro.cep.replace(/[^a-zA-Z0-9]/g, '')
      }
      api.post('/arquiteto/cep', cep)
        .then((res) => {
          this.cadastro.cidade = res.data.localidade
          this.cadastro.estado = res.data.uf
          this.cadastro.rua = res.data.logradouro
          this.cadastro.bairro = res.data.bairro
        })
        .catch((error) => {
          if (error.response) {
            $q.notify({
              type: 'negative',
              message: error.response.data.message
            })
          }
        })
    },

    abrirEditar (row) {
      this.$refs.clienteNovo.abrirEditar(row)
    },

    abrirClienteDetalhe (row) {
      this.$refs.clienteDetalhe.abrir(row)
    },

    validarCpf (value) {
      const inputCPF = value.replace(/[^a-zA-Z0-9]/g, '')
      let soma = 0
      let resto
      let i

      if (inputCPF === '00000000000') return false
      for (i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(inputCPF.substring(9, 10))) return false

      soma = 0
      for (i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(inputCPF.substring(10, 11))) return false
      return true
    },

    validarCnpj (cnpj) {
      const value = cnpj.replace(/[^a-zA-Z0-9]/g, '')
      if (!value) return false

      // Aceita receber o valor como string, número ou array com todos os dígitos
      const isString = typeof value === 'string'
      const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

      // Elimina valor em formato inválido
      if (!validTypes) return false

      // Filtro inicial para entradas do tipo string
      if (isString) {
        // Limita ao máximo de 18 caracteres, para CNPJ formatado
        if (value.length > 18) return false

        // Teste Regex para veificar se é uma string apenas dígitos válida
        const digitsOnly = /^\d{14}$/.test(value)
        // Teste Regex para verificar se é uma string formatada válida
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

        // Se o formato é válido, usa um truque para seguir o fluxo da validação
        if (digitsOnly || validFormat) return true
        // Se não, retorna inválido
        else return false
      }

      // Guarda um array com todos os dígitos do valor
      const match = value.toString().match(/\d/g)
      const numbers = Array.isArray(match) ? match.map(Number) : []

      // Valida a quantidade de dígitos
      if (numbers.length !== 14) return false

      // Elimina inválidos com todos os dígitos iguais
      const items = [...new Set(numbers)]
      if (items.length === 1) return false

      // Cálculo validador
      const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0

        for (let i = x; i >= 1; i--) {
          const n = slice[x - i]
          sum += n * factor--
          if (factor < 2) factor = 9
        }

        const result = 11 - (sum % 11)

        return result > 9 ? 0 : result
      }

      // Separa os 2 últimos dígitos de verificadores
      const digits = numbers.slice(12)

      // Valida 1o. dígito verificador
      const digit0 = calc(12)
      if (digit0 !== digits[0]) return false

      // Valida 2o. dígito verificador
      const digit1 = calc(13)
      return digit1 === digits[1]
    }
  }
}
