<template>
  <div class="login">
    <b-container class="bv-example-row">
        <b-row>
          <b-form @submit="onSubmit">
           <b-form-group
             id="input-group-username"
             label="Username:"
             label-for="input-1"
           >
             <b-form-input
               id="input-username"
               v-model="form.username"
               type="text"
               placeholder="Enter username"
               required
             ></b-form-input>
           </b-form-group>
         
           <b-form-group id="input-group-password" label="Password:" label-for="input-2">
             <b-form-input
               id="input-2"
               v-model="form.password"
               type="password"
               placeholder="Enter password"
               required
             ></b-form-input>
           </b-form-group>
           <b-button type="submit" variant="primary">Login</b-button>
         </b-form>
        </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { loginPL } from '@/payloads/loginPL';
import { defineComponent } from 'vue';
import {useUserInfoStore} from "../store"

export default defineComponent({
  name: 'loginView',
  components: {

  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      } as loginPL
    }
  },
  methods: {
    async onSubmit() {
      let isLoginSuccessful = await this.$apiManager.authentication.login(this.form);
      if(isLoginSuccessful)
        this.$router.push("/controlpanel/main")
    }
  }
});
</script>
