# JSON Formatter

A simple, fast, and secure JSON formatter built with React and Vite.
Designed with a cool dark theme and privacy in mind.

## Features

- **Real-time Formatting**: Automatically formats JSON as you type.
- **Syntax Highlighting**: Easy-to-read colorful JSON output.
- **Error Detection**: Instantly validates JSON and shows error messages.
- **Secure**: All processing happens locally in your browser. No data is sent to any server.
- **Customizable**:
  - Adjustable indentation (2, 4, 8 spaces).
  - Minify mode (0 spaces).
- **Utilities**:
  - One-click Copy to Clipboard.

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [PrismJS](https://prismjs.com/) (for syntax highlighting)
- [Lucide React](https://lucide.dev/) (for icons)

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/t11a/json-formatter.git
   cd json-formatter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

MIT
