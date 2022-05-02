import { useQuasar, date } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
let $q

const COLUMNS_BRIEFING = [
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: 'actions'
  },
  {
    name: 'nomeArquivo',
    align: 'left',
    label: 'Nome Arquivo',
    field: row => row.nomeArquivo,
    sortable: true
  },
  {
    name: 'dhTrabalhadaInicio',
    align: 'left',
    label: 'DH. Início',
    field: row => date.formatDate(row.dhTrabalhadaInicio, 'DD/MM/YYYY HH:mm')
  },
  {
    name: 'dhTrabalhadaFim',
    align: 'left',
    label: 'DH. Fim',
    field: row => date.formatDate(row.dhTrabalhadaFim, 'DD/MM/YYYY HH:mm')
  },
  {
    name: 'hrTrabalhada',
    align: 'left',
    label: 'HR. Trabalhada',
    field: row => row.hrTrabalhada
  }
]

export default {
  name: 'projeto-levantamento-controle',
  components: { api },
  setup () {
    return {
      tab: ref('briefing')
    }
  },
  data () {
    return {
      projetoNovo: true,
      clienteSecundario: '',
      arquivoBriefing: null,
      nomeBriefing: null,
      dataHoraInicioBriefing: null,
      dataHoraFimBriefing: null,
      columnsBriefing: COLUMNS_BRIEFING,
      rowsBriefing: []
    }
  },

  mounted () {
    $q = useQuasar()
  },

  methods: {
    abrirEditar (projeto) {
      this.projeto = projeto
      this.arquivoBriefing = null
      this.nomeBriefing = null
      this.dataHoraInicioBriefing = null
      this.dataHoraFimBriefing = null
      this.buscarBriefing()
      this.$refs.dialog.show()
    },

    sair () {
      this.$refs.dialog.hide()
    },

    add (arquivo) {
      this.arquivo = arquivo
    },

    salvarBriefing () {
      const formData = new FormData()
      console.log(this.$refs.arquivoBriefing)
      if (this.arquivoBriefing === undefined || this.arquivoBriefing === null) {
        $q.notify({ type: 'warning', message: 'Arquivo Briefing é obrigatório' })
        return
      }

      if (this.nomeArquivo === null) {
        $q.notify({ type: 'warning', message: 'Nome do Arquivo é obrigatório!' })
        return
      }

      if (this.dataHoraInicioBriefing === null) {
        $q.notify({ type: 'warning', message: 'Data Hora INICÍO Briefing é obrigatório!' })
        return
      }

      if (this.dataHoraInicioBriefing === null) {
        $q.notify({ type: 'warning', message: 'Data Hora FIM Briefing é obrigatório!' })
        return
      }

      if (this.dataHoraInicioBriefing >= this.dataHoraFimBriefing) {
        $q.notify({ type: 'warning', message: 'Data Hora início Briefing é menor que o fim!' })
        return
      }

      formData.append('arquivo', this.arquivoBriefing)
      formData.append('idProjeto', this.projeto.id)
      formData.append('nomeBriefing', this.nomeBriefing)
      formData.append('dataHoraInicioBriefing', this.dataHoraInicioBriefing)
      formData.append('dataHoraFimBriefing', this.dataHoraFimBriefing)
      api.post('/levantamentoBriefing/upload', formData)
        .then((res) => {
          this.arquivoBriefing = null
          this.nomeBriefing = null
          this.dataHoraInicioBriefing = null
          this.dataHoraFimBriefing = null
          this.buscarBriefing()
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

    buscarBriefing () {
      api.get('levantamentoBriefing/projeto/' + this.projeto.id)
        .then((res) => {
          this.rowsBriefing = res.data
        })
        .catch((error) => {
          if (error.response.data.error) {
            $q.notify({
              type: 'negative',
              message: error.response.data.error
            })
          }
        })
    }
  }
}
