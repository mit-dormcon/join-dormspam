# join-dormspam.mit.edu

The easiest way to subscribe to dormspam.

## .env

Before trying to develop, create a file called `.env` with the contents `PUBLIC_MOIRA_API="https://moira-api.mit.edu"`.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
