# Riverbend Connect — FBLA Website Design 2026–2027

A community resource website built with plain **HTML, CSS, and JavaScript**: no frameworks, no installation, and no build step.

> **Demo notice:** Riverbend is a fictional town. All organizations, addresses, phone numbers (555-01XX), and events are sample data. The 911, 988, and 211 numbers are real national services.

---

## How to run it

1. Open the `fbla-community-hub` folder.
2. Double-click `index.html`. It opens in any browser (Chrome, Safari, Edge, Firefox).

The site doesn't need a server or an internet connection. Without internet, it uses a backup system font instead of Atkinson Hyperlegible, and everything else works the same.

**Live site (Vercel):** the GitHub repo is connected to Vercel, so every push to `main` redeploys automatically. Because this folder sits inside the repo (not at its root), `vercel.json` at the repo root rewrites every URL to `fbla-community-hub/`, and `.vercelignore` keeps unrelated folders out of the deployment.

---

## File structure

```
fbla-community-hub/
├── index.html        Home: hero search, categories, featured resources, events
├── resources.html    Resource Directory with search + filters
├── events.html       Community Events with filters
├── saved.html        The user's saved (favorite) resources + print
├── about.html        Mission, planning process, design decisions, accessibility,
│                     success metrics, sources & credits
├── contact.html      Feedback / suggest-a-resource form with validation
├── css/styles.css    ALL styling for every page (one file = consistent design)
├── images/           logo.svg and hero.svg (original artwork)
└── js/
    ├── data.js       ALL the content: categories, resources, events
    ├── main.js       Shared code used on every page
    ├── home.js       Fills in the home page
    ├── resources.js  Search, filters, and sorting
    ├── events.js     Event filters
    ├── saved.js      Saved list, print, clear
    ├── about.js      Displays the live metrics table
    └── contact.js    Form validation
```

Every page loads scripts in this order: `data.js` → `main.js` → the page's own script. That way the data exists before any code tries to use it.

---

## How the code works

### Storing and displaying resources
- `data.js` holds three **arrays of objects**: `categories`, `resources`, and `events`. Each resource is an object with fields like `name`, `category`, `phone`, `hours`, `cost`, and `audience`.
- `createResourceCard(resource)` in `main.js` takes one resource object and returns its HTML as a **template string** (backticks with `${...}`). Every page uses this same function, so all cards look the same.
- To show a list, the page loops over the array with `forEach`, adds up the card HTML, and puts it on the page with `innerHTML`.

### Search and filters (`resources.js`)
`showResults()` is the main function. It runs every time any control changes:
1. **Filter:** `resources.filter(...)` keeps a resource only if it passes *all four* tests: the search text appears in the name, description, or category; the category matches; the audience matches; and it's free (when "Free only" is checked).
2. **Sort:** `matches.sort(...)` with `localeCompare` sorts by name A–Z, and `.reverse()` flips it for Z–A.
3. **Display:** builds the cards and updates "Showing X of 20 resources". That line has `aria-live="polite"`, so screen readers announce it.
4. If nothing matches, it shows the "No resources match" message with a link to 211.

**URL parameters:** links like `resources.html?category=food` or the home-page search (`?search=rent`) are read with `URLSearchParams`, so the page opens with that filter already applied. The home-page search box is a plain HTML `<form method="get">`, so it needs no JavaScript.

### Favorites (`main.js`)
- Saved resource ids are stored in **localStorage** as a list, e.g. `[1, 5, 12]`. `JSON.stringify` turns the list into text to save it, and `JSON.parse` turns it back into a list.
- `toggleFavorite(id)` adds or removes an id. The Save button uses `aria-pressed="true/false"` so screen readers announce whether it's saved.
- One `document.addEventListener("click", ...)` handles every "View details" and "Save" button on every page. This is called **event delegation**: it works even for cards that are created after the page loads.

### Details pop-up
Uses the built-in HTML `<dialog>` element. `dialog.showModal()` opens it. The browser automatically traps keyboard focus inside and closes it with Escape, which gives you an accessible pop-up with very little code.

### Events always look "upcoming"
Each event has `daysFromToday` instead of a fixed date. `getEventDate()` adds that many days to today's date. This keeps the demo from showing past events, whether you present in February or June.

### Success metrics (`trackEvent` in `main.js`)
`trackEvent("searches")` adds 1 to a counter saved in localStorage. The site counts searches, zero-result searches, filters used, details opened, saves, phone taps, helpful/not-helpful votes, prints, and contact forms. The About page reads these counters and shows them in a table, plus two calculated percentages. On a real site, a tool like Google Analytics 4 or Plausible would do this for all visitors.

