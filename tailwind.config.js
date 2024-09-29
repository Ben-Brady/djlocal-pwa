import { utilitiesPlugin } from "./src/styles/plugins/utilities";

const spacing = (number) => `${number / 4}rem`;

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            white: "white",
            lightGrey: "rgb(65, 65, 65)",
            black: "black",

            text: "var(--color-text)",
            background: "var(--color-background)",
            primary: "var(--color-primary)",
            secondary: "var(--color-secondary)",
            tertiary: "var(--color-tertiary)",
            accent: "var(--color-accent)",
        },
        boxShadow: {
            low: `1px 1px 1.6px hsl(var(--color-shadow) / 0.25), 1.6px 1.6px 2.6px -1.2px hsl(var(--color-shadow) / 0.27), 3.6px 3.6px 5.9px -2.3px hsl(var(--color-shadow) / 0.28)`,
            medium: `1px 1px 1.6px hsl(var(--color-shadow) / 0.26), 3.2px 3.2px 5.2px -0.8px hsl(var(--color-shadow) / 0.28), 7.6px 7.6px 12.4px -1.5px hsl(var(--color-shadow) / 0.29), 18px 18px 29.4px -2.3px hsl(var(--color-shadow) / 0.3)`,
            hard: `1px 1px 1.6px hsl(var(--color-shadow) / 0.28), 5.8px 5.8px 9.5px -0.4px hsl(var(--color-shadow) / 0.29), 11px 11px 18px -0.8px hsl(var(--color-shadow) / 0.29), 18.9px 18.9px 30.9px -1.2px hsl(var(--color-shadow) / 0.3), 31.5px 31.5px 51.5px -1.5px hsl(var(--color-shadow) / 0.31), 51.2px 51.2px 83.6px -1.9px hsl(var(--color-shadow) / 0.31), 80px 80px 130.7px -2.3px hsl(var(--color-shadow) / 0.32`,
        },
        extend: {
            spacing: {
                128: spacing(128),
                256: spacing(256),
            },
            transitionDuration: {
                25: "25ms",
                50: "50ms",
            },
        },
    },
    plugins: [utilitiesPlugin()],
};
