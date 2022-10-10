<template>
    <b-row>
        <b-col>
            
        </b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col cols="10">
            <q-table :title="customForm.formName" no-data-label="I didn't find anything for you" :columns="columns" :rows="rows">
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
import { customForm } from '@/dbTables';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CustomFormView',
    data(){
        return {
            customForm: {} as customForm,
            rows: [],
            columns: []
        }
    },
    async beforeCreate() {
        this.customForm = await this.$apiManager.customform.getCustomForm(this.$route.params.id)
        this.rows = await this.$apiManager.customform.getCustomFormData(this.$route.params.id)
        debugger
        Object.entries(this.rows[0]).forEach(prop => {

            this.columns.push({
                name: prop[0].toLowerCase(),
                label: prop[0],
                field: prop[0],
                align: 'left'
            })
        })          

    },
});
</script>