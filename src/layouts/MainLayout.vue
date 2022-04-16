<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
        <q-toolbar-title>Sistema RWArquitetura</q-toolbar-title>
        <div>
          <q-btn
            color="primary"
            icon="logout"
            @click="logout()"
            to="/login"
          >
          Sair
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar size="xl" color="secondary">
              <img src="../assets/engenheiro.png" />
            </q-avatar>
            <q-toolbar-title style="font-size: 12px">{{getMe.email.toUpperCase()}}</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                v-if="getMe.tipoUsuario == 2"
                active-class="tab-active"
                to="/meu-perfil"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                  Meu Perfil
                </q-item-section>
              </q-item>
              <q-item
                v-if="getMe.tipoUsuario == 1"
                active-class="tab-active"
                to="/usuario"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section>
                  Usuário
                </q-item-section>
              </q-item>
              <q-item
                v-if="getMe.tipoUsuario == 2"
                active-class="tab-active"
                to="/cliente"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section>
                  Cliente
                </q-item-section>
              </q-item>
              <q-item
                v-if="getMe.tipoUsuario == 2"
                active-class="tab-active"
                to="/projeto"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section>
                  Projeto
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      left: false
    }
  },

  computed: {
    ...mapGetters('auth', ['getMe'])
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/signOut')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.q-drawer {
  background-image: url("../assets/login-image-left.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: #92A9BD;
}

.drawer_dark {
  background-color: #92A9BD;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: #8D8DAA ;
}

body {
  background: #92A9BD !important;
}

.header_normal {
  background: linear-gradient(145deg,  #92A9BD 15%,#8D8DAA 70%);
}

.header_dark {
  background: linear-gradient(145deg,  #92A9BD 15%,#8D8DAA 70%);
}
</style>
