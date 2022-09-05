<template>
  <b-row class="createrouteform">
    <b-col>

      <b-form @submit="onSubmit" @reset="onReset">

        <b-form-group id="input-group-1" label="Language Name:" label-for="input-1" description="German French English Spanish Russian">
          <b-form-input id="input-1" v-model="form.languageName" type="text" placeholder="" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Language Identifier:" label-for="input-2" description="de-AT de-DE en-GB en-US">
          <b-form-input id="input-1" v-model="form.languageIdentifier" type="text" placeholder="" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postLanguagePL } from '@/payloads/postLanguagePL';

export default defineComponent({
  name: 'createRouteForm',
  components: {

  },
  created() {
    console.log(this)
  },
  data() {
    return {
      form: {
        languageName: '',
        languageIdentifier: ''
      } as postLanguagePL
    }
  },
  methods: {
    async onSubmit(event: any) {
      event.preventDefault()
      await this.$apiManager.lang.postLanguage(this.form);

    },
    onReset(event: any) {
      event.preventDefault()
      // Reset our form values
      this.form.languageName = ''
      this.form.languageIdentifier = ''
    }
  }
});
</script>
