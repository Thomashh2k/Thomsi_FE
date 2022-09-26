<template>
    <b-row>
        <b-col>
            <b-button to="/controlpanel/custom-forms/create">Create</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col cols="10">
            <q-table title="Custom Forms" no-data-label="I didn't find anything for you" :columns="columns" :rows="rows">
            <template v-slot:body-cell-actions="props">
                <q-td>
                    <b-button class="leftActionBtn" variant="warning" :to="'/controlpanel/languages/edit/' + props.value"><LeadPencil fillColor="white"/></b-button>
                    <b-button variant="danger" v-on:click="setDeletionID(props.value)"><DeleteIcon fillColor="white"/></b-button>
                </q-td>
            </template>
            </q-table>
        </b-col>
        <b-col></b-col>
    </b-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import LeadPencil from 'vue-material-design-icons/LeadPencil.vue';

export default defineComponent({
  name: 'customFormPanel',
  components: {
    DeleteIcon,
    LeadPencil
  },
})
</script>