<template>
  <div class="q-pa-md">
    <q-table
      title="Projetos"
      color="primary"
      card-class="bg-blue-grey-1 text-black"
      table-class="text-black"
      table-header-class="text-black"
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
            label="Novo Projeto"
            no-caps
            @click="abrirNovo()"
          />
        </div>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat size="md" icon="edit" color="dark" @click="abrirEditar(props.row)">
            <q-tooltip class="bg-accent">Editar</q-tooltip>
          </q-btn>
          <q-btn flat size="md" icon="account_box" color="dark" @click="abrirClienteDetalhe(props.row)">
            <q-tooltip class="bg-accent">Detalhar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-tipoStatus="props">
        <q-td :props="props">
          <q-badge :color="props.row.tipoStatus == '1' ? 'positive' : 'negative'">
            {{ props.row.tipoStatus == '1' ? 'ATIVO' : 'BLOQUEADO'}}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
  <projeto-novo ref="projetoNovo" @buscarProjetos="buscarProjetos"/>
  <cliente-detalhe ref="clienteDetalhe"/>
</template>

<script src="./projeto.js"></script>
