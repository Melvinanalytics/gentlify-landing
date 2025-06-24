# 🛠️ Tech Stack – Pacify Prototype

## Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Zustand (lightweight)
- **Storage**: LocalStorage (child profiles)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Backend/API Stack  
- **LLM API**: OpenAI GPT-4o-mini (cost-optimized)
- **API Routes**: Next.js API routes (/api/chat)
- **Validation**: Zod schemas
- **Rate Limiting**: Built-in Next.js middleware

## Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Vitest + Testing Library
- **Type Checking**: TypeScript strict
- **Dev Server**: Next.js dev server with hot reload

## Deployment & Hosting
- **Platform**: Vercel (seamless Next.js deployment)
- **Domain**: pacify-prototype.vercel.app
- **Local Development**: http://localhost:5174
- **Environment**: Single staging environment
- **Analytics**: Vercel Analytics (built-in)

## Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0", 
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-*": "latest",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "openai": "^4.0.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.294.0"
  }
}
```

## Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s  
- **Time to Interactive**: <3s
- **LLM Response**: <3s
- **Bundle Size**: <500KB gzipped

## Security & Privacy
- **API Keys**: Environment variables only
- **Data Storage**: LocalStorage only (no server storage)
- **HTTPS**: Enforced via Vercel
- **Content Security**: No external scripts except OpenAI

## Development Workflow
1. **Local Development**: `pnpm dev`
2. **Type Check**: `pnpm type-check`  
3. **Linting**: `pnpm lint`
4. **Testing**: `pnpm test`
5. **Build**: `pnpm build`
6. **Deploy**: Push to main → auto-deploy via Vercel 