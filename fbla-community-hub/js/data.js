/* =========================================================
   data.js: all of the website's content lives here.
   ---------------------------------------------------------
   DEMO DATA. Every organization, event, phone number, and map
   pin in this file is FICTIONAL. It was written for the FBLA
   Website Design project so the site can be judged without
   sending anyone to a real service by mistake.

   - Phone numbers use the 555-0100 to 555-0199 range, which is
     reserved for fiction.
   - Map pins sit near the center of each real Pinellas city.
     They are not real addresses.
   - There are no fictional crisis lines. Real emergency help
     (911, 988, 211, county evacuation info) lives only on the
     Emergency page and in the site header and footer, and it
     links to official sources.

   City and category names are real so the site's filters make
   sense for Pinellas County.
   ========================================================= */


// The communities used by the location filter.
const cities = [
  "St. Petersburg", "Clearwater", "Largo", "Pinellas Park", "Dunedin",
  "Tarpon Springs", "Palm Harbor", "Safety Harbor", "Seminole", "Oldsmar",
  "Gulfport", "Treasure Island", "Madeira Beach", "St. Pete Beach", "East Lake"
];

// Resource categories. "icon" is a key in the ICONS object in main.js.
const categories = [
  { id: "food",           name: "Food", short: "Food",                 icon: "food",           color: "#E0761B" },
  { id: "housing",        name: "Housing & Shelter", short: "Housing",    icon: "housing",        color: "#2F6FDB" },
  { id: "health",         name: "Health & Mental Health", short: "Health", icon: "health",       color: "#D93A5B" },
  { id: "jobs",           name: "Jobs & Careers", short: "Jobs",       icon: "jobs",           color: "#7A4FD6" },
  { id: "education",      name: "Education", short: "Education",            icon: "education",      color: "#1D8A6F" },
  { id: "seniors",        name: "Seniors", short: "Seniors",              icon: "seniors",        color: "#B8691E" },
  { id: "transportation", name: "Transportation", short: "Transportation",       icon: "transportation", color: "#0A84A8" },
  { id: "disability",     name: "Disability & Access", short: "Disability",  icon: "disability",     color: "#4C5FD5" },
  { id: "family",         name: "Family & Childcare", short: "Family",   icon: "family",         color: "#C2448F" },
  { id: "emergency",      name: "Emergency & Disaster", short: "Emergency", icon: "emergency",      color: "#C4281C" },
  { id: "financial",      name: "Financial & Legal", short: "Money & Legal",    icon: "financial",      color: "#2E7D32" },
  { id: "veterans",       name: "Veterans", short: "Veterans",             icon: "veterans",       color: "#34507A" }
];

/* ---------------------------------------------------------
   Resource fields
   id          unique text id (used in saved lists)
   name        organization or program name (fictional)
   categories  one or more category ids (first = main category)
   description what it offers, in plain language
   area        "countywide" = serves all of Pinellas County
               "local"     = serves the area around its location
   areaNote    extra detail about who or where it serves
   locations   [{ label, address, city, lat, lng }] (may be empty)
   phones      [{ label, number }]: the first is the main number
   hours, eligibility, cost
   free        true when the service is free
   --------------------------------------------------------- */
