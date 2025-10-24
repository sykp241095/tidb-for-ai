# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TiDB for AI is a Next.js 14 marketing website showcasing TiDB Cloud's AI and vector database capabilities. It features interactive demonstrations, comprehensive documentation, and educational blog content about vector search, semantic search, and hybrid search functionalities.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture & Key Patterns

### Next.js App Router Structure
- **App Router**: Uses experimental `appDir` with route groups for organization
- **Route Groups**: `about`, `blog`, `docs-new`, `gallery`, `what-is-tidb` organize related pages
- **Dynamic Routes**: Blog posts use `[slug]` pattern with markdown content
- **Metadata**: Centralized in `app/layout.tsx` with SEO optimization

### Content Management System
- **Markdown Blog**: Located in `/content/blogs/` with YAML frontmatter
- **Required Frontmatter**: `title`, `description`, `date`, `author`, `tags`, `category`
- **Blog Processing**: `lib/blog.ts` handles markdown parsing, validation, and filtering
- **Related Posts**: Algorithm scores posts by shared tags and categories

### Component Architecture
- **UI Library**: Custom components in `/components/ui/` using Radix UI primitives
- **Feature Components**: Interactive demonstrations with code examples in `/components/`
- **Code Examples**: Syntax highlighting with copy functionality for Python/SQL examples
- **Architecture Diagrams**: React Flow for visualizing TiDB architecture

### Data Layer
- **Static Data**: Feature definitions, use cases, and navigation in `/data/`
- **Type Safety**: Comprehensive TypeScript definitions in `/types/`
- **Path Aliases**: `@/*` aliases configured in `tsconfig.json` for clean imports
- **Constants**: Application-wide constants in `/lib/constants/`

### Styling & Assets
- **Tailwind CSS**: Custom configuration with design tokens
- **Video Assets**: Optimized delivery with custom headers in `next.config.js`
- **Image Optimization**: Next.js Image component with remote patterns for GitHub assets

## Key Implementation Details

### Blog System (`lib/blog.ts`)
- Validates required frontmatter fields
- Calculates reading time automatically
- Supports featured posts, categories, and tags
- Implements search functionality across title, description, author, and tags
- Related posts algorithm scores by category (3 points) and shared tags (2 points each)

### Feature Showcase (`data/features.ts`)
- Each feature includes icon, description, details, and code examples
- Video demonstrations linked to `/videos/` directory
- GitHub code examples with direct links to repositories
- Color gradients for visual distinction

### Code Examples Component
- Syntax highlighting with `react-syntax-highlighter`
- Copy to clipboard functionality
- Language-specific theming
- Integration with feature demonstrations

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://tidbcloud.com  # For metadata base URL
```

## Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Build Output**: Standard Next.js build
- **Static Assets**: Images, videos, and documentation in `/public/`

## Content Guidelines

### Blog Posts
- Place markdown files in `/content/blogs/`
- Include all required frontmatter fields
- Use proper date format (YYYY-MM-DD)
- Tags should be lowercase and comma-separated
- Categories should be consistent with existing posts

### Feature Updates
- Update `data/features.ts` for new features
- Include video demonstrations in `/public/videos/`
- Link to relevant GitHub repositories
- Maintain consistent code example formatting

### Documentation
- Markdown files in `/docs/` directory (rendered via `docs-new/[slug]` route)
- Use consistent heading structure
- Include code examples where applicable
- Cross-reference with blog content when relevant