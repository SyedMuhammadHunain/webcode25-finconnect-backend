import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f4ffcc',
            100: '#e8ff99',
            200: '#daff66',
            300: '#ccff33',
            400: '#bfff00',
            500: '#b4ff00', // ACID LIME
            600: '#99d900',
            700: '#7eb300',
            800: '#648d00',
            900: '#496600',
            950: '#2f4000'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#0b1a12' // DEEP MATRIX
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#0b1a12' // DEEP MATRIX
                }
            }
        }
    }
});
