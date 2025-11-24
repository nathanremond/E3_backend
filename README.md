# E3_backend

## Installation

### Prérequis:

- Node.js
- PostgreSQL
- MongoDB

Installer les dépendances:

- `npm install`

## Lancer l'API'

- `npm run dev`

## Configuration

.env: Fichier contenant les variables d'environnements des bases de developpement.

#### Variables d'environnements de .env:

PGUSER= nom de l'utilisateur postgreSQL

PGHOST= localhost

PGDATABASE= nom de la DB de dev

PGPASSWORD= mot de passe de l'utilisateur postgreSQL

PGPORT=5432

MONGO_URI= mongodb://127.0.0.1:27017/nom de la DB de dev

MONGO_DBNAME= nom de la DB de dev

PORT=3000

## Routes principales

- /trainings
- /sessions
- /registrations