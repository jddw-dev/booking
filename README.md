# Commands

## Generate lib

nx g @nx/angular:lib feature-users --standalone --routing --lazy --parent=src/app/app.routes.ts --tags=scope:frontend,type:feature

## Generate state

## Generate GraphQL types for Frontend

npx nx run frontend-shared-graphql:codegen
