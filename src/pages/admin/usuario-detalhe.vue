<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 800px; max-width: 80vw; height: 600px; max-height: 60vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Usuário Detalhe</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-card>
        <div class="row gutter-x-xs q-mb-md q-ma-sm">
            <div class="col-md-4 q-pa-xs">
              <q-input outlined label="E-mail" v-model="cadastro.email" readonly/>
            </div>
            <div class="col-md-4 q-pa-xs">
              <q-input outlined label="Data hora Cadastro" v-model="cadastro.dhCadastro" readonly/>
            </div>
            <div class="col-md-4 q-pa-xs">
              <q-input outlined label="Data hora Último Acesso" v-model="cadastro.dhUltimoAcesso" readonly/>
            </div>
            <div outlined class="col-md-4 q-pa-xs">
              Status:
              <q-option-group
                disable
                dense
                inline
                type="radio"
                color="secondary"
                v-model="cadastro.tipoStatus"
                :options="[
                            { label: 'Ativo', value: 1 },
                            { label: 'Bloqueado', value: 0 }
                          ]"/>
            </div>
            <div outlined class="col-md-6 q-pa-xs">
              Tipo Usuário:
              <q-option-group
                disable
                dense
                inline
                type="radio"
                color="secondary"
                v-model="cadastro.tipoUsuario"
                :options="[
                            { label: 'Admin', value: 1 },
                            { label: 'Arquiteto', value: 2 },
                            { label: 'Cliente Secundário', value: 3 }
                          ]" />
            </div>
        </div>
      </q-card>

      <div class="q-pa-md">
        <q-table
          dense
          title="Permissões"
          color="accent"
          :rows="rows"
          :columns="columns"
          :rows-per-page-options="[5]"
          row-key="id"
        >
          <template v-slot:top-right>
            <div class="q-ma-xs">
              <q-btn
                dense
                color="primary"
                icon="person_add"
                label="Nova Permissão"
                no-caps
                @click="novaPermissao()"
              />
            </div>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat size="sm" icon="delete" color="primary" @click="remover(props.row)"/>
            </q-td>
          </template>
        </q-table>
      </div>

      <q-toolbar class="bg-primary text-white footer">
        <q-space />
        <q-btn label="Sair" color="dark" @click="sair()"/>
      </q-toolbar>
    </q-card>
  </q-dialog>
  <usuario-detalhe-permissao-novo ref="usuarioDetalhePermissaoNovo" @buscarUsuario="buscarUsuario()"/>
</template>

<style scoped>
  .footer {
    border-radius: 0;
    bottom:0px;
    position:absolute;
    width:100%;
  }
</style>

<script src="./usuario-detalhe.js"></script>
