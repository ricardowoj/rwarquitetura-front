import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
let $q

const CADASTRO = {
  idArquiteto: '',
  usuario: {
    email: ''
  },
  nome: '',
  tipoDocumento: 1,
  numeroDoc: '',
  cidade: '',
  estado: '',
  rua: '',
  numero: '',
  bairro: '',
  cep: '',
  complemento: '',
  telefone: ''
}

export default {
  name: 'clienteNovo',

  setup () {
    const nome = ref(null)
    const numeroDoc = ref(null)
    const cidade = ref(null)
    const estado = ref(null)
    const rua = ref(null)
    const numero = ref(null)
    const bairro = ref(null)
    const cep = ref(null)
    const inputEmail = ref(null)
    const telefone = ref(null)

    return {
      model: ref(''),
      nome,
      numeroDoc,
      cidade,
      estado,
      rua,
      numero,
      bairro,
      cep,
      inputEmail,
      telefone,

      reset () {
        nome.value.resetValidation()
        numeroDoc.value.resetValidation()
        cidade.value.resetValidation()
        estado.value.resetValidation()
        rua.value.resetValidation()
        numero.value.resetValidation()
        bairro.value.resetValidation()
        cep.value.resetValidation()
        inputEmail.value.resetValidation()
        telefone.value.resetValidation()
      }
    }
  },

  data () {
    return {
      cadastro: CADASTRO,
      clienteNovo: true,
      arquiteto: ''
    }
  },

  mounted () {
    $q = useQuasar()
  },

  methods: {
    abrirNovo (arquiteto) {
      this.clienteNovo = true
      this.cadastro.idArquiteto = arquiteto.id
      this.cadastro.nome = ''
      this.cadastro.numeroDoc = ''
      this.cadastro.cidade = ''
      this.cadastro.estado = ''
      this.cadastro.rua = ''
      this.cadastro.numero = ''
      this.cadastro.bairro = ''
      this.cadastro.cep = ''
      this.cadastro.complemento = ''
      this.cadastro.usuario.id = undefined
      this.cadastro.usuario.email = ''
      this.cadastro.telefone = ''
      this.$refs.dialog.show()
    },

    abrirEditar (cliente) {
      this.clienteNovo = false
      this.cadastro.id = cliente.id
      this.buscarCliente(cliente.id)
      this.$refs.dialog.show()
    },

    sair () {
      this.$refs.dialog.hide()
    },

    salvar () {
      this.$refs.nome.validate()
      this.$refs.numeroDoc.validate()
      this.$refs.cidade.validate()
      this.$refs.estado.validate()
      this.$refs.rua.validate()
      this.$refs.numero.validate()
      this.$refs.bairro.validate()
      this.$refs.cep.validate()
      this.$refs.inputEmail.validate()
      this.$refs.telefone.validate()
      if (this.$refs.nome.hasError || this.$refs.numeroDoc.hasError ||
        this.$refs.cidade.hasError || this.$refs.estado.hasError ||
        this.$refs.rua.hasError || this.$refs.numero.hasError ||
        this.$refs.bairro.hasError || this.$refs.cep.hasError ||
        this.$refs.inputEmail.hasError || this.$refs.telefone.hasError) {
        $q.notify({
          type: 'warning',
          message: 'Formulário preenchido incorretamente'
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
        if (this.clienteNovo === true) {
          api.post('/cliente', this.cadastro)
            .then(() => {
              $q.notify({
                type: 'positive',
                message: 'Cliente Cadastrado com sucesso'
              })
              this.sair()
              this.$emit('buscarClientes')
            })
            .catch((error) => {
              if (error.response) {
                $q.notify({
                  type: 'negative',
                  message: error.response.data.message
                })
              }
            })
        }

        if (this.clienteNovo === false) {
          api.put('/cliente', this.cadastro)
            .then(() => {
              $q.notify({
                type: 'positive',
                message: 'Cliente Cadastrado com sucesso'
              })
              this.sair()
              this.$emit('buscarClientes')
            })
            .catch((error) => {
              if (error.response) {
                $q.notify({
                  type: 'negative',
                  message: error.response.data.message
                })
              }
            })
        }
      })
    },

    buscarCliente (id) {
      api.get('/cliente/' + id)
        .then((res) => {
          this.cadastro.tipoDocumento = res.data.tipoDocumento
          this.cadastro.numeroDoc = res.data.numeroDoc
          this.cadastro.nome = res.data.nome
          this.cadastro.cep = res.data.cep
          this.cadastro.cidade = res.data.cidade
          this.cadastro.estado = res.data.estado
          this.cadastro.rua = res.data.rua
          this.cadastro.bairro = res.data.bairro
          this.cadastro.numero = res.data.numero
          this.cadastro.complemento = res.data.complemento
          this.cadastro.telefone = res.data.telefone
          this.cadastro.usuario.id = res.data.usuario.id
          this.cadastro.usuario.email = res.data.usuario.email
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
    },

    validarEmail (emaiInput) {
      const regex = /\S+@\S+\.\S+/
      return regex.test(emaiInput)
    }
  }
}
