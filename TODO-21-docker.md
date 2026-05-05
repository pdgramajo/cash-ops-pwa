# TODO: Docker Configuration

## Tasks

### 21.1 Create Dockerfile
- [ ] Use Node.js 20 LTS as base image
- [ ] Set working directory
- [ ] Copy package.json and pnpm-lock.yaml
- [ ] Install dependencies with pnpm
- [ ] Copy source code
- [ ] Build production bundle with Vite
- [ ] Use nginx Alpine as production server
- [ ] Copy nginx.conf for SPA routing
- [ ] Expose port 80
- [ ] Set health check

### 21.2 Create nginx Configuration
- [ ] Create nginx.conf:
  - Enable gzip compression
  - Set cache headers for static assets
  - Configure SPA routing (index.html fallback)
  - Set base path /Cash-operations-app/
  - Add security headers

### 21.3 Create Docker Compose
- [ ] Create docker-compose.yml:
  - Service: app (build context)
  - Port mapping: 8080:80
  - Volume for development (optional)
  - Environment variables
- [ ] Create docker-compose.dev.yml:
  - Service: app-dev with hot reload
  - Port mapping: 5173:5173 (Vite dev)
  - Volume for source code

### 21.4 Create .dockerignore
- [ ] Ignore node_modules
- [ ] Ignore .git
- [ ] Ignore build artifacts
- [ ] Ignore test files

### 21.5 Create Makefile
- [ ] Add docker-build target
- [ ] Add docker-up target
- [ ] Add docker-down target
- [ ] Add docker-dev target
- [ ] Add docker-logs target

## Docker Image Details
- Base: node:20-alpine
- Production: nginx:alpine
- Tag: cash-operations-system:latest

## Acceptance Criteria
- [ ] App builds successfully in Docker
- [ ] nginx serves app with correct base path
- [ ] SPA routing works
- [ ] Hot reload works in dev mode

## Dependencies
- TODO-01-project-setup (complete)
- TODO-20-pwa-build (complete)

## Status: PENDING