<template>
  <b-row class="createroutepayload">
    <b-col>

      <b-form @submit="onSubmit" @reset="onReset">

        <b-form-group id="input-group-1" label="Language Name:" label-for="input-1" description="German French English Spanish Russian">
          <b-form-input id="input-1" v-model="payload.languageName" type="text" placeholder="" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Language Identifier:" label-for="input-2" description="de-AT de-DE en-GB en-US">
          <b-form-input id="input-1" v-model="payload.languageIdentifier" type="text" placeholder="" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { lang } from '@/dbTables';

export default defineComponent({
  name: 'LanguageForm',
  components: {

  },
  async created() {
    if(this.payload.id != undefined){
      let data = await this.$apiManager.lang.getSingleLanguageByID(this.payload.id);
      if(data != undefined){
        this.payload = data
      }
    }
  },
  data() {
    return {
      payload: {
        id: this.$route.params.id, // This id is only used when a lang is edited
        languageName: '',
        languageIdentifier: ''
      } as lang
    }
  },
  methods: {
    // eslint-disable-next-line 
    async onSubmit(event: any) {
      event.preventDefault()
      if(this.payload.id != undefined) {
        //Updates a lang
        let data = await this.$apiManager.lang.updateLanguage(this.payload);
        if(data != undefined)
          this.$router.go(-1);
      }
      else{
        // Creates a lang
        let data = await this.$apiManager.lang.postLanguage(this.payload);
        if(data != undefined)
         this.$router.go(-1);
      }

    },
    // eslint-disable-next-line 
    onReset(event: any) {
      event.preventDefault()
      // Reset our payload values
      this.payload.languageName = ''
      this.payload.languageIdentifier = ''
    }
  }
});
</script>
