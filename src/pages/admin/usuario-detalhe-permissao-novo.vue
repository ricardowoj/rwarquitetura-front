<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 750px; max-width: 75vw; height: 550px; max-height: 55vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Nova Permissão ao Usuário</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <div class="q-pa-md">
        <q-table
          dense
          :rows="rows"
          :columns="columns"
          :rows-per-page-options="[5]"
          row-key="id"
        >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat size="md" icon="add_circle" color="primary" @click="adicionar(props.row)"/>
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
</template>

<style scoped>
  .footer {
    border-radius: 0;
    bottom:0px;
    position:absolute;
    width:100%;
  }
</style>

<script src="./usuario-detalhe-permissao-novo.js"></script>
