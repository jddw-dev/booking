import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: 'libs/frontend/contacts/data-access/**/*.graphql',
  generates: {
    'libs/frontend/contacts/data-access/src/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
      },
    },
  },
};
export default config;
