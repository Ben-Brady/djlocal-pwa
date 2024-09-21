// size-screen

import plugin from "tailwindcss/plugin";

export const utilitiesPlugin = () =>
    plugin(function ({ addUtilities }) {
        addUtilities({
            ".flex-center": {
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
            },
            ".flex-col": {
                display: "flex",
                "flex-direction": "column",
            },
            ".flex-row": {
                display: "flex",
                "flex-direction": "row",
            },
            ".size-card": {
                width: "var(--card-width)",
                height: "var(--card-height)",
            },
            ".size-screen": {
                width: "100dvw",
                height: "100dvh",
            },
        });
    });
