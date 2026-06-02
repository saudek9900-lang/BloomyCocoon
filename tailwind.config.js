import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';

export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./app.js"
    ],
    theme: {
        extend: {
            colors: {
                "primary-fixed-dim": "#c9c6c1",
                "surface-variant": "#ffdad2",
                "on-primary-fixed-variant": "#484743",
                "secondary": "#725852",
                "tertiary-fixed": "#d9e6d2",
                "on-secondary-fixed-variant": "#59413b",
                "tertiary": "#566252",
                "on-surface-variant": "#484740",
                "on-error-container": "#93000a",
                "on-secondary-container": "#775d56",
                "surface-bright": "#fff8f6",
                "background": "#fff8f6",
                "surface-container-lowest": "#ffffff",
                "surface": "#fff8f6",
                "on-primary-container": "#706f6b",
                "outline": "#79776f",
                "on-tertiary-fixed": "#141e12",
                "on-error": "#ffffff",
                "surface-dim": "#f8d2c9",
                "secondary-container": "#fbd8d0",
                "error": "#ba1a1a",
                "on-tertiary-container": "#667262",
                "surface-container-low": "#fff1ed",
                "on-primary": "#ffffff",
                "outline-variant": "#c9c6bd",
                "surface-tint": "#605e5a",
                "surface-container": "#ffe9e4",
                "on-background": "#2a1611",
                "surface-container-highest": "#ffdad2",
                "on-surface": "#2a1611",
                "on-secondary-fixed": "#291712",
                "on-tertiary": "#ffffff",
                "primary": "#605e5a",
                "error-container": "#ffdad6",
                "inverse-surface": "#422b25",
                "tertiary-fixed-dim": "#bdcab7",
                "inverse-on-surface": "#ffede9",
                "surface-container-high": "#ffe2db",
                "secondary-fixed": "#fedbd2",
                "on-secondary": "#ffffff",
                "primary-container": "#f7f3ee",
                "on-primary-fixed": "#1c1c19",
                "inverse-primary": "#c9c6c1",
                "on-tertiary-fixed-variant": "#3e4a3b",
                "tertiary-container": "#ebf8e3",
                "primary-fixed": "#e6e2dd",
                "secondary-fixed-dim": "#e1bfb7"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                xl: "80px",
                lg: "48px",
                base: "8px",
                xs: "4px",
                "container-max": "1200px",
                md: "24px",
                sm: "12px",
                gutter: "24px"
            },
            fontFamily: {
                "body-md": ["Inter"],
                "headline-sm": ["Playfair Display"],
                "display-lg": ["Playfair Display"],
                "headline-md": ["Playfair Display"],
                "label-md": ["Inter"],
                caption: ["Inter"],
                "display-lg-mobile": ["Playfair Display"],
                "body-lg": ["Inter"]
            },
            fontSize: {
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
                "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
                "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "500" }],
                caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
                "display-lg-mobile": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
                "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }]
            }
        }
    },
    plugins: [
        forms,
        containerQueries
    ]
};
