This is a Nextjs 15 web project with login and registration functionality, allowing access to a dashboard where employees can perform time-related tasks such as check-ins. Users can log out of their sessions. 
The project uses Next Auth for authentication and integrates JWT token and authorization endpoints with the app-clock API.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Getting Started

First, run the development server:

```bash
# install dependencies
pnpm install

# run web project
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Docker

## Create and run a local image docker

```bash

docker build -t image-ui .

docker run -p 3000:3000 image-ui

```


# Deploy Next.js to Google Cloud Run

This is a Next.js template which can be deployed to [Google Cloud Run](https://cloud.google.com/run/docs).

## Deploying to Google Cloud Run

This template can be used to deploy your Next.js application as a Docker container.

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) so you can use `gcloud` on the command line.
1. Run `gcloud auth login` to log in to your account.
1. [Create a new project](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) in Google Cloud Run (e.g. `nextjs-docker`). Ensure billing is turned on.
1. Deploy to Cloud Run: `gcloud run deploy helloworld --source=. --project=PROJECT-ID --region=us-central1 --allow-unauthenticated`.

   - You must replace `PROJECT-ID` with your Google Cloud Project ID.
   - You may replace `us-central1` with a different Google Cloud [region](https://cloud.google.com/run/docs/locations).

For more information, see the Next.js [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



