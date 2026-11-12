# Pinellas Connect

This is my website for the 2026–27 FBLA Website Design event. The topic this year is a **Community Resource Website**, so I made a site that helps people in Pinellas County, Florida find things like food pantries, housing help, clinics, job programs, and events.

**All of the listings, events, phone numbers, and map pins are made up.** I used fake data on purpose so nobody gets sent to a real place by mistake. The only real information is on the Emergency page (911, 988, 211, and the county's hurricane links), and I listed where each of those comes from.

## How to open it

The easiest way is to just double-click `index.html`. Everything works except the map, which needs the internet to load.

You can also run it with a small local server:

```
cd fbla-community-hub
python3 -m http.server
```

Then go to http://localhost:8000.

## The pages

- **Home** – a big photo with a search bar, categories, a few resources to start with, a map preview, and emergency phone numbers
- **Resources** – search and filter by category, city, and cost, then save the ones you want
- **Map** – every location on a map, with a list next to it that shows the same places
- **Events** – upcoming events by month; click any event to see the details
- **Saved** – the resources you saved (they stay in your browser), with a print button
- **Emergency** – real numbers to call and official hurricane links
- **About** – why I made the site, how I designed it, how I'd measure if it works, and my sources
- **Contact** – a form you can fill out (it's a demo, so it doesn't actually send anything)

## How the code is set up

I used plain HTML, CSS, and JavaScript. No frameworks.

```
index.html, resources.html, map.html, events.html,
saved.html, emergency.html, about.html, contact.html

css/styles.css     all the styling for every page
js/data.js         all the listings and events
js/main.js         code every page uses (saving, pop-ups, menu, accessibility settings)
js/maptools.js     map helpers
js/home.js, resources.js, map.js, events.js, saved.js, about.js, contact.js
                   code for each page
images/            the logo and the two photos
```

All the content lives in `js/data.js`, so to change a listing or add an event you only have to edit one file.

## Design choices

- Lots of white space and big headings so each page is easy to read
- One blue color for links and buttons, and red only for 911
- The same header, footer, buttons, and lists on every page
- Works on phones, tablets, and computers
- Thin lines between items instead of a lot of boxes

## Accessibility

- An accessibility button in the bottom-left corner of every page, with larger text, high contrast, a reading highlight, and extra spacing. Your settings are saved.
- Everything works with a keyboard, and you can always see where you are
- The map has a list version, so you don't have to use the map
- Search results and saved items get read out by screen readers
- Animations turn off if your device is set to reduce motion

## Measuring success

On the About page I set goals, like having at least 90% of people find a food pantry and save it, and having people find what they need in under 60 seconds. The site also counts a few things in your browser (searches, saves, and "Was this helpful?" votes) so you can see it working.

## Sources and credits

- Home photo: "St. Petersburg Waterfront, Florida 2019" by pasa47 on Wikimedia Commons (CC BY 2.0)
- Emergency photo: Hurricane Milton satellite image from NOAA and CSU/CIRA (public domain)
- Map: Leaflet and OpenStreetMap
- Font: Inter by Rasmus Andersson
- Emergency info: Pinellas County Emergency Management, the National Hurricane Center, the National Weather Service, FEMA, the 988 Lifeline, and First Contact 211
- The design research I used (Nielsen Norman Group, WCAG 2.2, and others) is listed on the About page
- I made the logo and icons myself

This is a student project. It's not connected to Pinellas County Government.
