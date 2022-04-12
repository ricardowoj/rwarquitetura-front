<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="width: 600px; max-width: 60vw;">
      <q-toolbar class="bg-primary text-white q-mb-sm">
        <q-toolbar-title>Novo Usuário</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-card>
        <div class="q-ma-sm">
          <q-input
            ref="inputEmail"
            label="E-mail"
            type="email"
            v-model="cadastro.email"
            autocomplete="new-email"
            :rules="[
              val => !!val || 'Campo obrigatório',
              val => validarEmail(val) == true || 'E-mail não é válido'
            ]"
          />
          <q-input
            ref="inputSenha"
            label="Senha"
            type="password"
            v-model="cadastro.senha"
            autocomplete="new-password"
            :rules="[
              val => !!val || 'Campo obrigatório',
              val => val.length >= 6 || 'Mínimo de 6 caracters',
              val => val.length <= 9 || 'Máximo de 9 caracters'
            ]"
          />
          <div class="q-pa-sm">
            Status:
            <q-option-group
              dense
              inline
              type="radio"
              color="secondary"
              v-model="cadastro.tipoStatus"
              :options="[
                          { label: 'Ativo', value: 1 },
                          { label: 'Bloqueado', value: 0 }
                        ]" />
          </div>
          <div class="q-pa-sm">
            Tipo Usuário:
            <q-option-group
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

<script src="./usuario-novo.js"></script>
