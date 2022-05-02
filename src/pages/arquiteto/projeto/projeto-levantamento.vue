<template>
  <div class="q-pa-md">
    <q-table
      title="Levantamento"
      color="primary"
      card-class="bg-blue-grey-1 text-black"
      table-class="text-black"
      table-header-class="text-black"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[50]"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat size="md" icon="visibility" color="dark" @click="abrirEditar(props.row)">
            <q-tooltip class="bg-accent">Visualizar</q-tooltip>
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
  <projeto-levantamento-controle ref="projetoLevantamentoControle" @buscarProjetos="buscarProjetos"/>
</template>

<script src="./projeto-levantamento.js"></script>
