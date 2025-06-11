<template>
  <div class="file-upload-component">
    <v-sheet
      class="upload-area pa-6 d-flex flex-column align-center justify-center"
      :class="{ 'dragover': isDragOver }"
      rounded
      border
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="triggerFileInput"
      height="250"
    >
      <v-icon
        icon="mdi-file-upload-outline"
        size="64"
        color="primary"
        class="mb-4"
      ></v-icon>
      <div class="text-h6 mb-2">Drag and drop your Excel file here</div>
      <div class="text-body-2 text-medium-emphasis mb-4">or click to browse files</div>
      <v-btn
        color="primary"
        variant="outlined"
        @click.stop="triggerFileInput"
      >
        Select File
      </v-btn>
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xls"
        class="d-none"
        @change="onFileChange"
      >
    </v-sheet>
    
    <div v-if="selectedFile" class="selected-file mt-4">
      <v-alert
        color="info"
        variant="tonal"
        icon="mdi-file-excel"
      >
        <div class="d-flex align-center justify-space-between">
          <div>
            <strong>Selected file:</strong> {{ selectedFile.name }}
            <div class="text-caption">{{ formatFileSize(selectedFile.size) }}</div>
          </div>
          <div>
            <v-btn
              color="primary"
              @click="analyzeFile"
              :loading="isAnalyzing"
            >
              Analyze
            </v-btn>
            <v-btn
              variant="text"
              class="ml-2"
              @click="clearSelectedFile"
              :disabled="isAnalyzing"
            >
              Clear
            </v-btn>
          </div>
        </div>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FileUploadComponent',
  data() {
    return {
      isDragOver: false,
      selectedFile: null
    }
  },
  computed: {
    ...mapGetters([
      'isAnalyzing'
    ])
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    onDragOver(event) {
      this.isDragOver = true
    },
    onDragLeave(event) {
      this.isDragOver = false
    },
    onDrop(event) {
      this.isDragOver = false
      const files = event.dataTransfer.files
      if (files.length > 0) {
        this.handleFile(files[0])
      }
    },
    onFileChange(event) {
      const files = event.target.files
      if (files.length > 0) {
        this.handleFile(files[0])
      }
    },
    handleFile(file) {
      // Check if file is an Excel file
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel.sheet.macroEnabled.12'
      ]
      
      // Also check file extension as a fallback
      const fileName = file.name.toLowerCase()
      const isExcelExtension = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')
      
      if (validTypes.includes(file.type) || isExcelExtension) {
        this.selectedFile = file
      } else {
        alert('Please upload a valid Excel file (.xlsx or .xls)')
        this.$refs.fileInput.value = ''
      }
    },
    analyzeFile() {
      if (this.selectedFile) {
        this.$emit('file-selected', this.selectedFile)
      }
    },
    clearSelectedFile() {
      this.selectedFile = null
      this.$refs.fileInput.value = ''
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.upload-area {
  border: 2px dashed rgba(0, 120, 212, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: rgba(0, 120, 212, 0.8);
  background-color: rgba(0, 120, 212, 0.05);
}

.upload-area.dragover {
  border-color: #0078d4;
  background-color: rgba(0, 120, 212, 0.1);
}
</style>