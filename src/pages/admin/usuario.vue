<template>
  <div class="q-pa-md">
    <q-table
      title="Usuários"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[50]"
      row-key="id"
    >
      <template v-slot:top-right>
        <div class="q-ma-xs">
          <q-btn
            dense
            color="primary"
            icon="person_add"
            label="Novo Usuário"
            no-caps
            @click="abrirUsuarioNovo()"
          />
        </div>
        <div class="q-ma-xs">
          <q-btn
            dense
            color="primary"
            icon="verified_user"
            label="Permissões"
            no-caps
            @click="abrirPermissao()"
          />
        </div>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="visibility" color="primary" @click="abrirUsuarioDetalhe(props.row)" />
          <q-btn flat icon="edit" color="primary" @click="abrirUsuarioEditar(props.row)"/>
          <q-btn flat icon="delete" color="primary" @click="remover(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-tipoStatus="props">
        <q-td :props="props">
          <q-badge :color="props.row.tipoStatus == '1' ? 'positive' : 'negative'">
            {{ props.row.tipoStatus == '1' ? 'ATIVO' : 'BLOQUEADO'}}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-tipoUsuario="props">
        <q-td :props="props">
          <q-badge color="primary">
            {{ props.row.tipoUsuario == '1' ? 'ADMIN' :  props.row.tipoUsuario == '2' ? 'ARQUITETO' : 'CLIENTE' }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
  <usuario-novo ref="usuarioNovo" @buscarUsuarios="buscarUsuarios"/>
  <usuario-editar ref="usuarioEditar" @buscarUsuarios="buscarUsuarios"/>
  <usuario-detalhe ref="usuarioDetalhe" @buscarUsuarios="buscarUsuarios"/>
  <usuario-permissao ref="usuarioPermissao"/>
</template>

<script src="./usuario.js"></script>
