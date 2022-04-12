<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 800px; max-width: 80vw; height: 600px; max-height: 60vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Permissões</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <div class="q-pa-md">
        <q-table
          dense
          :rows="rows"
          :columns="columns"
          :rows-per-page-options="[10]"
          row-key="id"
        >
        <template v-slot:top-right>
          <div class="q-ma-xs">
            <q-btn
              dense
              color="primary"
              icon="shield"
              label="Nova permissão"
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
  <usuario-permissao-novo ref="usuarioPermissaoNovo" @buscarPermissao="buscarPermissao"/>
</template>

<style scoped>
  .footer {
    border-radius: 0;
    bottom:0px;
    position:absolute;
    width:100%;
  }
</style>

<script src="./usuario-permissao.js"></script>
