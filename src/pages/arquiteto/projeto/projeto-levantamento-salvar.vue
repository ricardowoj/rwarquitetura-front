<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin"  style="min-width: 800px; min-width: 600px;">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Novo Projeto</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-card>
        <div class="q-ma-md">
          <div class="row">
            <div class="col-12 q-mb-md">
            </div>
        </div>
        <q-card-actions class="q-mt-xs">
          <q-space />
          <q-btn label="Sair" @click="sair()"/>
          <q-btn label="Salvar" color="primary" @click="salvar()"/>
        </q-card-actions>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./projeto-levantamento-salvar.js"></script>
