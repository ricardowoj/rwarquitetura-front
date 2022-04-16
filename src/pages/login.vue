<template>
  <div :style="backgroundColor">
    <div>
      <img src="~assets/login-image-left.jpg" class="wave-left" alt="login-wave">
    </div>
    <div class="row" style="height: 100vh" >
      <div class="col-12 col-md-6 flex justify-center content-center" style="width: 100%" >
        <q-card :style="$q.screen.lt.sm ? {'min-width': '70%'} : {'min-width': '25%'}" style="height: 45%">
          <q-card-section>
            <q-avatar size="80px" class="absolute-center shadow-1" color="secondary">
              <img src="~assets/engenheiro.png" alt="wave">
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-mt-xl">
            <q-form class="q-gutter-md">
              <q-input
                ref="inputEmail"
                label="E-mail"
                type="email"
                v-model="login.username"
                :rules="[
                  val => !!val || 'Campo obrigatório',
                  val => validarEmail(val) == true || 'E-mail não é válido'
                ]"
              />
              <q-input
                ref="inputSenha"
                label="Senha"
                type="password"
                v-model="login.password"
                :rules="[
                  val => !!val || 'Campo obrigatório',
                  val => val.length >= 6 || 'Mínimo de 6 caracters',
                  val => val.length <= 9 || 'Máximo de 9 caracters'
                ]"
              />
              <div class="q-mt-xl">
                <q-btn class="full-width" text-color="black" color="secondary" label="login" rounded @click="formLogin()"></q-btn>
                <div class="text-center q-mt-xs q-gutter-lg">
                  <!-- <q-btn class="text-white" size="sm" @click="esqueciSenha()">Esqueceu a senha?</q-btn>
                  <q-btn class="text-white" size="sm" @click="criarConta()">Criar conta</q-btn> -->
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div>
      <img src="~assets/login-image-right.jpg" class="wave-right" alt="login-wave">
    </div>
  </div>
  <div>
    <div :class="$q.screen.lt.md ? 'copyright-mobile' : 'copyright-desktop'">
      RwSoluções @ 2022
    </div>
    <div :class="$q.screen.lt.md ? 'contato-mobile' : 'contato-desktop'">
      Contato: rwdevsolucoes@gmail.com
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style scoped>
  .wave-left {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
  }
  .wave-right {
    position: fixed;
    height: 100%;
    right: 0;
    bottom: 0;
  }
  .copyright-desktop {
    position: fixed;
    height: 10%;
    left: 47%;
    bottom: 0;
  }
  .contato-desktop {
    position: fixed;
    height: 8%;
    left: 45%;
    bottom: 0;
    font-size: 12px;
  }
  .copyright-mobile {
    position: fixed;
    height: 10%;
    left: 30px;
    bottom: 0;
  }
  .contato-mobile {
    position: fixed;
    height: 8%;
    left: 30px;
    bottom: 0;
    font-size: 12px;
  }
</style>
