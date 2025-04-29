[![Portfolio of Ryan Freeman](https://user-images.githubusercontent.com/30879081/216793827-c480404a-3d91-4f9b-ba4a-26eed9cadb37.jpeg)](https://ryanfreeman.dev/)

# Portfolio

This website was built using TypeScript, React, Next.js and Tailwind CSS. It is designed to showcase my professional experience
and skills, as well as provide information about me and my interests.

- Language: [TypeScript](https://www.typescriptlang.org/)
- Framework: [Next.js](https://nextjs.org/)
- Database: [Supabase](https://supabase.com/)
- Deployment: [Self-Hosted on Raspberry Pi 5](https://ryanfreeman.dev/writing/migrating-from-vercel-to-raspberry-pi-5)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

## Project structure

- `app/` - App router.
- `app/api/` - API routes for article views and Spotify integrations.
- `app/writing/` - Blog posts written in MDX format (Markdown in JSX).
- `components/` - All the components of the website in tsx format.
- `lib/` - Useful functions and scripts for connecting to external services and so on.
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
