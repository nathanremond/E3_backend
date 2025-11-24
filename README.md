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

### Génération de la clé JWT

L’API utilise une clé secrète pour signer les tokens JWT.
Vous devez créer une clé et la placer dans le fichier .env.

Exemple: JWT_SECRET=votre_cle_secrete

## Routes principales

- /trainings
- /sessions
- /registrations

## Sécurité

- authMiddleware: Middleware qui gère la connexion d'un utilisateur avec un token.
- roleMiddleware: Middleware qui vérifie si un utilisateur possède le rôle requis pour certaines routes.
- Hashage des mots de passes des utilisateurs lors de leur création avec bcrypt.
- Ajout de CORS pour que les requêtes fonctionnent sur http://localhost:5173.
- Ajout d'un rate limiter pour éviter une surcharge de requêtes (max 100 toutes les 15 minutes).
- Validation des données avec Joi.

## Documentation

Documentation Swagger disponible:

- `http://localhost:3000/docs`

## Tests

Lancer les tests jest / supertest:

- `npm run test`

Une collection postman se trouve dans le dossier exports.
