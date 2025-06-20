# ConcreteScheduler API (NestJS)

API desarrollada en NestJS para gestionar reservas de entregas de concreto. Esta implementación forma parte de una prueba técnica y sigue una arquitectura **MVC**. Todos los datos se manejan **en memoria** usando mocks Update(se agrego SQLLite como base de datos).

---

## 📦 Estructura del Proyecto

```
src/
├── app.module.ts
├── main.ts
├── calendar/
│   ├── application/
│   ├── infrastructure/
│   └── calendar.module.ts
├── reservations/
│   ├── application/
│   ├── dto/
│   ├── infrastructure/
│   └── reservations.module.ts
├── users/
│   ├── application/
│   └── users.module.ts
```

---

## 🔧 Funcionalidades Implementadas

### 1. 📆 Calendario (`/calendar`)

- Simula disponibilidad de **Septiembre 2023**.
- Cada día tiene franjas horarias (`08:00`, `10:00`, etc.).
- Días y horarios están pre-cargados con lógica alternada de disponibilidad.

#### Endpoints:
- `GET /calendar?month=06&year=2025` → Devuelve días del mes con estado.
- `GET /calendar/:date` → Devuelve slots disponibles y ocupados para una fecha.

---

### 2. 📋 Reservas (`/reservations`)

- Permite **crear una reserva** si el horario está disponible.
- **Bloquea automáticamente** el slot reservado.
- Guarda reservas en un objeto `STORAGE` en memoria.

#### Endpoints:
- `POST /reservations` → Crea una reserva validada.
- `GET /reservations-by-ids` → Devuelve una lista de reservaciones acorde a la lista de ids.
- `GET /reservations/:id` → Devuelve resumen de la reserva.
- `GET /reservations/user/:email` → Devuelve historial de reservas de un usuario.

---

## ✅ Validaciones

- Usé `class-validator` en los DTOs para asegurar que los campos estén bien definidos:
  - `@IsEmail`, `@IsString`, `@IsNotEmpty`
- Activé `ValidationPipe` globalmente.

---

## 🔐 CORS y Seguridad Básica
- CORS habilitado para `http://localhost:4200` (Angular).
- Sin login ni autenticación: el email del usuario o ids se guarda desde el frontend (ej. LocalStorage) para consultas futuras.

---

 

---

## 📌 Notas

- La app funciona **completamente en memoria**, sin base de datos.
 
