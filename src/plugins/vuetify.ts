/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#1f1f23',
          surface: '#131317',
          'surface-dim': '#131317',
          'surface-bright': '#39393d',
          'surface-container-lowest': '#0e0e12',
          'surface-container-low': '#1b1b1f',
          'surface-container': '#1f1f23',
          'surface-container-high': '#2a2a2e',
          'surface-container-highest': '#343439',
          'on-surface': '#e4e1e7',
          outline: '#8f909a',
          'outline-variant': '#45464f',
          primary: '#b5c5fb',
          'on-primary': '#1e2e5b',
          'primary-container': '#354572',
          'on-primary-container': '#dbe1ff',
          secondary: '#9cccf2',
          'on-secondary': '#00344e',
          'secondary-container': '#134b6c',
          'on-secondary-container': '#cae6ff',
          tertiary: '#d1bdf7',
          'on-tertiary': '#372757',
          'tertiary-container': '#4e3e6f',
          'on-tertiary-container': '#ebddff',
          error: '#ffb4ab',
          'on-error': '#690005',
          'error-container': '#93000a',
          'on-error-container': '#ffb4ab',
          'surface-light': '#39393d',
        },
        dark: true,
        variables: {
          'overlay-background': '#191b23',
        },
      },
    },
  },
})


export default vuetify

/*
export default createVuetify({
  theme: {
    defaultTheme: 'system',
    utilities: false,
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})*/
