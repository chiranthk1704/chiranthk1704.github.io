# Chiranth K — Personal Academic Website

A minimal, research-focused personal website. Built with React + Vite.
Dark mode by default, with a persistent light/dark toggle.

## Editing content

**All content lives in `src/content/` as plain JSON files — one file per
section. You never need to touch components to update the site.**

| File                          | Section it controls                                  |
| ----------------------------- | ---------------------------------------------------- |
| `src/content/hero.json`       | Name, headline, intro, hero buttons                  |
| `src/content/about.json`      | About paragraphs, Education card, Interests card     |
| `src/content/experience.json` | Experience timeline (intro + entries)                |
| `src/content/projects.json`   | Project cards (intro + entries)                      |
| `src/content/resume.json`     | Resume file location and blurb                       |
| `src/content/contact.json`    | Contact links (intro + entries)                      |

See **`src/content/README.md`** for field-by-field instructions and JSON
formatting rules.

### Adding images

- **Organization logos** → put square images in `public/images/organizations/`
  and reference them via the `logo` field in `experience.json` (or the
  education logo in `about.json`). A clean initials badge is shown
  automatically if a logo is missing.
- **Project thumbnails** → put 16:9 images in `public/images/projects/`
  and set the `image` field in `projects.json`. Cards render fine without one.
- **Resume PDF** → put the file in `public/resume/` and make sure
  `file` in `resume.json` matches the filename.

## Running locally

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Personal academic website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. In the repository on GitHub, go to **Settings → Pages** and set
   **Build and deployment → Source** to **"GitHub Actions"**.

3. Done. The included workflow (`.github/workflows/deploy.yml`) builds and
   publishes the site automatically on every push to `main`.

The site will be available at `https://<your-username>.github.io/<repo-name>/`.
Because the Vite `base` is set to `"./"` (relative paths), no configuration
changes are needed regardless of the repository name.

## Project structure

```
public/
├── images/
│   ├── organizations/   # logos for the experience timeline / education
│   └── projects/        # optional project thumbnails
└── resume/              # resume PDF goes here

src/
├── content/             # ← ALL editable content (JSON, one file per section)
├── components/          # one component per section + small shared pieces
├── pages/
│   └── Home.jsx         # assembles the sections in order
├── styles/
│   └── global.css       # theme tokens + all styling
├── App.jsx              # theme state (dark default, persisted)
├── main.jsx             # entry point
└── utils.js             # asset path helper
```
