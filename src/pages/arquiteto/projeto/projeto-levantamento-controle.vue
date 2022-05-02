<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="q-dialog-plugin" style="min-width:1000px;">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Levantamento</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <div class="q-pa-md">
        <div class="q-gutter-md row items-start">
          <div class="col-5 q-ml-xl q-mr-xl">
              <q-card>
                <q-card-section>
                  <div class="col">
                    <q-input ref="arquivoBriefing" dense  @update:model-value="val => { arquivoBriefing = val[0] }" type="file" aria-setsize="sm" />
                  </div>
                  <div class="col">
                    <q-input dense v-model="nomeBriefing" label="Nome Arquivo"/>
                  </div>
                  <div class="col">
                    <q-input dense v-model="dataHoraInicioBriefing" placeholder="Data Hora Início">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="dataHoraInicioBriefing" mask="DD/MM/YYYY HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="dataHoraInicioBriefing" mask="DD/MM/YYYY HH:mm" format24h>
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col">
                    <q-input dense v-model="dataHoraFimBriefing"  placeholder="Data Hora Fim">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="dataHoraFimBriefing" mask="DD/MM/YYYY HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="dataHoraFimBriefing" mask="DD/MM/YYYY HH:mm" format24h>
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 row q-mt-sm justify-center">
                      <q-btn dense  class="full-width" color="primary" label="Upload Briefing" @click="salvarBriefing"/>
                  </div>
                </q-card-section>
              </q-card>
          </div>
          <div class="col-5">
            <q-card>
              <q-card-section>
                <div class="col-4">
                  <q-input dense @update:model-value="val => { arquivoBriefing = val[0] }" filled type="file" aria-setsize="sm" />
                </div>
                <div class="col-4">
                  <q-input dense v-model="nomeBriefing" label="Nome Arquivo"/>
                </div>
                <div class="col-3 q-mt-sm">
                    <q-btn dense color="primary" label="Upload Medição"/>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="briefing" label="Briefing" />
          <q-tab name="medicao" label="Medição" />
        </q-tabs>
        <q-separator></q-separator>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="briefing">
            <q-table
              color="primary"
              card-class="bg-blue-grey-1 text-black"
              table-class="text-black"
              table-header-class="text-black"
              :rows="rowsBriefing"
              :columns="columnsBriefing"
              :rows-per-page-options="[10]"
              row-key="id"
              dense
              flat
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <!-- <q-btn flat size="sm" icon="delete" color="primary" @click="remover(props.row)"/> -->
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="medicao">
            <div class="text-h6">Alarms</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <q-card-actions>
        <q-space />
        <q-btn class="bg-primary text-white" label="Sair" @click="sair()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style lang="scss">
.super-small.q-field--dense {
    padding-top: 10px !important;
}
</style>

<script src="./projeto-levantamento-controle.js"></script>
