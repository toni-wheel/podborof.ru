import { defineConfig } from "vite";
import path from "node:path";
import autoprefixer from "autoprefixer";
import htmlConfig from "vite-plugin-html-config";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  /* --------------------------------------------------------------------
     1. Общее
     ------------------------------------------------------------------ */
  root: "src",
  base: "./",

  /* --------------------------------------------------------------------
     2. Сборка
     ------------------------------------------------------------------ */
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    cssCodeSplit: false,

    // Чтобы даже маленькие шрифты не заинлайнились в base64
    assetsInlineLimit: 0,

    rollupOptions: {
      input: path.resolve(__dirname, "src/index.html"),
      output: {
        entryFileNames: "assets/js/[name].[hash].js",

        /* --------------------------------------------------------------
           Куда класть ассеты
           ------------------------------------------------------------ */
        assetFileNames: ({ name }) => {
          if (!name) return "assets/[name].[hash][extname]";

          // Шрифты → assets/fonts
          if (/\.(woff2?|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name].[hash][extname]";
          }

          // CSS → assets/css
          if (name.endsWith(".css")) {
            return "assets/css/[name].[hash][extname]";
          }

          // Остальное — в assets/
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },

  /* --------------------------------------------------------------------
     3. CSS / SCSS
     ------------------------------------------------------------------ */
  css: {
    postcss: { plugins: [autoprefixer()] },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "abstracts/_vars" as *;`,
      },
    },
  },

  /* --------------------------------------------------------------------
     4. Плагины
     ------------------------------------------------------------------ */
  plugins: [
    htmlConfig({
      metas: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "theme-color", content: "#000000" },
      ],
      links: [{ rel: "icon", href: "/favicon.ico" }],
    }),

    // копируем всё из public/ как есть (если нужно)
    viteStaticCopy({
      targets: [{ src: "../public/*", dest: "." }],
    }),
  ],

  /* --------------------------------------------------------------------
     5. Алиасы
     ------------------------------------------------------------------ */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ← общий alias
      "@assets": path.resolve(__dirname, "src/assets"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
});
