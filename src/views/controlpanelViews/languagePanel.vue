<template>
  <b-row>
    <b-col>
      <b-button to="/controlpanel/language/create">Create</b-button>
    </b-col>
  </b-row>
  <b-row>
    <b-col></b-col>
    <b-col cols="10">
        <q-table title="Languages" no-data-label="I didn't find anything for you" :columns="columns" :rows="rows">
          <template v-slot:body-cell-actions="props">
            <q-td>
              <b-button class="leftActionBtn" variant="warning" :to="'/controlpanel/language/edit/' + props.value"><DeleteIcon fillColor="white"/></b-button>
              <b-button variant="danger" v-on:click="setDeletionID(props.value)"><LeadPencil/></b-button>
            </q-td>
          </template>
        </q-table>
    </b-col>
    <b-col></b-col>
    <b-modal
      v-model="deleteForm.showDeletionModal"
      id="lang-deletion-modal"
      title="Deletion"
      header-bg-variant="danger" 
      lazy
      header-text-variant="light"
      hide-footer
    >
     
     
     
      <p class="modalSubTitle">Are you sure to delete the language?</p>
      <!-- The Label needs a helper function for the deletion text. To make it more simple.-->
      <p>Type in: <b>{{rows.find(el => el.id == deleteForm.id).languageName + '/' + rows.find(el => el.id == deleteForm.id).languageIdentifier }}</b> to delete the language.</p>
      <b-form>
        <b-form-group
          id="input-group-forDeletion"
          label-for="input-delete"
          description="This action cannot be undone"
        >
          <b-form-input
            id="input-delete"
            v-model="deleteForm.deleteText"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- Somehow <template #modal-footer> didnt work.-->
      <div class="custom-modal-footer">
        <b-button variant="danger" @click="deleteLangClickEvent">Delete</b-button>
      </div>
    </b-modal>
  </b-row>
</template>

<script lang="ts">
import { lang } from '@/dbTables';
import { defineComponent } from 'vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import LeadPencil from 'vue-material-design-icons/LeadPencil.vue';

export default defineComponent({
  name: 'languagePanel',
  components: {
    DeleteIcon,
    LeadPencil
  },
  async beforeCreate() {
    let data = await this.$apiManager.lang.getLanguage(1, 1, 10);
    this.rows = data;
  },
  methods:{
    setDeletionID(id: string){
      this.deleteForm.id = id;
      this.deleteForm.showDeletionModal = !this.deleteForm.showDeletionModal;
    },
    async deleteLangClickEvent(){
      var lang = this.rows.find(el => el.id == this.deleteForm.id) as lang;

      if(this.deleteForm.deleteText == lang.languageName + '/' + lang.languageIdentifier){
        let isSuccessfully = await this.$apiManager.lang.deleteLanguageById(this.deleteForm.id);
        if(isSuccessfully){
          this.$router.go();
        }
      }
      else{
        this.deleteForm.deleteText = "Wrong Input!!!"
      }
    }
  },
  data(){
    return {
        rows: [],
        deleteForm:{
          showDeletionModal: false,
          id: "",
          deleteText: ""
        },
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
<style>
.leftActionBtn{
  margin-right:15px;
}
.modalSubTitle{
  margin-top: 1.5rem !important;
  margin-bottom: 0rem !important;
}
</style>