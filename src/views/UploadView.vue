<template>
  <div class="upload-view">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mb-6">
          <v-card-title class="text-h5">
            Excel File Analysis
          </v-card-title>
          <v-card-text>
            <p class="mb-4">Upload an Excel spreadsheet to generate a detailed analysis with textual and graphical summaries.</p>
            
            <file-upload-component 
              v-if="!hasFile || !analysisResults" 
              @file-selected="onFileSelected"
            />
            
            <v-alert
              v-if="hasError"
              type="error"
              variant="tonal"
              closable
              class="mt-4"
              @click:close="clearError"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
        
        <v-overlay
          v-model="isAnalyzing"
          class="align-center justify-center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
          <div class="text-center mt-4">Analyzing your data...</div>
        </v-overlay>
        
        <analysis-results-component 
          v-if="analysisResults" 
          :results="analysisResults"
          @new-upload="clearFile"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FileUploadComponent from '../components/FileUploadComponent.vue'
import AnalysisResultsComponent from '../components/AnalysisResultsComponent.vue'

export default {
  name: 'UploadView',
  components: {
    FileUploadComponent,
    AnalysisResultsComponent
  },
  computed: {
    ...mapGetters([
      'hasFile',
      'getFileName',
      'getAnalysisResults',
      'isAnalyzing',
      'hasError',
      'getError'
    ]),
    analysisResults() {
      return this.getAnalysisResults
    },
    error() {
      return this.getError
    }
  },
  methods: {
    ...mapActions([
      'uploadFile',
      'analyzeFile',
      'clearFile'
    ]),
    async onFileSelected(file) {
      await this.uploadFile({ file })
      await this.analyzeFile()
    },
    clearError() {
      this.$store.commit('CLEAR_ERROR')
    }
  }
}
</script>

<style scoped>
.upload-view {
  padding: 20px 0;
}
</style>