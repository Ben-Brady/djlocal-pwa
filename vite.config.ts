import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [
        preact(),
        VitePWA({
            registerType: "prompt",
            injectRegister: "auto",

            pwaAssets: {
                disabled: true,
                config: false,
            },

            manifest: {
                name: "DJLocal",
                short_name: "DJLocal",
                description: "A music app for setting up queues and transitions",
                theme_color: "#8A1212",
                icons: [
                    {
                        src: "apple-touch-icon-180x180.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },

            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,manifest}"],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: "index.html",
                suppressWarnings: true,
                type: "module",
            },
        }),
    ],
});
