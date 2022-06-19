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

const COLUMNS_MEDICAO = [
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
      rowsBriefing: [],
      arquivoMedicao: null,
      nomeMedicao: null,
      columnsMedicao: COLUMNS_MEDICAO,
      rowsMedicao: [],
      dataHoraInicioMedicao: null,
      dataHoraFimMedicao: null
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
      this.buscarMedicao()
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
      if (this.arquivoBriefing === undefined || this.arquivoBriefing === null) {
        $q.notify({ type: 'warning', message: 'Arquivo Briefing é obrigatório' })
        return
      }

      if (this.nomeBriefing === null) {
        $q.notify({ type: 'warning', message: 'Nome do Arquivo é obrigatório!' })
        return
      }

      if (this.dataHoraInicioBriefing === null) {
        $q.notify({ type: 'warning', message: 'Data Hora INÍCIO Briefing é obrigatório!' })
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
          if (error.response.data && error.response.data.message.length > 0) {
            this.mensagemNotificao('warning', error.response.data.message)
          } else {
            this.mensagemNotificao('negative', error.response.data.error)
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
    },

    removerBriefing (row) {
      api.post('levantamentoBriefing/remover/' + row.id)
        .then((res) => {
          this.mensagemNotificao('positive', 'Briefing removido com sucesso: ' + row.nomeArquivo)
          this.buscarBriefing()
        })
        .catch((error) => {
          if (error.response.data.error) {
            this.mensagemNotificao('negative', error.response.data.error)
          }
        })
    },

    downloadBriefing (row) {
      api.get('levantamentoBriefing/download/' + row.id,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/pdf'
          }
        })
        .then((response) => {
          this.prepararDonwloadPdf(response)
        })
        .catch((error) => {
          if (error.response.data.error) {
            this.mensagemNotificao('negative', error.response.data.error)
          }
        })
    },

    salvarMedicao () {
      const formData = new FormData()
      if (this.arquivoMedicao === undefined || this.arquivoMedicao === null) {
        $q.notify({ type: 'warning', message: 'Arquivo Medição é obrigatório' })
        return
      }

      if (this.nomeMedicao === null) {
        $q.notify({ type: 'warning', message: 'Nome do Arquivo é obrigatório!' })
        return
      }

      if (this.dataHoraInicioMedicao === null) {
        $q.notify({ type: 'warning', message: 'Data Hora INÍCIO Medição é obrigatório!' })
        return
      }

      if (this.dataHoraFimMedicao === null) {
        $q.notify({ type: 'warning', message: 'Data Hora FIM Medição é obrigatório!' })
        return
      }

      if (this.dataHoraInicioMedicao >= this.dataHoraFimMedicao) {
        $q.notify({ type: 'warning', message: 'Data Hora início Medição é menor que o fim!' })
        return
      }

      formData.append('arquivo', this.arquivoMedicao)
      formData.append('idProjeto', this.projeto.id)
      formData.append('nomeMedicao', this.nomeMedicao)
      formData.append('dataHoraInicioMedicao', this.dataHoraInicioMedicao)
      formData.append('dataHoraFimMedicao', this.dataHoraFimMedicao)
      api.post('/levantamentoMedicao/upload', formData)
        .then((res) => {
          this.arquivoMedicao = null
          this.nomeMedicao = null
          this.dataHoraInicioMedicao = null
          this.dataHoraFimMedicao = null
          this.buscarMedicao()
        })
        .catch((error) => {
          if (error.response.data && error.response.data.message.length > 0) {
            this.mensagemNotificao('warning', error.response.data.message)
          } else {
            this.mensagemNotificao('negative', error.response.data.error)
          }
        })
    },

    buscarMedicao () {
      api.get('levantamentoMedicao/projeto/' + this.projeto.id)
        .then((res) => {
          this.rowsMedicao = res.data
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

    removerMedicao (row) {
      api.post('levantamentoMedicao/remover/' + row.id)
        .then((res) => {
          this.mensagemNotificao('positive', 'Medição removida com sucesso: ' + row.nomeArquivo)
          this.buscarMedicao()
        })
        .catch((error) => {
          if (error.response.data.error) {
            this.mensagemNotificao('negative', error.response.data.error)
          }
        })
    },

    downloadMedicao (row) {
      api.get('levantamentoMedicao/download/' + row.id,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/pdf'
          }
        })
        .then((response) => {
          this.prepararDonwloadPdf(response)
        })
        .catch((error) => {
          if (error.response.data.error) {
            this.mensagemNotificao('negative', error.response.data.error)
          }
        })
    },

    mensagemNotificao (type, message) {
      $q.notify({
        type: type,
        message: message
      })
    },

    prepararDonwloadPdf (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf')
      document.body.appendChild(link)
      link.click()
    }
  }
}
