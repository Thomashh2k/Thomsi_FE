<template>
    <b-row>
        <b-col>
            <b-button to="/controlpanel/custom-forms/create">Create</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col cols="10">
            <q-table title="Custom Forms" no-data-label="I didn't find anything for you" :columns="columns" :rows="customForms">
            <template v-slot:body-cell-actions="props">
                <q-td>
                    <b-button class="leftActionBtn" variant="primary" :to="'/controlpanel/custom-forms/view/' + props.value"><DatabaseEyeOutline fillColor="white"/></b-button>
                    <b-button class="leftActionBtn" variant="warning" :to="'/controlpanel/custom-forms/edit/' + props.value"><LeadPencil fillColor="white"/></b-button>
                    <b-button variant="danger" ><DeleteIcon fillColor="white"/></b-button>
                </q-td>
            </template>
            </q-table>
        </b-col>
        <b-col></b-col>
    </b-row>
</template>
<script lang="ts">
import { customForm } from '@/dbTables'
import { defineComponent } from 'vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import LeadPencil from 'vue-material-design-icons/LeadPencil.vue'
import DatabaseEyeOutline from 'vue-material-design-icons/DatabaseEyeOutline.vue'

export default defineComponent({
  name: 'customFormPanel',
  components: {
    DeleteIcon,
    LeadPencil,
    DatabaseEyeOutline
  },
  data(){
    return {
        customForms: [] as customForm[],
        columns: [
            {
                name: 'guid',
                label: 'ID',
                field: 'id',
                align: 'left'
            },
            {
                name: 'name',
                label: 'Form Name',
                field: 'formName',
                align: 'left'
            },
            {
                name: 'actions',
                label: 'Actions',
                field: 'id',
                align: 'right'
            },
        ]
    }
  },
  async beforeCreate() {
        const resp = await this.$apiManager.customform.getCustomForms();
        this.customForms = resp;
  },
})
</script>
