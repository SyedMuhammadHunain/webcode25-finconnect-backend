import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f7ffd9',
            100: '#eeffaa',
            200: '#e0ff77',
            300: '#ccff33',
            400: '#bfff0d',
            500: '#b4ff00', // ACID LIME
            600: '#96d400',
            700: '#78a900',
            800: '#5a7e00',
            900: '#3c5300',
            950: '#1e2a00'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f6f8fa',
                    100: '#eaecef',
                    200: '#d0d7de',
                    300: '#afb8c1',
                    400: '#8c959f',
                    500: '#6e7781',
                    600: '#57606a',
                    700: '#424a53',
                    800: '#32383f',
                    900: '#24292f',
                    950: '#0d1117'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '#f6f8fa',
                    100: '#eaecef',
                    200: '#d0d7de',
                    300: '#afb8c1',
                    400: '#8c959f',
                    500: '#6e7781',
                    600: '#57606a',
                    700: '#424a53',
                    800: '#32383f',
                    900: '#161b22',
                    950: '#0d1117'
                }
            }
        }
    }
});
