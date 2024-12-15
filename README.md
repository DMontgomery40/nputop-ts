# nputop-ts

TypeScript version of nputop - A monitoring tool for Intel NPU (Neural Processing Unit). This is a TypeScript port of the original [nputop](https://github.com/DMontgomery40/nputop) Python tool.

## Features

- Real-time monitoring of Intel NPU metrics
- Power consumption tracking
- Temperature monitoring
- Utilization visualization with ASCII graphics
- TypeScript implementation for better type safety and developer experience

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Access to Intel NPU sysfs interface

## Installation

```bash
# Clone the repository
git clone https://github.com/DMontgomery40/nputop-ts.git
cd nputop-ts

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Usage

```bash
# Run the monitoring tool
npm start
```

## Development

```bash
# Watch for changes and rebuild automatically
npm run build -- --watch
```

## Docker Support

The tool can be run in a Docker container:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or using Docker directly
docker build -t nputop-ts .
docker run -it nputop-ts
```

## Structure

- `index.ts` - Main application entry point
- `npu_usage_graph.ts` - ASCII graph visualization component
- `tsconfig.json` - TypeScript configuration
- `Dockerfile` & `docker-compose.yml` - Container configuration

## License

MIT