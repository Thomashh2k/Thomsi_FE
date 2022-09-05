<template>
  <b-row class="controlpanel">
    <b-col>
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-brand to="/controlpanel">ControlPanel</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/controlpanel/language">Create Lang</b-nav-item>
            <b-nav-item to="/controlpanel/pages">Create Page</b-nav-item>
            <b-nav-item to="/controlpanel/routes">Create Form</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-col>
  </b-row>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'controlPanel',
  components: {

  },
});
</script>
