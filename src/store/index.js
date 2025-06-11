import { createStore } from 'vuex'

export default createStore({
  state: {
    file: null,
    fileName: '',
    isAnalyzing: false,
    analysisResults: null,
    error: null
  },
  getters: {
    hasFile: state => !!state.file,
    getFileName: state => state.fileName,
    getAnalysisResults: state => state.analysisResults,
    isAnalyzing: state => state.isAnalyzing,
    hasError: state => !!state.error,
    getError: state => state.error
  },
  mutations: {
    SET_FILE(state, { file, fileName }) {
      state.file = file
      state.fileName = fileName
    },
    CLEAR_FILE(state) {
      state.file = null
      state.fileName = ''
      state.analysisResults = null
    },
    SET_ANALYZING(state, isAnalyzing) {
      state.isAnalyzing = isAnalyzing
    },
    SET_ANALYSIS_RESULTS(state, results) {
      state.analysisResults = results
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {
    uploadFile({ commit }, { file }) {
      return new Promise((resolve) => {
        commit('SET_FILE', { file, fileName: file.name })
        commit('CLEAR_ERROR')
        resolve()
      })
    },
    analyzeFile({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_ANALYZING', true)
        commit('CLEAR_ERROR')
        
        // Simulate API call with timeout
        setTimeout(() => {
          try {
            // Generate mock analysis results
            const mockResults = generateMockAnalysisResults(state.fileName)
            commit('SET_ANALYSIS_RESULTS', mockResults)
            commit('SET_ANALYZING', false)
            resolve(mockResults)
          } catch (error) {
            commit('SET_ERROR', 'Failed to analyze file: ' + error.message)
            commit('SET_ANALYZING', false)
            resolve(null)
          }
        }, 1500)
      })
    },
    clearFile({ commit }) {
      commit('CLEAR_FILE')
    }
  }
})

// Helper function to generate mock analysis results
function generateMockAnalysisResults(fileName) {
  return {
    fileName,
    summary: {
      rowCount: Math.floor(Math.random() * 1000) + 100,
      columnCount: Math.floor(Math.random() * 20) + 5,
      missingValues: Math.floor(Math.random() * 50),
      duplicateRows: Math.floor(Math.random() * 10)
    },
    statistics: {
      numericalColumns: [
        { name: 'Revenue', mean: 5420.45, median: 4500, min: 1000, max: 15000 },
        { name: 'Expenses', mean: 3250.30, median: 3000, min: 800, max: 9000 },
        { name: 'Profit', mean: 2170.15, median: 1500, min: -500, max: 8000 }
      ],
      categoricalColumns: [
        { 
          name: 'Department', 
          categories: [
            { name: 'Sales', count: 45 },
            { name: 'Marketing', count: 32 },
            { name: 'Engineering', count: 58 },
            { name: 'HR', count: 15 }
          ]
        },
        {
          name: 'Region',
          categories: [
            { name: 'North', count: 38 },
            { name: 'South', count: 42 },
            { name: 'East', count: 35 },
            { name: 'West', count: 35 }
          ]
        }
      ]
    },
    charts: {
      revenueByDepartment: {
        labels: ['Sales', 'Marketing', 'Engineering', 'HR'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 8500, 9200, 4300],
          backgroundColor: ['#0078d4', '#2b88d8', '#8764b8', '#ffb900']
        }]
      },
      profitTrend: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Profit',
          data: [1500, 1700, 2100, 2300, 2800, 3200],
          borderColor: '#107c10',
          tension: 0.1
        }]
      }
    },
    insights: [
      'The Sales department generates the highest revenue at $12,000',
      'There is a consistent upward trend in profits over the last 6 months',
      'The Engineering department has the most employees (58)',
      'The West and East regions have equal distribution (35 each)'
    ]
  }
}