### Contact form (`contact.js`)
`novalidate` turns off the browser's pop-up bubbles so the page can show its own clear error messages under each field. A **regular expression** checks the email format. Invalid fields get `aria-invalid="true"` and keyboard focus moves to the first error. The thank-you message uses `textContent` (not `innerHTML`) for the user's name, which is safer for text a user types.

### Responsive design (`styles.css`)
- The CSS is **mobile-first**: the basic styles are for phones, and two `@media (min-width: ...)` sections add tablet (640px+) and desktop (960px+) layouts.
- Layouts use **CSS Grid**. For example, `.card-grid` has 1 column on phones, 2 on tablets, and 3 on desktops.
- On phones, the navigation hides behind a **Menu** button. `setupMenu()` toggles the class `open` and updates `aria-expanded`.
- **CSS variables** at the top (`--primary`, `--accent`, ...) control every color, so changing one line re-colors the whole site.
- "Larger text" adds the class `large-text` to `<html>`, which raises the base font size. Because sizes use `rem` units, everything scales together.

---

## How to customize

| To change... | Edit... |
|---|---|
| Resources, events, categories | `js/data.js` (copy an object, keep the same fields, give it a new `id`) |
| Colors | the `:root` variables at the top of `css/styles.css` |
| Featured resources on the home page | `featuredIds` in `js/home.js` |
| Town name | search all files for "Riverbend" |
| Navigation links | the `<nav>` in **every** HTML file (they must stay identical) |

**Strong suggestion:** replace the sample data with **real, verified organizations from your own community**, and cite where you verified each one (official websites, a phone call, your county's 211 listing). Real local content is much more convincing to judges than a fictional town. If you do this, also update the demo notices in the footer and on the About page.

---

## 7-minute presentation outline

| Time | Section | Show on screen |
|---|---|---|
| 0:00–0:45 | **Problem and audience.** Resources are scattered; families, seniors, students, and new residents struggle to find help. | Home page |
| 0:45–2:00 | **Planning and development.** Five-step process; sitemap and wireframes (bring printed sketches as visual aids); why plain HTML/CSS/JS. | About → "How we planned" |
| 2:00–4:30 | **Live demo.** Hero search "rent" → filter chips → Free only → View details → Helpful vote → Save → Saved page → Print. Events filters. Contact form errors. | Resources, Saved, Events, Contact |
| 4:30–5:30 | **Design and accessibility.** Font, colors and contrast ratios, Tab through with the keyboard (skip link, focus outline), Larger text button, resize to phone width. | Any page + a phone/tablet |
| 5:30–6:30 | **Metrics.** KPI table using the industry terms; then the live demo table showing the actions you just performed. | About → "How we measure success" |
| 6:30–7:00 | **What makes it stand out + close.** | Home page |

**Backup plan:** the site runs offline from local files. Keep a copy on the laptop *and* a USB drive, and open it on a phone and tablet beforehand (the rubric rewards "more than 2 platforms").

**Before you present:** reset the demo metrics and clear saved resources so your live demo starts from zero.

### Likely Q&A questions
- *Why no framework?* Faster loading, nothing to install, works offline, and every line is understandable and maintainable.
- *How would you get real data?* Partner with the local United Way/211, the library, and the city; add an admin review step for "Suggest a resource" submissions.
- *Is localStorage private?* Yes. It stays in that one browser and is never sent anywhere. The downside is that saved lists don't sync between devices.
- *What would you add next?* Spanish translation, a map view, an "Open now" filter, and a real backend for form submissions.
- *How do you know it's accessible?* Contrast ratios meet WCAG 2.2 AA (4.5:1), keyboard-only testing, semantic HTML, labeled inputs, and aria-live announcements.

---

## Color contrast (checked with the WCAG formula)

| Pair | Ratio | WCAG AA needs |
|---|---|---|
| Body text #1D2A30 on #F8F7F3 | 13.7:1 | 4.5:1 |
| White on teal button #0B6E69 | 6.1:1 | 4.5:1 |
| Gray text #4F5D63 on white | 6.8:1 | 4.5:1 |
| Dark text on amber button #F4B942 | 8.3:1 | 4.5:1 |
| Amber on footer #0E3B43 | 6.9:1 | 4.5:1 |
| Error red #B42318 on white | 6.6:1 | 4.5:1 |
