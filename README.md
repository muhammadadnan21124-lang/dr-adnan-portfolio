# Dr. Adnan Hasan — Portfolio

A dark, futuristic dental portfolio inspired by the supplied reference image.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy with GitHub + Vercel

1. Create a new GitHub repository.
2. Upload this project.
3. Import the repository into Vercel.
4. Vercel will build it automatically with `npm run build`.
5. Every push to the main branch triggers a new deployment.

## Updating your information

### Easiest / permanent method
Edit:

`lib/site-data.ts`

Change your name, title, bio, stats, social links, research, certificates, etc. Commit + push to GitHub. Vercel redeploys automatically.

### Quick browser editor
Visit:

`/admin`

The editor stores changes in your browser's localStorage. It is useful for testing and preparing content, but it is NOT a shared cloud database. For permanent public changes, update `lib/site-data.ts` and push to GitHub.

## Images

Replace these files inside `public/` with your own images:

- `profile.png`
- `tooth-hero.png`
- `clinical-1.png` through `clinical-5.png`

Keep the same filenames and the website will use the new images automatically.

## CV

Replace `public/cv.pdf` with your real CV. The Download CV button already points there.

## Important

The contact form opens the visitor's email client using `mailto:`. This avoids exposing a secret API key. If you want a real online form that stores messages, connect Formspree, Resend, or a database later.
