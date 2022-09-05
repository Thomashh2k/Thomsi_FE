<template>
  <b-row>
    <b-col>
      <b-button to="/controlpanel/language/create">Create</b-button>
    </b-col>
  </b-row>
  <b-row>
    <b-col></b-col>
    <b-col cols="10">
        <q-table title="Languages" no-data-label="I didn't find anything for you" :columns="columns" :rows="rows"></q-table>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'languagePanel',
  components: {

  },
  async beforeMount() {
    let data = await this.$apiManager.lang.getLanguage(1, 1, 10);
    this.rows = data;
  },
  data(){
    return {
        rows: [],
        columns: [      
            {
                name: 'guid',
                label: 'ID',
                field: 'id',
                align: 'left'
            },
            {
                name: 'langName',
                label: 'Language',
                align: 'left',
                field: 'languageName',
            },            
            {
                name: 'langIdent',
                label: 'LanguageIdentifier',
                align: 'left',
                field: 'languageIdentifier',
            },
            {
                name: 'actions',
                label: 'Actions',
                field: 'id',
                align: 'left'

            },
        ]
    }
  }
});
</script>