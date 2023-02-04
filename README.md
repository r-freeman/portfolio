[![Portfolio of Ryan Freeman](https://user-images.githubusercontent.com/30879081/216763956-c29264db-a15d-44b9-9cfd-8cd6828ca527.jpeg)](https://ryanfreeman.dev/)

# Portfolio

This website was built using TypeScript, React, Next.js and Tailwind CSS. It is designed to showcase my professional experience
and skills, as well as provide information about me and my interests.

- Language: [TypeScript](https://www.typescriptlang.org/)
- Framework: [Next.js](https://nextjs.org/)
- Database: [Supabase](https://supabase.com/) (Postgres)
- ORM: [Prisma](https://www.prisma.io/)
- Deployment: [Vercel](https://vercel.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Integrations: [Spotify](https://spotify.com/)

## Project structure

- `components/` - All the components of the website in tsx format.
- `lib/` - Useful functions and scripts for connecting to external services and so on.
- `pages/api/` - API routes for article views and Spotify integrations.
- `pages/writing/` - Blog posts written in MDX format (Markdown in JSX).
- `pages/` - Contains all other static pages like about, projects and uses.
- `prisma/` - Prisma schema which describes the structure of the Supabase postgres database.
- `public/` - Used for static files such as icons and images.
- `styles/` - Contains the stylesheets for Tailwind and Prism.
- `types/` - Types for various components in the project.

## Running locally

This application requires node v16.14+.

```bash
git clone https://github.com/r-freeman/portfolio.git
cd portfolio/
npm i
npm run dev
```

Create a `.env.local` file using `.env.example` as a template.