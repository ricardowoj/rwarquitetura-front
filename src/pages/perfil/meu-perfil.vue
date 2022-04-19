<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">US Region</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Mayank Patel</div>
              <div class="text-caption text-grey">
                Sales and Marketing Executive | Graduate and past committee | Keynote speaker on Selling and Recruiting
                Topics
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                color="primary"
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            Assessing clients needs and present suitable promoted products. Liaising with and persuading targeted doctors to prescribe our products utilizing effective sales skills.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-xs"
            >
              <div class="q-pl-sm q-mb-md">
                Tipo Documento:
                <q-option-group
                  dense
                  inline
                  type="radio"
                  color="secondary"
                  v-model="cadastro.tipoDocumento"
                  :options="[
                    { label: 'CPF', value: 1 },
                    { label: 'CNPJ', value: 2 }
                  ]" />
              </div>
              <q-input
                v-if="cadastro.tipoDocumento == 1"
                ref="numeroDoc"
                dense
                filled
                v-model="cadastro.numeroDoc"
                label="Documento"
                mask="###.###.###-##"
                :rules="[
                  val => !!val || 'Documento é obrigatório',
                  val => validarCpf(val) || 'Documento é inválido'
                ]"
              />
              <q-input
                v-if="cadastro.tipoDocumento == 2"
                ref="numeroDoc"
                dense
                filled
                v-model="cadastro.numeroDoc"
                label="Documento"
                :rules="[
                  val => !!val || 'Documento é obrigatório',
                  val => validarCnpj(val) || 'Documento é inválido'
                ]"
              />
              <q-input
                ref="nome"
                dense
                filled
                v-model="cadastro.nome"
                label="Nome Completo"
                :rules="[
                  val => !!val || 'Nome Completo é obrigatório'
                ]"
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
                v-model="cadastro.complemento"
                label="Complemento"
              />
              <div class="q-ma-sm q-mt-md on-right">
                <q-btn label="Editar" color="primary" @click="editarArquiteto()" v-if="cadastro.nome !== ''"/>
                <q-btn label="Salvar" color="primary" @click="salvarArquiteto()" v-if="cadastro.nome === ''"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script src="./meu-perfil.js"></script>
