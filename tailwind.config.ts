import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./containers/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1440px",
			},
		},
		extend: {
			fontFamily: {
				display: ['"Syne"', "sans-serif"],
				body: ['"Outfit"', "sans-serif"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground":
						"hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground":
						"hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				// Lifestyle brand colors
				coral: {
					DEFAULT: "hsl(var(--coral))",
					light: "hsl(var(--coral-light))",
				},
				turquoise: {
					DEFAULT: "hsl(var(--turquoise))",
					light: "hsl(var(--turquoise-light))",
				},
				gold: {
					DEFAULT: "hsl(var(--gold))",
					light: "hsl(var(--gold-light))",
				},
				navy: "hsl(var(--navy))",
				cream: "hsl(var(--cream))",
				sand: "hsl(var(--sand))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 4px)",
				sm: "calc(var(--radius) - 8px)",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "2rem",
				"4xl": "2.5rem",
			},
			spacing: {
				"18": "4.5rem",
				"22": "5.5rem",
				"30": "7.5rem",
			},
			fontSize: {
				"2xs": ["0.625rem", { lineHeight: "0.875rem" }],
				"10xl": ["10rem", { lineHeight: "1" }],
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
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(40px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in-left": {
					"0%": { opacity: "0", transform: "translateX(-40px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"slide-in-right": {
					"0%": { opacity: "0", transform: "translateX(40px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"bounce-soft": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-up": "fade-up 0.8s ease-out forwards",
				"fade-in": "fade-in 0.6s ease-out forwards",
				"scale-in": "scale-in 0.5s ease-out forwards",
				"slide-up": "slide-up 0.6s ease-out forwards",
				"slide-in-left": "slide-in-left 0.6s ease-out forwards",
				"slide-in-right": "slide-in-right 0.6s ease-out forwards",
				"bounce-soft": "bounce-soft 2s ease-in-out infinite",
				wiggle: "wiggle 1s ease-in-out infinite",
				float: "float 6s ease-in-out infinite",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-sunset": "var(--gradient-sunset)",
				"gradient-ocean": "var(--gradient-ocean)",
				"gradient-hero": "var(--gradient-hero)",
				"gradient-card": "var(--gradient-card)",
			},
			boxShadow: {
				soft: "var(--shadow-soft)",
				medium: "var(--shadow-medium)",
				glow: "var(--shadow-glow)",
				card: "var(--shadow-card)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
