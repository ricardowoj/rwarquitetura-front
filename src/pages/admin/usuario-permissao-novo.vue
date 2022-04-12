<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 600px; max-width: 60vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Nova Permissão</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-card>
        <div>
          <q-input class="q-ma-xs" v-model="cadastro.descricao" filled type="text" label="Permissão" />
          <q-card-actions class="q-mt-xs">
            <q-space />
            <q-btn label="Sair" @click="sair()"/>
            <q-btn label="Salvar" color="primary" @click="salvar()"/>
          </q-card-actions>
        </div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./usuario-permissao-novo.js"></script>
