# Pinellas Connect — FBLA Website Design 2026–2027

A community resource website for **Pinellas County, Florida**, built with plain **HTML, CSS, and JavaScript**: no frameworks, no installation, and no build step.

Every organization and event is **real**. Each listing was checked against the organization's own website or an official government page, and it shows the date it was verified and a link to the source.

> Pinellas Connect is an independent student project. It is not affiliated with Pinellas County Government or any listed organization.

---

## How to run it

- **Live site:** the GitHub repo is connected to Vercel, so every push to `main` redeploys automatically. Because this folder sits inside the repo (not at its root), `vercel.json` at the repo root serves `fbla-community-hub/` at the site's root URL, and `.vercelignore` keeps unrelated folders out of the deployment.
- **On a laptop:** double-click `index.html`. The directory, search, filters, saved list, and emergency page all work offline. The map needs internet for its map tiles; offline, the Map page automatically switches to its list view.

---

## Pages

| Page | What it does |
|---|---|
| `index.html` | Hero search, category tiles, "Start here" services, map preview, compact urgent-help section |
| `resources.html` | Directory with search, 12 category chips, city filter, "Free only", sorting. Filters can be shared through the URL (`?search=&category=&city=`) |
| `map.html` | Interactive Leaflet map with category/city/search filters, preview cards, directions, click-to-call, and a full list view |
| `events.html` | Verified upcoming events with type and city filters. Events disappear automatically when they end, and an empty state links to official calendars |
| `emergency.html` | Hurricane and disaster resources: tappable emergency numbers, plus official links grouped into Before / Flooding / During / After |
| `saved.html` | Saved resources (stored in this browser) with printing |
| `about.html` | Mission, how data is maintained, collapsible source tables, and project notes (KPIs, live metrics demo, build details) |
| `contact.html` | Suggest a resource or report outdated info, with form validation |

## File structure

```
fbla-community-hub/
├── *.html            8 pages (header, nav, and footer are identical on every page)
├── css/styles.css    ALL styling: design tokens at the top, mobile-first
├── images/logo.svg   Original logo
└── js/
    ├── data.js       ALL content: cities, categories, resources, events, event sources
    ├── main.js       Shared code: icons, storage, favorites, cards, details dialog, metrics
    ├── maptools.js   Shared map helpers (tile layer + pins)
    ├── home.js       Home page
    ├── resources.js  Directory search + filters
    ├── map.js        Map page
    ├── events.js     Events page
    ├── saved.js      Saved list
    ├── emergency.js  Emergency organizations list
    ├── about.js      Metrics demo + source tables
    └── contact.js    Form validation
```

Script order on every page: `data.js` → `main.js` → (Leaflet + `maptools.js` on Home/Map) → the page's own script.

---

## How the data works (`js/data.js`)

Each resource is an object like this:

```js
{
  id: "hope-villages-food",
  name: "Hope Villages of America — Food Distribution Center",
  categories: ["food"],                    // first = main category
  area: "countywide",                      // or "unstated"
  locations: [{ label, address, city, lat, lng, geocoder: "OSM" }],
  phones: [{ label, number }],
  website, hours, eligibility, cost, free, urgent,
  source: "https://…",                     // the page we checked
  verified: "2026-11-09"
}
```

**Accuracy rules:**
- If the source didn't say something, the field says **"Not listed."** Nothing was guessed.
- `area: "countywide"` only when the source says the organization serves all of Pinellas (or it's a county or state agency). Otherwise it's `"unstated"`, and the card says "call to confirm area."
- **Coordinates** come from geocoding each verified address with OpenStreetMap Nominatim or the U.S. Census Bureau Geocoder. Addresses that couldn't be matched to a building are not mapped.
- **Domestic violence services are intentionally not mapped.**

**City filter logic** (`servesCity()` in `main.js`): a resource appears for a city if it serves the whole county, has a location in that city, or doesn't state an area and has no physical location.

**Events** use real start and end times (`"2026-11-10T10:00:00-05:00"`). `upcomingEvents()` hides any event whose end time has passed, so the site never shows an expired event as upcoming.

### ⚠️ Keeping it current (important before you present)

- **Events expire.** The events verified on Nov 9, 2026 all end by Nov 17, 2026. After that, the Events page shows its empty state with official calendars. Before presenting, check the sources listed in `eventSources` and add new events with the same fields.
- **Re-verify listings** every few months: open each `source`, update anything that changed, and set `verified` (and `LAST_VERIFIED`) to the new date.

---

## Key features explained

- **Search + filters** (`resources.js`): `filter()` keeps a resource only if it passes all four tests (search text, category, city, and free). Results update as you type, and the count is announced to screen readers through `aria-live`.
- **Map** (`map.js`): uses [Leaflet](https://leafletjs.com) with OpenStreetMap tiles. Google Maps and Mapbox require an API key and a billing account; this setup needs neither. Organizations at the same address share one pin with a number on it. The list view shows the same results, so nothing is map-only.
- **Favorites** (`main.js`): saved ids are stored in `localStorage`. All storage access is wrapped in try/catch, so the site still works when storage is blocked.
- **Details dialog**: the native `<dialog>` element traps focus and closes with Escape.
- **Design**: Apple-inspired. It uses the system font (San Francisco on Apple devices, with Inter as fallback), large tight headlines, frosted-glass navigation, soft shadows, and gentle scroll-reveal animations that turn off under `prefers-reduced-motion`. The palette is deep Gulf blue, sea glass, and warm sand.

---

## 7-minute presentation outline

| Time | Section | Show on screen |
|---|---|---|
| 0:00–0:45 | **Problem:** Pinellas services are spread across dozens of sites, and a peninsula county needs hurricane info in one place. | Home |
| 0:45–1:45 | **Accuracy:** official sources only, verified dates, "Not listed" instead of guesses, geocoded pins. | About → How we verify, source table |
| 1:45–4:15 | **Live demo:** hero search "food" + Palm Harbor → Details → Save → Map (filter Clearwater, tap a pin, Directions) → List view → Saved → Print | Resources, Map, Saved |
| 4:15–5:00 | **Emergency page:** tap-to-call tiles, Know Your Zone, no fake live data. | Emergency (on a phone) |
| 5:00–5:45 | **Design & accessibility:** keyboard tour, Larger text, reduced motion, phone layout. | Any page + phone |
| 5:45–6:30 | **Metrics:** KPI table, then the live counters from your demo. | About → Metrics |
| 6:30–7:00 | **Close.** | Home |

**Before you present:** update events, reset demo metrics, and clear saved resources.

### Likely Q&A
- *How do you know the info is accurate?* Every listing links to the official page we checked and shows the date we checked it. Where the source was silent, we say so.
- *Why no Google Maps?* It requires an API key and billing. Leaflet + OpenStreetMap is free and open, and the list view works without the map.
- *What would you add next?* Spanish and Vietnamese translations (the county's hurricane guide already comes in both), an "Open now" filter, and an admin workflow to re-verify listings on a schedule.
