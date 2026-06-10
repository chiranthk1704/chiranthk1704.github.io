# Editing your website content

**Every section of the website is controlled by one JSON file in this folder.**
Edit a file, save it, and the site updates instantly (live-reloads in dev mode).

| File              | Section it controls                                      |
| ----------------- | -------------------------------------------------------- |
| `hero.json`       | Name, headline, intro text, hero buttons                  |
| `about.json`      | About paragraphs, Education card, Interests card          |
| `experience.json` | Intro paragraph + every entry on the experience timeline  |
| `projects.json`   | Intro paragraph + every project card                      |
| `resume.json`     | Resume file location and the one-line blurb               |
| `contact.json`    | Intro paragraph + contact links                           |

## JSON formatting rules (read once, saves headaches)

1. All text must be inside double quotes: `"like this"` — never single quotes.
2. Items in a list are separated by commas, but there is **no comma after the
   last item**. A trailing comma is the most common cause of a broken page.
3. If you need a double quote *inside* your text, escape it: `\"`.
4. JSON does not allow comments.
5. If the page goes blank after an edit, you almost certainly have a JSON
   syntax error — the terminal running `npm run dev` will point to the line.

## Common edits

**Add an experience entry** — in `experience.json`, copy one `{ ... }` block
inside `"entries"`, paste it at the top (newest first), edit the fields, and
put the organization logo in `public/images/organizations/`. If the logo file
is missing, an initials badge is shown automatically.

**Add a project** — in `projects.json`, copy a block inside `"entries"`.
The `"image"` field is optional: leave it `""` for no thumbnail, or place a
16:9 image in `public/images/projects/` and set e.g.
`"image": "images/projects/myproject.png"`.

**Add a contact channel** (Google Scholar, Twitter/X, personal site, …) —
in `contact.json`, add a block to `"links"`. Available icons: `mail`,
`linkedin`, `github`, `instagram`, `scholar`, `twitter`, `globe`, `phone`.

**Change the resume PDF** — put the new file in `public/resume/` and update
`"file"` in `resume.json` to match the filename.
