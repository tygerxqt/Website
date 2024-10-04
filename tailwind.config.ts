import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
	darkMode: ["class"],
	content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
				display: ["var(--font-sora)", ...fontFamily.sans],
				serif: ["var(--font-literata)", ...fontFamily.serif],
				mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			screens: {
				xs: "400px",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
