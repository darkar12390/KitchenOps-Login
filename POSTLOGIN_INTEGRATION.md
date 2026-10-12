# Integración del postlogin de Kitchen Ops

Este prototipo usa Expo SDK 57, React Native, TypeScript y Expo Router.

## Ejecutar

```bash
npm ci
npm run web
```

Para móvil: `npm start` y abrir el proyecto con un cliente compatible con Expo SDK 57.

Credenciales de demostración: usuario `demo`, contraseña `1234`.

## Código fuente y flujo

- `src/screens/LoginScreen.tsx`: valida las credenciales demo localmente y navega a `/home` mediante `router.replace`.
- `src/app/home.tsx`: ruta que exporta la pantalla del postlogin.
- `src/screens/HomeScreen.tsx`: bienvenida interactiva de tres pasos, estado de finalización y botón de cierre de sesión que regresa a `/`.
- `src/app/_layout.tsx`: configuración de navegación, área segura y barra de estado.
- `src/theme/colors.ts` y `src/theme/layout.ts`: colores y medidas compartidas.
- `assets/images/resort-background.png`: fondo usado por el login y el postlogin.
- `src/components/`: componentes compartidos del login.

Los archivos de rutas están en `src/app/`; las pantallas y componentes se mantienen fuera de esa carpeta.

## Punto de integración

En `HomeScreen.tsx`, el botón «Empezar mi ruta» establece `welcomeComplete` y muestra la tarjeta «¡Todo listo para comenzar!». Esa tarjeta es el punto donde conectar la experiencia de aprendizaje del proyecto receptor. El login navega a `/home` al validar las credenciales demo.

El prototipo no implementa autenticación de servidor, protección de rutas ni persistencia de sesión o del avance. La bienvenida vuelve al primer paso al montar nuevamente la pantalla. La recuperación de contraseña y la ruta de aprendizaje muestran mensajes provisionales.

## Validación

```bash
npm run lint
npm run typecheck
```

Verificación manual: iniciar con `demo` / `1234`, avanzar con «Siguiente» por los tres pasos, pulsar «Empezar mi ruta» y comprobar la tarjeta final; «Cerrar sesión» regresa al login.
