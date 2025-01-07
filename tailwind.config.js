import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'], // Mendefinisikan font Montserrat
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2ec4b6',
					secondary: '#219ebc',
					accent: '#ff9f1c',
					neutral: '#cbf3f0',
					'base-100': '#ffffff',
					info: '#8ecae6',
					success: '#ffbf69',
					warning: '#ffd166',
					error: '#ef233c',
				},
			},
		],
	},
	plugins: [daisyui],
}
