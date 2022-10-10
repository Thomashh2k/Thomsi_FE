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
            {{ props.row.lang.languageIdentifier}}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td>
            <b-button class="leftActionBtn" variant="warning" :to="'/controlpanel/pages/edit/' + props.value"><LeadPencil fillColor="white"/></b-button>
            <b-button variant="danger" @click="setDeletionID(props.value)"><DeleteIcon fillColor="white"/></b-button>
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
      <p>Type in: <b>{{rows.find(el => el.id == deleteForm.id).lang.languageIdentifier + rows.find(el => el.id == deleteForm.id).route }}</b> to delete the language.</p>
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
        <b-button variant="danger" @click="deletePageClickEvent">Delete</b-button>
      </div>
    </b-modal>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { page } from '@/dbTables'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import LeadPencil from 'vue-material-design-icons/LeadPencil.vue'

export default defineComponent({
  name: 'PagePanel',
  components: {
    DeleteIcon,
    LeadPencil
  },
  async beforeMount () {
    const data = await this.$apiManager.page.getPagesWithoutBody(1, 1, 10)
    this.rows = data
  },
  methods: {
    setDeletionID (id: string) {
      debugger
      this.deleteForm.id = id
      this.deleteForm.showDeletionModal = !this.deleteForm.showDeletionModal
    },
    async deletePageClickEvent () {
      const page = this.rows.find(el => el.id == this.deleteForm.id) as page
      if (this.deleteForm.deleteText == page.lang.languageIdentifier + page.route) {
        const isSuccessfully = await this.$apiManager.page.deletePageById(this.deleteForm.id)
        if (isSuccessfully) {
          this.$router.go()
        }
      } else {
        this.deleteForm.deleteText = 'Wrong Input!!!'
      }
    }
  },
  data () {
    return {
      rows: [] as page[],
      deleteForm: {
        showDeletionModal: false,
        id: '',
        deleteText: ''
      },
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
          name: 'route',
          label: 'Route',
          field: 'route',
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
        }
      ]

    }
  }
})
</script>
<style>
.leftActionBtn{
  margin-right:15px;
}
</style>
