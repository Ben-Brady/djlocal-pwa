import plugin from "tailwindcss/plugin";

export const typographyPlugin = () =>
    plugin(function ({ addUtilities }) {
        addUtilities({
            ".text-heading-1": {
                "font-size": "32px",
                "font-weight": "700",
            },

            ".text-heading-2": {
                "font-size": "20px",
                "font-weight": "700",
            },

            ".text-heading-3": {
                "font-size": "16px",
            },

            ".text-heading-3-bold": {
                "font-size": "16px",
                "font-weight": "700",
            },

            ".text-heading-4": {
                "font-size": "14px",
            },

            ".text-button": {
                "font-size": "16px",
                "font-weight": "700",
                "text-transform": "uppercase",
            },

            ".text-small": {
                "font-size": "12px",
            },

            ".text-small-bold": {
                "font-size": "12px",
                "font-weight": "700",
            },
        });
    });
