<template>
    <div class="inputForm" @input="handleInput">
        <b-row>
            <b-col cols="1">
                <b-button v-if="$props.value.new" variant="danger" @click="deleteInput"><MinusCircle/></b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group
                    id="inputName-group"
                    label="Input name:"
                    label-for="inputName"
                    description=""
                >
                    <b-form-input
                      id="inputName"
                      v-model="$props.value.inputName"
                      type="text"
                      placeholder="Name"
                      required
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                    id="inputLength-group"
                    label="Input length:"
                    label-for="inputLength"
                    description="The maximum length of the input"
                >
                    <b-form-input
                      id="inputLength"
                      v-model="$props.value.inputLength"
                      @input="castToNum"
                      type="number"
                      placeholder="Length"
                      required
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>

                    <b-form-checkbox
                        id="notNullable"
                        v-model="$props.value.notNullable"
                        name="notNullable-check"
                        :value="true"
                        :unchecked-value="false"
                    >
                    The input can be empty
                    </b-form-checkbox>
                    <b-form-select v-model="$props.value.inputType" :options="options"></b-form-select>
            </b-col>
        </b-row>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { inputPL, InputType } from '@/payloads/customFormPL'
import MinusCircle from 'vue-material-design-icons/MinusCircle.vue'

export default defineComponent({
  name: 'InputForm',
  components: {
    MinusCircle
  },
  props: {
    value: {
      type: Object as PropType<inputPL>,
      required: true
    }
  },
  emits: ['input', 'onDelete'],
  data(){
    return {
      options: [
        {value: InputType.text, text: "Text"},
        {value: InputType.tel, text: "Telephone"},
        {value: InputType.email, text: "E-Mail"},
        {value: InputType.checkbox, text: "Checkbox"},
        {value: InputType.file, text: "File"},
        {value: InputType.image, text: "Image"},
        {value: InputType.password, text: "Password"},
        {value: InputType.date, text: "Date"},
        {value: InputType.time, text: "Time"},
        {value: InputType.color, text: "Color"},
      ]
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.inputValue)
    },
    castToNum(){
      debugger
      this.$props.value.inputLength = Number(this.$props.value.inputLength);
    },
    deleteInput () {
      this.$emit('onDelete')
      this.$forceUpdate();
      //this.$el.parentNode.removeChild(this.$el)
    }
  },
  setup (props) {
    //if (props.deleteEvent === undefined || props.value === undefined) { throw 'prop members are undefined' }
    return {
      props
    }
  }
})
</script>

<style>
.inputForm{
    background-color: #8080802b;
    padding: 15px;
    margin: 10px;
    border-radius: 20px;
}
</style>
