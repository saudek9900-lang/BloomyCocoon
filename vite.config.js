import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function cleanUrlsPlugin() {
  return {
    name: 'clean-urls-preview',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const [cleanPath, query] = (req.url || '').split('?');
        if (!path.extname(cleanPath)) {
          const trimmed = cleanPath.replace(/^\/+|\/+$/g, '');
          if (trimmed) {
            const candidate = path.join(process.cwd(), 'dist', trimmed, 'index.html');
            if (fs.existsSync(candidate)) {
              req.url = `/${trimmed}/index.html${query ? `?${query}` : ''}`;
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  server: {
    allowedHosts: true,
    hmr: false
  },
  plugins: [cleanUrlsPlugin()]
});
