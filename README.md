# Cash Operations System

Sistema de Operaciones de Efectivo (Cash Operations System) es una aplicación web progresiva (PWA) diseñada para gestionar de manera integral las operaciones de efectivo en una carnicería o negocio de alimentos con múltiples sucursales.

## Características

- **Gestión de Sesiones de Caja** - Control de sesiones abiertas y cerradas con saldo automático
- **Registro de Transacciones** - Ventas en efectivo y por transferencia, gastos, retiros
- **Gestión de Inventario** - Entradas, salidas, transferencias entre sucursales
- **Reportes PDF** - Reportes por sesión y reportes diarios consolidados
- **Funcionamiento Offline** - Todos los datos almacenados localmente via IndexedDB
- **Diseño Responsive** - Optimizado para dispositivos móviles

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Database**: Dexie.js (IndexedDB)
- **i18n**: i18next (Español Argentino)
- **Testing**: Vitest + @testing-library/react
- **Linting**: ESLint + Prettier

## Estructura del Proyecto

```
src/
├── components/     # Componentes React reutilizables
├── hooks/         # Custom hooks (useBranches, useSessions, etc.)
├── repositories/  # Capa de acceso a datos
├── services/      # Servicios de negocio
├── pages/         # Páginas de la aplicación
├── types/         # Definiciones de tipos TypeScript
├── utils/         # Utilidades (formatters, validators)
└── db/           # Configuración de base de datos
```

## Primeros Pasos

### Requisitos

- Node.js 20+
- pnpm (recomendado)

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev        # Iniciar servidor de desarrollo
pnpm build     # Build de producción
pnpm lint      # Verificar código
pnpm test      # Ejecutar pruebas
```

## Licencia

MIT