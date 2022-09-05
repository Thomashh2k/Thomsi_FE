<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <div class="createpageform row">
      <div class="col-3">
        <div>
          <b-form-group>
            <b-form-input
              id="pageTitleInput"
              v-model="payload.title"
              type="text"
              placeholder="Title"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-select v-model="payload.langId" :options="languages"></b-form-select>
          </b-form-group>

          <b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form-group>
        </div>
      </div>
      <div class="col-6" ref="editorCol">

        <q-editor v-if="isMonacoEditor == false" v-model="payload.body" min-height="35rem" />

        <MonacoEditor
          v-if="isMonacoEditor"
          theme="vs-dark"
          language="html"
          :width="editorWidth"
          :height="windowHeigth"
          :diffEditor="false"
          v-model:value="payload.body"
        ></MonacoEditor>


      </div>
      <div class="col-3">
        <q-toggle
          v-model="isMonacoEditor"
        />
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postPagePL } from '@/payloads/postPagePL';
import MonacoEditor from 'monaco-editor-vue3'

export default defineComponent({
  name: 'createPageForm',
  components: {
    MonacoEditor
  },
  async beforeMount() {
    let data = await this.$apiManager.lang.getLanguage(1, 1, 5)
    for(var i = 0; i <= data.length; i++) {
      this.languages.push({text: data[i].languageIdentifier, value: data[i].id, disabled: false});
    }
  },
  mounted() {
    this.editorWidth = this.$refs.editorCol.clientHeight;
    this.editorHeigth = this.$refs.editorCol.clientWidth;
  },
  data() {
    return {
      editorWidth:972,
      editorHeigth: 800,
      windowHeigth: window.innerHeight - 150,
      isMonacoEditor: true,
      languages: [],
      payload: {
        title: '',
        body: '',
        langId: ''
      } as postPagePL
    }
  },
  methods: {
    async onSubmit(event: any) {
      event.preventDefault()
      await this.$apiManager.page.postPage(this.payload);

    },
    onReset(event: any) {
      event.preventDefault()
      // Reset our form values
      this.form.routeName = ''
      this.form.route = ''
    },
  }
});
</script>
