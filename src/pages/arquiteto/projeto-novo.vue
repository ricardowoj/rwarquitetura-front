<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 800px; max-width: 1000vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Novo Projeto</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-card>
        <div class="q-ma-sm">
          <q-select
            class="q-mb-sm"
            dense
            filled
            v-model="cliente"
            :options="clientes"
            label="Cliente"
          />
          <q-select
            class="q-mb-sm"
            dense
            filled
            v-model="tipoProjeto"
            :options="tiposDeProjeto"
            label="Tipo Projeto"
          />
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
          <q-input
            filled
            dense
            v-model="cadastro.complemento"
            label="Complemento"
          />
          <q-input
            filled
            dense
            v-if="projetoNovo == false"
            color="grey-3"
            label="Alterar Senha de acesso"
            type="password"
            v-model="cadastro.password"
          />
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

<script src="./projeto-novo.js"></script>
