# Excel Analysis App

A modern Vue 3 application for analyzing Excel spreadsheets and generating insightful visualizations.

## Features

- Upload Excel spreadsheets (.xlsx, .xls)
- Automatic data analysis and summary generation
- Interactive data visualizations with charts
- Statistical analysis of numerical and categorical data
- Modern, minimalistic UI inspired by Microsoft 365

## Tech Stack

- Vue 3 (Options API)
- Vite (Build tool)
- Vuex (State management)
- Vue Router (Navigation)
- Vuetify 3 (UI components)
- Chart.js (Data visualization)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/excel-analysis-app.git
   cd excel-analysis-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173` (or another port if 5173 is already in use).

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
excel-analysis-app/
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Application assets
│   ├── components/     # Vue components
│   ├── router/         # Vue Router configuration
│   ├── store/          # Vuex store
│   ├── views/          # Vue views/pages
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## Usage

1. Open the application in your browser
2. Upload an Excel file using the drag-and-drop interface or file browser
3. Wait for the analysis to complete
4. Explore the generated visualizations and statistics
5. Upload a new file to start a new analysis

## License

[MIT](LICENSE)