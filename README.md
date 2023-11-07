# Commands

## Generate lib

nx g @nx/angular:lib feature-users --standalone --routing --lazy --parent=src/app/app.routes.ts --tags=scope:frontend,type:feature

## Generate state

## Generate GraphQL types for Frontend

npx nx run frontend-shared-graphql:codegen

# Roadmap

- Refactor / Rendre propre l'import des contacts
- Ajout loader
- Ajout alertes
- Ajout filtres liste contacts
- Ajout visualisation d'un contact
- Modèles d'email
- Envoi d'email à un contact
- Séquences d'email
- Implémenter tests unitaires / E2E !!
- Composants UI pour tabs
- Ajouter toutes les propriétés d'un contact (adresse, etc..)
- Contact : création / édition
- Contact : gestion de plusieurs emails
- Contact : gestion de plusieurs téléphones

# Fait

- Pagination liste contacts
