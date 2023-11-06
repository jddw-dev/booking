# Commands

## Generate lib

nx g @nx/angular:lib feature-users --standalone --routing --lazy --parent=src/app/app.routes.ts --tags=scope:frontend,type:feature

## Generate state

## Generate GraphQL types for Frontend

npx nx run frontend-shared-graphql:codegen

# Roadmap

- Refactor / Rendre propre l'import des contacts
- Ajout pagination liste contacts
- Ajout loader
- Ajout alertes
- Ajout filtres liste contacts
- Ajout visualisation d'un contact
- Modèles d'email
- Envoi d'email à un contact
- Séquences d'email
