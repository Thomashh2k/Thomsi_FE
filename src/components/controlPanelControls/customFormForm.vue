<template>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-row style="margin-left: 10px;">
        <b-col cols="4">
          <b-form-group
            id="form-name-group"
            label="Form name:"
            label-for="input-form-name"
            description="The name will be used to create a table in the database. It needs to be unique."
            >
            <b-form-input
              id="input-form-name"
              v-model="form.formName"
              type="text"
              placeholder="My custom form"
              required
            ></b-form-input>
          </b-form-group>
          <b-button @click="onSubmit" variant="success"></b-button>
        </b-col>
        <b-col cols="8">
          <div class="input-area">
            <b-button id="add-input-btn" @click="createInput"><PlusCircleOutline/></b-button>
              <InputForm v-for="(input, index) in form.inputs" v-bind:key="index" :value="form.inputs[index]" @on-delete="deleteNewInput(input)">
              </InputForm>
          </div>
        </b-col>
      </b-row>
    </b-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { customFormPL, inputPL, InputType } from '@/payloads/customFormPL'
import { customForm } from '@/dbTables'
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'

import InputForm from './InputForm.vue'

export default defineComponent({
  name: 'CustomFormForm',
  components: {
    PlusCircleOutline,
    InputForm
  },
  data () {
    return {
      form: {
        formName: '',
        inputs: []
      } as customFormPL | customForm
    }
  },

  methods: {
    beforeCreate () {
      //this.createInput()
    },
    createInput () {
      const newInput: inputPL = {
        inputName: '',
        inputLength: null,
        notNullable: false,
        inputType: InputType.text,
        new: true,
        delete: false
      };

      let index = this.form.inputs.push(newInput);
      console.log(index)
    },
    // deletes only a new input
    deleteNewInput (input: inputPL) {
      //debugger
      let indexOf = this.form.inputs.indexOf(input);
      let deleted = this.form.inputs.splice(indexOf, 1);
      this.form.inputs = this.form.inputs.sort();
      console.log(deleted)
      this.$forceUpdate();

    },
    onSubmit () {
      debugger
      this.$apiManager.customform.postCustomForm(this.form)
    },
    onReset () {
      return
    }
  }
})
</script>
<style>
.input-area{
  background-color: #c6c6c680;
  min-height: 100%;
  border: 1px #cacaca61 solid;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0px 10px 0px 5px;
}

#add-input-btn{
  margin-top: 8px;
}
</style>
