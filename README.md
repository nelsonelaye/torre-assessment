# Orbit Talent Explorer

A talent explorer where users search for professionals and view their detailed profiles. This can help them reach out to potential professional for career opportunities and partnerships.

## 🚀 Key Features

- **Streaming Search**: Results populate the UI in real-time as they arrive from the Torre API stream.
- **Intelligent Debouncing**: Optimized search frequency using `use-debounce` to reduce API overhead.
- **Profile Discovery**: Immersive slide-over modals for exploring talent professional headlines and bios.
- **Dark Mode Support**: Fully responsive, accessible, and premium design system using Tailwind CSS.
- **Robust State Management**: Leverages React Query for caching, loading states, and elegant server-synchronization.

## ⚖️ Technical Trade-offs

### 1. Client-Side Streaming with Manual State Synchronization
- **Trade-off**: While React Query is excellent for promise-based fetching, it doesn't natively handle streaming batch updates well. 

### 2. Internal API Proxy for CORS
- **Trade-off**: Direct browser requests to the Torre Genome API are blocked by CORS policies.

### 3. Modular Component Architecture
- **Trade-off**: Splitting the UI into many small files (Header, Footer, ProfileCard, ProfileDetail) creates more boilerplate.
- **Decision**: This was chosen to facilitate isolation in unit testing and to allow for future reuse (e.g., using `ProfileCard` in a "Favorites" list).

### 4. Search Result Limit
- **Trade-off**: Results are currently limited to 20 per search for the scope of this assessment to maintain high performance and streaming stability.
- **Decision/Next Steps**: Future enhancements will implement pagination or infinite scroll to allow users to explore the complete talent pool.

## 🔮 Potential Next Steps

### 1. Complete Professional Profiles
Transition from the current "quick-view" modal to full-page professional bios. This would allow for a deeper dive into the talent's "Genome" (skills, experiences, and cultural fit), leveraging the full breadth of the Torre API.

### 2. Messaging & Collaboration
Integrate messaging functionality directly within the Profile Detail view. This could be a direct link to Torre's messaging system or an internal implementation allowing team leads to reach out to talent instantly.

### 3. Authentication & Authorization
Implement a secure login system (e.g., NextAuth.js). This would enable personalized features such as:
- Saving "Shortlisted" talent.
- Personalized recommendation feeds based on the user's role.
- Private "Manager Only" notes on profiles.

### 4. Job Search Integration
Expand the explorer’s utility by adding a dedicated "Jobs" tab. By connecting to Torre's job search endpoints, the platform could serve as a dual-purpose tool for both finding talent and discovering career opportunities within the organization.

### 5. Advanced Filtering
Add filter toggles for locations, specific skills (e.g., React, Python), and availability status to help users narrow down results from the global stream.


## Running NextJs Server Actions

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This is a Next.js project. And you can use the following command to run the develoment server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

