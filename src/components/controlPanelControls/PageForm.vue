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
          <b-form-input
            id="pageRouteInput"
            v-model="payload.route"
            type="text"
            placeholder="/page"
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
import { defineComponent } from 'vue'
import { postPagePL } from '@/payloads/postPagePL'
import MonacoEditor from 'monaco-editor-vue3'

export default defineComponent({
  name: 'CreatePageForm',
  components: {
    MonacoEditor
  },
  async created () {
    debugger
    const data = await this.$apiManager.lang.getLanguage(1, 1, 5)
    for (let i = 0; i < data.length; i++) {
      this.languages.push({ text: data[i].languageIdentifier, value: data[i].id, disabled: false })
    }

    if (this.payload.id !== undefined) {
      const data = await this.$apiManager.page.getSinglePageByID(this.payload.id)
      if (data !== undefined) {
        this.payload = data
      }
    }
  },
  mounted () {
    this.editorWidth = this.$refs.editorCol.clientHeight
    this.editorHeigth = this.$refs.editorCol.clientWidth
  },
  data () {
    return {
      editorWidth: 972,
      editorHeigth: 800,
      windowHeigth: window.innerHeight - 150,
      isMonacoEditor: true,
      languages: [],
      payload: {
        id: this.$route.params.id, // This id is only used when a page is edited
        title: '',
        route: '',
        body: '',
        langId: ''
      } as postPagePL
    }
  },
  methods: {
    async onSubmit (event: any) {
      event.preventDefault()
      debugger
      if (this.payload.id !== undefined) {
        // Updates a lang
        const data = await this.$apiManager.page.updatePage(this.payload)
        if (data !== undefined) { this.$router.go(-1) }
      } else {
        // Creates a lang
        const data = await this.$apiManager.page.postPage(this.payload)
        if (data !== undefined) { this.$router.go(-1) }
      }
    },
    onReset (event: any) {
      event.preventDefault()
      // Reset our form values
      this.form.routeName = ''
      this.form.route = ''
    }
  }
})
</script>
