# SuperBrain

SuperBrain is a personal knowledge management application where users can create, organize, and share their knowledge easily. It features content creation, tagging, and public sharing of collections.

## Tech Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS
- React Router DOM
- Axios for API requests

## Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/daanish04/SuperBrain-FE.git
cd SuperBrain-FE
```

2. Install Dependencies
```bash
npm install
```

3. Configuration
Create a `config.ts` file inside `/src/`:
```ts
export const API_URL = "https://your-backend.onrender.com";
```

4. Run Locally
```bash
npm run dev
```
Frontend will be available at `http://localhost:5173`

## Example Flow

- `/signup` → User registers
- `/login` → User logs in
- `/dashboard` → User manages content
- `/brain/:shareLink` → Public share page

## Live Demo  
[Visit SuperBrain Live](https://superbrain-chi.vercel.app/)
