<template>
  <b-row class="controlpanel">
    <b-col>
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-brand to="/controlpanel">ControlPanel</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/controlpanel/languages">Languages</b-nav-item>
            <b-nav-item to="/controlpanel/pages">Pages</b-nav-item>
            <b-nav-item to="/controlpanel/forms">Custom Forms</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <b-button variant="danger" @click="logout">Logout</b-button>
      </b-navbar>
    </b-col>
  </b-row>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useUserInfoStore} from "@/store"

export default defineComponent({
  name: 'controlPanel',
  components: {

  },
  setup(){
    const userInfoStore = useUserInfoStore();
    return { userInfoStore }
  },
  methods:{
    logout(){
      this.userInfoStore.setToken("");
      this.userInfoStore.setExpiration(null);
      this.userInfoStore.setUser(null);
      this.$router.push("/");
    }
  }
});
</script>
