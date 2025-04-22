# Number Quest

**Number Quest** es una aplicación web interactiva de matemáticas diseñada para niños de 2.º y 3.º grado de primaria. Su objetivo es reforzar de forma lúdica y visual conceptos clave como sumas, restas y figuras geométricas mediante juegos dinámicos y retroalimentación visual amigable.

## 🎯 Objetivos educativos

- Reforzar el cálculo mental básico (sumas y restas).
- Promover el reconocimiento de figuras geométricas.
- Estimular el pensamiento lógico y la atención.
- Fomentar la motivación a través de sistemas de racha y puntaje.

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/) con App Router
- [React](https://react.dev/) (Client y Server Components)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) para despliegue continuo
- Gitflow + Conventional Commits para control de versiones

## 🧩 Funcionalidades principales

- Juegos de sumas y restas con operaciones aleatorias hasta 20.
- Sistema de puntuación y estadísticas por tipo de operación.
- Retroalimentación visual con emojis animados según el desempeño.
- Interfaz accesible y adaptada para niños: botones grandes, iconos claros, navegación sencilla.
- Rutas dinámicas (`/twonumbers/[operation]`) para reutilizar lógica de juegos.

## 📦 Estructura del proyecto

```bash
src/
└─ app/
   ├─ layout.tsx         # Layout general
   ├─ page.tsx           # HomePage (Server Component)
   ├─ components/
   │  ├─ Mascot.tsx      # Mascota (Client Component)
   │  └─ ProgressSection.tsx  # Estadísticas (Client Component)
   └─ twonumbers/
      └─ [operation]/
         └─ page.tsx     # TwoNumbersPage (Client Component)
```

## ✅ Estado actual del proyecto

- ✅ Juego de sumas
- ✅ Juego de restas
- ✅ Sistema de puntaje y feedback visual
- ⏳ Juegos adicionales en desarrollo (multiplicaciones y geometría)
- 🛠️ Interfaz casi final, a la espera de ajustes menores

## 📅 Plan a futuro

- Implementar al menos dos juegos adicionales
- Mejoras de accesibilidad y experiencia de usuario
- Pruebas con usuarios reales para feedback educativo

---

**Desarrollado con ❤️ para reforzar el aprendizaje matemático desde edades tempranas.**