const resources = [
  /* ---------- Food ---------- */
  {
    id: "harbor-table-pantry",
    name: "Harbor Table Food Pantry",
    categories: ["food"],
    description: "Walk-in food pantry with fresh produce, canned goods, and bread. No appointment needed.",
    area: "local",
    areaNote: "Serves Largo and nearby neighborhoods.",
    locations: [{ label: "Pantry", address: "Largo, FL", city: "Largo", lat: 27.9095, lng: -82.7873 }],
    phones: [{ label: "Pantry line", number: "(727) 555-0101" }],
    hours: "Tue and Thu 9 a.m.–12 p.m.; Sat 9–11 a.m.",
    eligibility: "Anyone in need (bring a photo ID if you have one)",
    cost: "Free",
    free: true
  },
  {
    id: "sunrise-community-pantry",
    name: "Sunrise Community Pantry",
    categories: ["food", "family"],
    description: "Food pantry with a weekly family box and a baby supplies shelf.",
    area: "local",
    areaNote: "Serves St. Petersburg.",
    locations: [{ label: "Pantry", address: "St. Petersburg, FL", city: "St. Petersburg", lat: 27.7710, lng: -82.6600 }],
    phones: [{ label: "Main line", number: "(727) 555-0102" }],
    hours: "Mon, Wed, and Fri 10 a.m.–2 p.m.",
    eligibility: "St. Petersburg residents",
    cost: "Free",
    free: true
  },
  {
    id: "northshore-food-pantry",
    name: "North Shore Food Pantry",
    categories: ["food"],
    description: "Drive-up pantry with pre-packed grocery boxes. Stay in your car and staff will load your trunk.",
    area: "local",
    areaNote: "Serves Tarpon Springs and north county.",
    locations: [{ label: "Drive-up pantry", address: "Tarpon Springs, FL", city: "Tarpon Springs", lat: 28.1461, lng: -82.7568 }],
    phones: [{ label: "Main line", number: "(727) 555-0103" }],
    hours: "Second and fourth Saturday, 8–10 a.m.",
    eligibility: "Anyone in need",
    cost: "Free",
    free: true
  },
  {
    id: "palm-harbor-cupboard",
    name: "Palm Harbor Community Cupboard",
    categories: ["food", "seniors"],
    description: "Small food pantry with a senior shopping hour and home delivery for homebound neighbors.",
    area: "local",
    areaNote: "Serves Palm Harbor and East Lake.",
    locations: [{ label: "Cupboard", address: "Palm Harbor, FL", city: "Palm Harbor", lat: 28.0781, lng: -82.7637 }],
    phones: [{ label: "Main line", number: "(727) 555-0104" }],
    hours: "Thu 1–5 p.m.; seniors-only hour 1–2 p.m.",
    eligibility: "Palm Harbor and East Lake residents",
    cost: "Free",
    free: true
  },
  {
    id: "gulfside-mobile-market",
    name: "Gulfside Mobile Food Market",
    categories: ["food"],
    description: "A food truck that brings free groceries to a different neighborhood each week. Call for this week's stop.",
    area: "countywide",
    locations: [],
    phones: [{ label: "Schedule line", number: "(727) 555-0105" }],
    hours: "Weekdays; the stop changes each week",
    eligibility: "Anyone in need",
    cost: "Free",
    free: true
  },
  {
    id: "clearwater-meal-share",
    name: "Clearwater Meal Share",
    categories: ["food", "housing"],
    description: "Free hot lunch every day in a dining hall. Showers and mail service are available too.",
    area: "local",
    areaNote: "Serves Clearwater.",
    locations: [{ label: "Dining hall", address: "Clearwater, FL", city: "Clearwater", lat: 27.9600, lng: -82.7700 }],
    phones: [{ label: "Main line", number: "(727) 555-0106" }],
    hours: "Daily 11 a.m.–1 p.m.",
    eligibility: "Anyone",
    cost: "Free",
    free: true
  },

  /* ---------- Housing ---------- */
  {
    id: "bayview-housing-help",
    name: "Bayview Housing Help Center",
    categories: ["housing", "financial"],
    description: "One-time help with rent, deposits, and utility bills, plus help finding housing.",
    area: "countywide",
    locations: [{ label: "Office", address: "Pinellas Park, FL", city: "Pinellas Park", lat: 27.8428, lng: -82.6995 }],
    phones: [{ label: "Intake", number: "(727) 555-0107" }],
    hours: "Mon–Fri 8:30 a.m.–4:30 p.m.",
    eligibility: "Pinellas residents with a past-due notice and low household income",
    cost: "Free to apply",
    free: true
  },
  {
    id: "pelican-family-shelter",
    name: "Pelican Family Shelter",
    categories: ["housing", "family"],
    description: "Short-term shelter for families with children, with case managers who help find a home.",
    area: "countywide",
    locations: [{ label: "Shelter", address: "Clearwater, FL", city: "Clearwater", lat: 27.9400, lng: -82.7500 }],
    phones: [{ label: "Intake", number: "(727) 555-0108" }],
    hours: "Intake calls Mon–Fri 9 a.m.–5 p.m.",
    eligibility: "Families with children who have no safe place to stay",
    cost: "Free",
    free: true
  },

  /* ---------- Health ---------- */
  {
    id: "coastline-community-clinic",
    name: "Coastline Community Clinic",
    categories: ["health"],
    description: "Primary care, check-ups, and vaccines. Fees are based on income.",
    area: "countywide",
    locations: [{ label: "Clinic", address: "St. Petersburg, FL", city: "St. Petersburg", lat: 27.7900, lng: -82.6800 }],
    phones: [{ label: "Appointments", number: "(727) 555-0109" }],
    hours: "Mon–Fri 8 a.m.–6 p.m.",
    eligibility: "Anyone; uninsured patients welcome",
    cost: "Sliding scale based on income",
    free: false
  },
  {
    id: "tidewater-counseling",
    name: "Tidewater Counseling Center",
    categories: ["health", "family"],
    description: "Counseling for adults, teens, and families, with evening appointments.",
    area: "local",
    areaNote: "Serves mid-county.",
    locations: [{ label: "Office", address: "Largo, FL", city: "Largo", lat: 27.9000, lng: -82.7700 }],
    phones: [{ label: "Appointments", number: "(727) 555-0110" }],
    hours: "Mon–Thu 9 a.m.–8 p.m.; Fri 9 a.m.–5 p.m.",
    eligibility: "Ages 12 and up",
    cost: "Sliding scale based on income",
    free: false
  },

  /* ---------- Jobs and education ---------- */
  {
    id: "bayside-career-launch",
    name: "Bayside Career Launch",
    categories: ["jobs", "education"],
    description: "Free resume help, interview practice, and job leads. Computers are open for job searching.",
    area: "countywide",
    locations: [{ label: "Career center", address: "Clearwater, FL", city: "Clearwater", lat: 27.9750, lng: -82.7450 }],
    phones: [{ label: "Main line", number: "(727) 555-0111" }],
    hours: "Mon–Fri 9 a.m.–4 p.m.",
    eligibility: "Job seekers ages 16 and up",
    cost: "Free",
    free: true
  },
  {
    id: "palm-leaf-learning",
    name: "Palm Leaf Adult Learning Center",
    categories: ["education"],
    description: "GED prep, English classes, and basic computer skills for adults.",
    area: "local",
    areaNote: "Serves north county.",
    locations: [{ label: "Learning center", address: "Dunedin, FL", city: "Dunedin", lat: 28.0190, lng: -82.7700 }],
    phones: [{ label: "Enrollment", number: "(727) 555-0112" }],
    hours: "Mon–Thu 9 a.m.–8 p.m.",
    eligibility: "Adults 18 and up",
    cost: "Free",
    free: true
  },

  /* ---------- Seniors, transportation, disability ---------- */
  {
    id: "golden-shores-senior-center",
    name: "Golden Shores Senior Center",
    categories: ["seniors", "food"],
    description: "Daily lunch, fitness classes, and help with Medicare questions for adults 60 and up.",
    area: "local",
    areaNote: "Serves Seminole and nearby beaches.",
    locations: [{ label: "Senior center", address: "Seminole, FL", city: "Seminole", lat: 27.8398, lng: -82.7912 }],
    phones: [{ label: "Front desk", number: "(727) 555-0113" }],
    hours: "Mon–Fri 8 a.m.–3 p.m.",
    eligibility: "Adults 60 and up",
    cost: "Free; lunch donations welcome",
    free: true
  },
  {
    id: "rideready-shuttle",
    name: "RideReady Community Shuttle",
    categories: ["transportation", "seniors", "disability"],
    description: "Door-to-door rides to medical visits and grocery stores. Book two days ahead.",
    area: "countywide",
    locations: [],
    phones: [{ label: "Booking", number: "(727) 555-0114" }],
    hours: "Booking line Mon–Fri 7 a.m.–5 p.m.",
    eligibility: "Seniors and people with disabilities who can't drive",
    cost: "$2 per ride",
    free: false
  },
  {
    id: "open-door-access",
    name: "Open Door Access Services",
    categories: ["disability"],
    description: "Benefits help, assistive technology demos, and job coaching for people with disabilities.",
    area: "countywide",
    locations: [{ label: "Office", address: "Pinellas Park, FL", city: "Pinellas Park", lat: 27.8550, lng: -82.7150 }],
    phones: [{ label: "Main line", number: "(727) 555-0115" }],
    hours: "Mon–Fri 9 a.m.–5 p.m.",
    eligibility: "People with disabilities and their families",
    cost: "Free",
    free: true
  },

  /* ---------- Family, emergency, money, veterans ---------- */
  {
    id: "little-steps-childcare",
    name: "Little Steps Child Care Aid",
    categories: ["family", "financial"],
    description: "Helps working parents pay for child care and find licensed providers.",
    area: "countywide",
    locations: [{ label: "Office", address: "Safety Harbor, FL", city: "Safety Harbor", lat: 27.9908, lng: -82.6932 }],
    phones: [{ label: "Parent line", number: "(727) 555-0116" }],
    hours: "Mon–Fri 8 a.m.–5 p.m.",
    eligibility: "Working parents with children under 13 and low household income",
    cost: "Free to apply",
    free: true
  },
  {
    id: "storm-ready-neighbors",
    name: "Storm Ready Neighbors",
    categories: ["emergency", "seniors"],
    description: "Volunteers who help seniors make a storm plan and build a supply kit before hurricane season.",
    area: "countywide",
    locations: [{ label: "Volunteer hub", address: "Gulfport, FL", city: "Gulfport", lat: 27.7484, lng: -82.7034 }],
    phones: [{ label: "Volunteer desk", number: "(727) 555-0117" }],
    hours: "Mon–Sat 9 a.m.–3 p.m.",
    eligibility: "Seniors and people who live alone",
    cost: "Free",
    free: true
  },
  {
    id: "clear-path-clinic",
    name: "Clear Path Tax & Legal Clinic",
    categories: ["financial"],
    description: "Free tax filing and short legal advice on leases, debt, and benefits.",
    area: "countywide",
    locations: [{ label: "Clinic", address: "St. Petersburg, FL", city: "St. Petersburg", lat: 27.7650, lng: -82.6450 }],
    phones: [{ label: "Appointments", number: "(727) 555-0118" }],
    hours: "Tue and Thu 4–8 p.m.",
    eligibility: "Households with low or moderate income",
    cost: "Free",
    free: true
  },
  {
    id: "anchor-veterans-center",
    name: "Anchor Veterans Resource Center",
    categories: ["veterans", "jobs"],
    description: "Help with VA benefit claims, job searches, and peer support groups for veterans and families.",
    area: "countywide",
    locations: [{ label: "Resource center", address: "Oldsmar, FL", city: "Oldsmar", lat: 28.0342, lng: -82.6651 }],
    phones: [{ label: "Main line", number: "(727) 555-0119" }],
    hours: "Mon–Fri 9 a.m.–4 p.m.",
    eligibility: "Veterans and their families",
    cost: "Free",
    free: true
  }
];


