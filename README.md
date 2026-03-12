# Next.js Frontend Assignment

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- App Router Route Handlers

## Setup

1. Install dependencies
   - `npm install`
2. Start the development server
   - `npm run dev`
3. Open `http://localhost:3000`

## Git Workflow

- Follow the contribution guidelines in `CONTRIBUTING.md`
- Use focused branches and meaningful commits
- Use `.github/PULL_REQUEST_TEMPLATE.md` when opening PRs
- Optional: enable the commit template locally with:
  - `git config commit.template .gitmessage.txt`

## Features

- Local API using `app/api/products/route.ts`
- Pagination support
- Debounced search
- Category filtering by medical issue
- Sorting by patient name, age, and patient ID
- Card view and row/table view toggle
- Loading and error states
- Reusable component-based UI

## API Query Params

- `page` → page number
- `limit` → records per page
- `search` → search by patient name, ID, issue, or contact fields
- `category` → filter by medical issue
- `sort` → `patient_name`, `age`, or `patient_id`
- `order` → `asc` or `desc`

## Project Structure

- `app/page.tsx` → main frontend page
- `app/api/products/route.ts` → route handler API
- `app/components/*` → reusable UI components
- `data/data.json` → local patient dataset
- `types/product.ts` → shared TypeScript types

## Notes

The UI is inspired by a patient directory dashboard and uses a local JSON dataset with 1000 records.
