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
              <q-select
                dense
                filled
                v-model="cliente"
                :options="clientes"
                label="Cliente"
              />
            </div>
            <div class="col-12 q-mb-md">
              <q-select
                dense
                filled
                v-model="tipoProjeto"
                :options="tiposDeProjeto"
                label="Tipo Projeto"
              />
            </div>
            <div class="col-12 q-mb-md">
              <q-select
                dense
                filled
                v-model="tipoCaracteristica"
                :options="tiposDeCaracteristica"
                label="Tipo Caracteristica"
              />
            </div>
            <div class="col-12">
              <q-input
                @change="buscarCep()"
                ref="cep"
                dense
                filled
                v-model="cadastro.cep"
                label="Cep"
                mask="#####-###"
                :rules="[
                  val => !!val || 'Cep é obrigatório',
                  val => (/^[0-9]{8}$/).test(val.replace(/[^a-zA-Z0-9]/g, '')) || 'Cep é inválido'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="cidade"
                dense
                filled
                v-model="cadastro.cidade"
                label="Cidade"
                :rules="[
                  val => !!val || 'Cidade é obrigatório'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="estado"
                dense
                filled
                v-model="cadastro.estado"
                label="Estado"
                :rules="[
                  val => !!val || 'Estado é obrigatório'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="rua"
                dense
                filled
                v-model="cadastro.rua"
                label="Rua"
                :rules="[
                  val => !!val || 'Rua é obrigatório'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="bairro"
                dense
                filled
                v-model="cadastro.bairro"
                label="Bairro"
                :rules="[
                  val => !!val || 'Bairro é obrigatório'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                ref="numero"
                dense
                filled
                v-model="cadastro.numero"
                label="Numero"
                :rules="[
                  val => !!val || 'Numero é obrigatório'
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="cadastro.complemento"
                label="Complemento"
              />
            </div>
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

<script src="./projeto-cadastro-novo.js"></script>