/* ---------------------------------------------------------
   Events (fictional). Times are Eastern Time. Once an event's
   end time has passed it moves to "Past events" on the Events page.
   --------------------------------------------------------- */
const events = [
  { id: "ev-school-supplies", title: "Back-to-School Supply Drive", type: "Resource Fair",
    start: "2026-08-08T09:00:00-04:00", end: "2026-08-08T12:00:00-04:00",
    location: "Little Steps Child Care Aid", city: "Safety Harbor", organizer: "Little Steps Child Care Aid",
    description: "Free backpacks and school supplies for students, while supplies last.", cost: "Free" },
  { id: "ev-fall-food-drive", title: "Fall Food Drive", type: "Food Distribution",
    start: "2026-10-24T09:00:00-04:00", end: "2026-10-24T12:00:00-04:00",
    location: "Sunrise Community Pantry", city: "St. Petersburg", organizer: "Sunrise Community Pantry",
    description: "Drop off canned goods or pick up a free grocery box.", cost: "Free" },
  { id: "ev-harbor-holiday", title: "Holiday Grocery Distribution", type: "Food Distribution",
    start: "2026-11-21T09:00:00-05:00", end: "2026-11-21T12:00:00-05:00",
    location: "Harbor Table Food Pantry", city: "Largo", organizer: "Harbor Table Food Pantry",
    description: "Holiday meal boxes while supplies last. One box per household.", cost: "Free" },
  { id: "ev-career-resume", title: "Resume Workshop", type: "Workshop",
    start: "2026-12-05T10:00:00-05:00", end: "2026-12-05T11:30:00-05:00",
    location: "Bayside Career Launch", city: "Clearwater", organizer: "Bayside Career Launch",
    description: "Bring a draft or start from scratch. Laptops provided.", cost: "Free" },
  { id: "ev-family-fair", title: "Family Resource Fair", type: "Resource Fair",
    start: "2027-02-13T10:00:00-05:00", end: "2027-02-13T14:00:00-05:00",
    location: "Sunrise Community Pantry", city: "St. Petersburg", organizer: "Sunrise Community Pantry",
    description: "Meet local programs for food, child care, and health in one place.", cost: "Free" },
  { id: "ev-senior-tech", title: "Senior Tech Help Day", type: "Workshop",
    start: "2027-03-20T10:00:00-04:00", end: "2027-03-20T12:00:00-04:00",
    location: "Golden Shores Senior Center", city: "Seminole", organizer: "Golden Shores Senior Center",
    description: "Get one-on-one help with phones, tablets, and email.", cost: "Free" },
  { id: "ev-ged-night", title: "GED Information Night", type: "Workshop",
    start: "2027-04-15T18:00:00-04:00", end: "2027-04-15T19:30:00-04:00",
    location: "Palm Leaf Adult Learning Center", city: "Dunedin", organizer: "Palm Leaf Adult Learning Center",
    description: "Learn how the GED works and sign up for spring classes.", cost: "Free" },
  { id: "ev-storm-kit", title: "Hurricane Kit Day", type: "Preparedness",
    start: "2027-05-29T09:00:00-04:00", end: "2027-05-29T13:00:00-04:00",
    location: "Storm Ready Neighbors", city: "Gulfport", organizer: "Storm Ready Neighbors",
    description: "Build a free starter supply kit before hurricane season begins June 1.", cost: "Free" },
  { id: "ev-veterans-fair", title: "Veterans Job Fair", type: "Resource Fair",
    start: "2027-06-19T10:00:00-04:00", end: "2027-06-19T14:00:00-04:00",
    location: "Anchor Veterans Resource Center", city: "Oldsmar", organizer: "Anchor Veterans Resource Center",
    description: "Meet local employers who are hiring veterans and military spouses.", cost: "Free" },
  { id: "ev-toy-drive", title: "Holiday Toy Drive", type: "Holiday Event",
    start: "2026-12-12T10:00:00-05:00", end: "2026-12-12T13:00:00-05:00",
    location: "Pelican Family Shelter", city: "Clearwater", organizer: "Pelican Family Shelter",
    description: "Free toys for children up to age 12. You can also drop off new, unwrapped toys.", cost: "Free" },
  { id: "ev-senior-holiday-lunch", title: "Senior Holiday Lunch", type: "Holiday Event",
    start: "2026-12-16T11:30:00-05:00", end: "2026-12-16T13:30:00-05:00",
    location: "Golden Shores Senior Center", city: "Seminole", organizer: "Golden Shores Senior Center",
    description: "A free holiday meal with music and friends. Call ahead to save a seat.", cost: "Free" },
  { id: "ev-coat-giveaway", title: "Winter Coat Giveaway", type: "Community Event",
    start: "2026-12-19T09:00:00-05:00", end: "2026-12-19T12:00:00-05:00",
    location: "Sunrise Community Pantry", city: "St. Petersburg", organizer: "Sunrise Community Pantry",
    description: "Free coats, hats, and blankets in all sizes for kids and adults.", cost: "Free" },
  { id: "ev-new-year-hiring", title: "New Year Hiring Fair", type: "Resource Fair",
    start: "2027-01-09T10:00:00-05:00", end: "2027-01-09T14:00:00-05:00",
    location: "Bayside Career Launch", city: "Clearwater", organizer: "Bayside Career Launch",
    description: "Meet local employers who are hiring now. Bring a few copies of your resume.", cost: "Free" },
  { id: "ev-mlk-day-of-service", title: "MLK Day of Service", type: "Volunteer",
    start: "2027-01-18T09:00:00-05:00", end: "2027-01-18T12:00:00-05:00",
    location: "Harbor Table Food Pantry", city: "Largo", organizer: "Harbor Table Food Pantry",
    description: "Help sort and pack food for local families in honor of Dr. Martin Luther King Jr.", cost: "Free" },
  { id: "ev-tax-help-kickoff", title: "Free Tax Help Kickoff", type: "Workshop",
    start: "2027-01-30T10:00:00-05:00", end: "2027-01-30T14:00:00-05:00",
    location: "Clear Path Tax & Legal Clinic", city: "St. Petersburg", organizer: "Clear Path Tax & Legal Clinic",
    description: "Get your taxes filed for free. Bring a photo ID, Social Security cards, and your W-2s.", cost: "Free" },
  { id: "ev-valentines-social", title: "Valentine's Senior Social", type: "Holiday Event",
    start: "2027-02-12T13:00:00-05:00", end: "2027-02-12T15:00:00-05:00",
    location: "Golden Shores Senior Center", city: "Seminole", organizer: "Golden Shores Senior Center",
    description: "Make cards, enjoy snacks, and listen to music. For adults 60 and up.", cost: "Free" },
  { id: "ev-black-history-panel", title: "Black History Month Career Panel", type: "Workshop",
    start: "2027-02-20T10:00:00-05:00", end: "2027-02-20T11:30:00-05:00",
    location: "Bayside Career Launch", city: "Clearwater", organizer: "Bayside Career Launch",
    description: "Local business leaders share their career stories and answer your questions.", cost: "Free" },
  { id: "ev-tax-filing-day", title: "Free Tax Filing Day", type: "Workshop",
    start: "2027-02-27T09:00:00-05:00", end: "2027-02-27T13:00:00-05:00",
    location: "Clear Path Tax & Legal Clinic", city: "St. Petersburg", organizer: "Clear Path Tax & Legal Clinic",
    description: "Drop in for free help filing your taxes. No appointment needed.", cost: "Free" },
  { id: "ev-spring-food-drive", title: "Spring Food Drive", type: "Food Distribution",
    start: "2027-03-06T09:00:00-05:00", end: "2027-03-06T12:00:00-05:00",
    location: "Harbor Table Food Pantry", city: "Largo", organizer: "Harbor Table Food Pantry",
    description: "Drop off canned food or pick up a free grocery box.", cost: "Free" },
  { id: "ev-spring-break-lunch", title: "Spring Break Lunch for Kids", type: "Food Distribution",
    start: "2027-03-16T11:00:00-04:00", end: "2027-03-16T13:00:00-04:00",
    location: "North Shore Food Pantry", city: "Tarpon Springs", organizer: "North Shore Food Pantry",
    description: "A free lunch for kids 18 and under during spring break.", cost: "Free" },
  { id: "ev-easter-egg-hunt", title: "Easter Egg Hunt and Grocery Giveaway", type: "Holiday Event",
    start: "2027-03-27T10:00:00-04:00", end: "2027-03-27T12:00:00-04:00",
    location: "Palm Harbor Community Cupboard", city: "Palm Harbor", organizer: "Palm Harbor Community Cupboard",
    description: "An egg hunt for kids, plus free grocery bags for families.", cost: "Free" },
  { id: "ev-child-care-info", title: "Child Care Help Info Session", type: "Workshop",
    start: "2027-04-08T18:00:00-04:00", end: "2027-04-08T19:00:00-04:00",
    location: "Little Steps Child Care Aid", city: "Safety Harbor", organizer: "Little Steps Child Care Aid",
    description: "Learn how to apply for help paying for child care.", cost: "Free" },
  { id: "ev-veterans-benefits", title: "Veterans Benefits Workshop", type: "Workshop",
    start: "2027-04-10T10:00:00-04:00", end: "2027-04-10T12:00:00-04:00",
    location: "Anchor Veterans Resource Center", city: "Oldsmar", organizer: "Anchor Veterans Resource Center",
    description: "Get one-on-one help with VA benefit claims.", cost: "Free" },
  { id: "ev-health-screening", title: "Free Health Screening Day", type: "Health",
    start: "2027-04-17T09:00:00-04:00", end: "2027-04-17T13:00:00-04:00",
    location: "Coastline Community Clinic", city: "St. Petersburg", organizer: "Coastline Community Clinic",
    description: "Free blood pressure, vision, and diabetes checks. No appointment needed.", cost: "Free" },
  { id: "ev-earth-day-cleanup", title: "Earth Day Beach Cleanup", type: "Volunteer",
    start: "2027-04-24T08:00:00-04:00", end: "2027-04-24T10:00:00-04:00",
    location: "Storm Ready Neighbors", city: "Gulfport", organizer: "Storm Ready Neighbors",
    description: "Help clean up the Gulfport shoreline. Gloves and bags are provided.", cost: "Free" }
];
