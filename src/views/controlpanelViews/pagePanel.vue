<template>
  <b-row>
    <b-col>
      <b-button to="/controlpanel/pages/create">Create</b-button>
    </b-col>
  </b-row>
  <b-row>
    <b-col></b-col>
    <b-col cols="10">
        <q-table title="Pages" :rows="rows" no-data-label="I didn't find anything for you" :columns='columns'>
        <template v-slot:body-cell-lang="props">
          <q-td :props="props">
          {{( props.row.lang.languageIdentifier as page)}}
          </q-td>
        </template>
        </q-table>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { page } from '@/dbTables';

export default defineComponent({
  name: 'pagePanel',
  components: {

  },
  async beforeMount() {
    let data = await this.$apiManager.page.getPagesWithoutBody(1, 1, 10);
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
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left'
        },
        {
          name: 'lang',
          label: 'Language',
          field: 'languageIdentifier',
          align: 'left'
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