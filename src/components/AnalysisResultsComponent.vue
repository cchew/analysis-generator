<template>
  <div class="analysis-results">
    <v-card class="mb-4">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-file-excel" class="mr-2" color="success"></v-icon>
        Analysis Results: {{ results.fileName }}
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          color="primary"
          @click="$emit('new-upload')"
        >
          <v-icon icon="mdi-upload" class="mr-1"></v-icon>
          Upload New File
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card variant="outlined" class="mb-4">
              <v-card-title class="text-subtitle-1">
                <v-icon icon="mdi-information-outline" class="mr-2" color="info"></v-icon>
                Summary
              </v-card-title>
              <v-card-text>
                <v-list density="compact" lines="one">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-table-row" color="primary"></v-icon>
                    </template>
                    <v-list-item-title>Rows: {{ results.summary.rowCount }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-table-column" color="primary"></v-icon>
                    </template>
                    <v-list-item-title>Columns: {{ results.summary.columnCount }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-alert-circle-outline" color="warning"></v-icon>
                    </template>
                    <v-list-item-title>Missing Values: {{ results.summary.missingValues }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-content-duplicate" color="warning"></v-icon>
                    </template>
                    <v-list-item-title>Duplicate Rows: {{ results.summary.duplicateRows }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card variant="outlined" class="mb-4">
              <v-card-title class="text-subtitle-1">
                <v-icon icon="mdi-lightbulb-outline" class="mr-2" color="warning"></v-icon>
                Key Insights
              </v-card-title>
              <v-card-text>
                <v-list density="compact" lines="one">
                  <v-list-item v-for="(insight, index) in results.insights" :key="index">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle-outline" color="success"></v-icon>
                    </template>
                    <v-list-item-title>{{ insight }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <v-divider class="my-4"></v-divider>
        
        <v-row>
          <v-col cols="12">
            <v-card variant="outlined" class="mb-4">
              <v-card-title class="text-subtitle-1">
                <v-icon icon="mdi-chart-bar" class="mr-2" color="primary"></v-icon>
                Data Visualization
              </v-card-title>
              <v-card-text>
                <v-tabs v-model="activeTab" color="primary">
                  <v-tab value="bar">Revenue by Department</v-tab>
                  <v-tab value="line">Profit Trend</v-tab>
                </v-tabs>
                
                <v-window v-model="activeTab" class="mt-4">
                  <v-window-item value="bar">
                    <div class="chart-container">
                      <bar-chart :chart-data="results.charts.revenueByDepartment" />
                    </div>
                  </v-window-item>
                  
                  <v-window-item value="line">
                    <div class="chart-container">
                      <line-chart :chart-data="results.charts.profitTrend" />
                    </div>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-calculator-variant" class="mr-2" color="primary"></v-icon>
                    Numerical Statistics
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-table>
                    <thead>
                      <tr>
                        <th>Column</th>
                        <th>Mean</th>
                        <th>Median</th>
                        <th>Min</th>
                        <th>Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="column in results.statistics.numericalColumns" :key="column.name">
                        <td>{{ column.name }}</td>
                        <td>{{ formatNumber(column.mean) }}</td>
                        <td>{{ formatNumber(column.median) }}</td>
                        <td>{{ formatNumber(column.min) }}</td>
                        <td>{{ formatNumber(column.max) }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-expansion-panel-text>
              </v-expansion-panel>
              
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-shape" class="mr-2" color="primary"></v-icon>
                    Categorical Statistics
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col v-for="column in results.statistics.categoricalColumns" :key="column.name" cols="12" md="6">
                      <v-card variant="outlined" class="mb-2">
                        <v-card-title class="text-subtitle-2">{{ column.name }}</v-card-title>
                        <v-card-text>
                          <v-list density="compact">
                            <v-list-item v-for="category in column.categories" :key="category.name">
                              <v-list-item-title>{{ category.name }}</v-list-item-title>
                              <template v-slot:append>
                                <v-chip size="small" color="primary" variant="tonal">{{ category.count }}</v-chip>
                              </template>
                            </v-list-item>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Bar as BarChart, Line as LineChart } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'AnalysisResultsComponent',
  components: {
    BarChart,
    LineChart
  },
  props: {
    results: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'bar'
    }
  },
  methods: {
    formatNumber(value) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value)
    }
  }
}
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}
</style>