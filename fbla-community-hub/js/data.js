/* =========================================================
   data.js — All of the website's content lives here.
   ---------------------------------------------------------
   IMPORTANT: "Riverbend" is a FICTIONAL town used for
   demonstration. Every organization, address, and event below
   is sample data. Phone numbers use the 555-01XX range, which
   is reserved for fictional use, so no real person is called.

   To use real local data, replace these objects with verified
   information from your own community (keep the same fields).
   ========================================================= */

// The categories used to group resources.
// "id" is used in code and URLs, "name" is shown to users.
const categories = [
  { id: "food",           name: "Food",                icon: "🥕" },
  { id: "housing",        name: "Housing",             icon: "🏠" },
  { id: "health",         name: "Health",              icon: "🩺" },
  { id: "education",      name: "Education",           icon: "📚" },
  { id: "jobs",           name: "Jobs & Career",       icon: "💼" },
  { id: "family",         name: "Youth & Family",      icon: "👨‍👩‍👧" },
  { id: "seniors",        name: "Seniors",             icon: "🧓" },
  { id: "transportation", name: "Transportation",      icon: "🚌" },
  { id: "legal",          name: "Legal & Financial",   icon: "⚖️" },
  { id: "recreation",     name: "Parks & Recreation",  icon: "🌳" }
];

// The resource directory. Each object is one organization or program.
const resources = [
  {
    id: 1,
    name: "Riverbend Community Food Pantry",
    category: "food",
    description: "Free groceries, fresh produce, and baby supplies for any household in need. No paperwork is required for your first visit.",
    address: "214 Oak Street, Riverbend",
    phone: "555-0101",
    hours: "Tue & Thu 10 AM–6 PM, Sat 9 AM–12 PM",
    cost: "Free",
    audience: ["Everyone", "Families"],
    languages: ["English", "Spanish"]
  },
  {
    id: 2,
    name: "Hope Kitchen Free Meals",
    category: "food",
    description: "Hot, nutritious lunches served daily in a welcoming dining room. Take-home meal bags are available on Fridays.",
    address: "88 Church Avenue, Riverbend",
    phone: "555-0102",
    hours: "Mon–Fri 11:30 AM–1:30 PM",
    cost: "Free",
    audience: ["Everyone", "Seniors"],
    languages: ["English"]
  },
  {
    id: 3,
    name: "Riverbend Housing Help Center",
    category: "housing",
    description: "Counselors help with rental applications, emergency rent assistance, and finding affordable apartments.",
    address: "1200 Main Street, Suite 3, Riverbend",
    phone: "555-0103",
    hours: "Mon–Fri 9 AM–5 PM",
    cost: "Free",
    audience: ["Everyone", "Families", "Veterans"],
    languages: ["English", "Spanish", "Vietnamese"]
  },
  {
    id: 4,
    name: "Safe Harbor Family Shelter",
    category: "housing",
    description: "Short-term emergency shelter for families with children, plus case managers who help families move into stable housing.",
    address: "Confidential location — call for intake",
    phone: "555-0104",
    hours: "Open 24 hours, 7 days a week",
    cost: "Free",
    audience: ["Families"],
    languages: ["English", "Spanish"]
  },
  {
    id: 5,
    name: "Riverbend Community Health Clinic",
    category: "health",
    description: "Checkups, vaccinations, and dental cleanings with fees based on income. Walk-ins are welcome on weekday mornings.",
    address: "455 Elm Street, Riverbend",
    phone: "555-0105",
    hours: "Mon–Sat 8 AM–6 PM",
    cost: "Low cost",
    audience: ["Everyone", "Families", "Seniors"],
    languages: ["English", "Spanish", "Arabic"]
  },
  {
    id: 6,
    name: "Bridges Counseling Services",
    category: "health",
    description: "Confidential counseling for anxiety, depression, grief, and stress. Teen and family sessions are available.",
    address: "310 Lakeview Drive, Riverbend",
    phone: "555-0106",
    hours: "Mon–Thu 9 AM–8 PM, Fri 9 AM–5 PM",
    cost: "Low cost",
    audience: ["Everyone", "Youth"],
    languages: ["English", "Spanish"]
  },
  {
    id: 7,
    name: "Riverbend Public Library",
    category: "education",
    description: "Free books, computers, Wi-Fi, homework help, and English conversation groups. A library card is free for residents.",
    address: "50 Library Lane, Riverbend",
    phone: "555-0107",
    hours: "Mon–Sat 9 AM–8 PM, Sun 1 PM–5 PM",
    cost: "Free",
    audience: ["Everyone", "Youth", "Seniors"],
    languages: ["English", "Spanish"]
  },
  {
    id: 8,
    name: "Adult Learning & GED Center",
    category: "education",
    description: "Free classes to earn a high school equivalency diploma, improve reading skills, or learn English as a second language.",
    address: "900 College Road, Room 14, Riverbend",
    phone: "555-0108",
    hours: "Mon–Thu 5 PM–9 PM",
    cost: "Free",
    audience: ["Everyone"],
    languages: ["English", "Spanish", "Haitian Creole"]
  },
  {
    id: 9,
    name: "Riverbend Career Center",
    category: "jobs",
    description: "Job listings, résumé reviews, mock interviews, and free workshops on computer skills for the workplace.",
    address: "1200 Main Street, Suite 10, Riverbend",
    phone: "555-0109",
    hours: "Mon–Fri 8:30 AM–4:30 PM",
    cost: "Free",
    audience: ["Everyone", "Youth", "Veterans"],
    languages: ["English", "Spanish"]
  },
  {
    id: 10,
    name: "Teen Summer Jobs Program",
    category: "jobs",
    description: "Paid summer jobs and job-readiness training for students ages 15 to 18. Applications open each spring.",
    address: "Riverbend City Hall, 1 Civic Plaza",
    phone: "555-0110",
    hours: "Mon–Fri 9 AM–5 PM",
    cost: "Free",
    audience: ["Youth"],
    languages: ["English"]
  },
  {
    id: 11,
    name: "Riverbend Boys & Girls Youth Club",
    category: "family",
    description: "A safe after-school space with tutoring, sports, art, and healthy snacks for kids ages 6 to 18.",
    address: "75 Park Street, Riverbend",
    phone: "555-0111",
    hours: "Mon–Fri 2:30 PM–7 PM",
    cost: "Low cost",
    audience: ["Youth", "Families"],
    languages: ["English", "Spanish"]
  },
  {
    id: 12,
    name: "New Parents Support Network",
    category: "family",
    description: "Free parenting classes, home visits from nurses, and a diaper bank for families with children under age 3.",
    address: "455 Elm Street, Riverbend",
    phone: "555-0112",
    hours: "Mon–Fri 9 AM–4 PM",
    cost: "Free",
    audience: ["Families"],
    languages: ["English", "Spanish"]
  },
  {
    id: 13,
    name: "Riverbend Senior Center",
    category: "seniors",
    description: "Daily activities, exercise classes, lunch, and help with Medicare questions for adults ages 60 and older.",
    address: "600 Maple Avenue, Riverbend",
    phone: "555-0113",
    hours: "Mon–Fri 8 AM–4 PM",
    cost: "Free",
    audience: ["Seniors"],
    languages: ["English"]
  },
  {
    id: 14,
    name: "Meals on Wheels of Riverbend",
    category: "seniors",
    description: "Volunteers deliver meals to older adults and people with disabilities who have trouble leaving home.",
    address: "600 Maple Avenue, Riverbend",
    phone: "555-0114",
    hours: "Deliveries Mon–Fri 10 AM–1 PM",
    cost: "Low cost",
    audience: ["Seniors"],
    languages: ["English", "Spanish"]
  },
  {
    id: 15,
    name: "Riverbend Transit Reduced Fare Program",
    category: "transportation",
    description: "Half-price bus passes for students, seniors, veterans, and people with disabilities. Apply in person with a photo ID.",
    address: "Riverbend Transit Center, 20 Station Street",
    phone: "555-0115",
    hours: "Mon–Fri 7 AM–6 PM",
    cost: "Low cost",
    audience: ["Youth", "Seniors", "Veterans"],
    languages: ["English", "Spanish"]
  },
  {
    id: 16,
    name: "Volunteer Medical Rides",
    category: "transportation",
    description: "Free rides to medical appointments for residents without a car. Please call at least two days ahead.",
    address: "Service covers all of Riverbend",
    phone: "555-0116",
    hours: "Rides Mon–Fri 8 AM–5 PM",
    cost: "Free",
    audience: ["Seniors", "Everyone"],
    languages: ["English"]
  },
  {
    id: 17,
    name: "Riverbend Legal Aid Clinic",
    category: "legal",
    description: "Free legal advice on renters' rights, family law, and benefits for residents who qualify based on income.",
    address: "1200 Main Street, Suite 5, Riverbend",
    phone: "555-0117",
    hours: "Wed 1 PM–7 PM, by appointment",
    cost: "Free",
    audience: ["Everyone", "Veterans"],
    languages: ["English", "Spanish"]
  },
  {
    id: 18,
    name: "Free Tax Prep & Money Coaching",
    category: "legal",
    description: "Trained volunteers prepare tax returns at no cost and offer one-on-one coaching on budgeting and saving.",
    address: "50 Library Lane, Riverbend (Library Room B)",
    phone: "555-0118",
    hours: "Sat 10 AM–2 PM (January–April)",
    cost: "Free",
    audience: ["Everyone", "Families", "Seniors"],
    languages: ["English", "Spanish"]
  },
  {
    id: 19,
    name: "Riverside Park & Community Pool",
    category: "recreation",
    description: "Walking trails, playgrounds, sports fields, and a public pool with free swim lessons for kids during the summer.",
    address: "300 River Road, Riverbend",
    phone: "555-0119",
    hours: "Park: daily, sunrise to sunset",
    cost: "Free",
    audience: ["Everyone", "Families", "Youth"],
    languages: ["English"]
  },
  {
    id: 20,
    name: "Riverbend Community Garden",
    category: "recreation",
    description: "Rent a garden plot, join a weekend workshop, or volunteer to grow fresh food that is donated to the food pantry.",
    address: "Corner of 5th Street and Pine Avenue",
    phone: "555-0120",
    hours: "Daily 7 AM–7 PM",
    cost: "Low cost",
    audience: ["Everyone", "Families", "Seniors"],
    languages: ["English", "Spanish"]
  }
];

// Upcoming community events.
// "daysFromToday" keeps the demo up to date: an event with
// daysFromToday: 3 always appears 3 days after the current date.
const events = [
  {
    id: 1,
    title: "Free Health Screening Day",
    type: "Health",
    daysFromToday: 2,
    time: "9:00 AM – 1:00 PM",
    location: "Riverbend Community Health Clinic",
    cost: "Free",
    description: "Free blood pressure, vision, and diabetes screenings. No appointment needed."
  },
  {
    id: 2,
    title: "Community Garden Volunteer Morning",
    type: "Volunteer",
    daysFromToday: 4,
    time: "8:00 AM – 11:00 AM",
    location: "Riverbend Community Garden",
    cost: "Free",
    description: "Help plant and harvest vegetables for the food pantry. Gloves and tools are provided."
  },
  {
    id: 3,
    title: "Résumé Workshop for First-Time Job Seekers",
    type: "Jobs",
    daysFromToday: 6,
    time: "4:00 PM – 5:30 PM",
    location: "Riverbend Career Center",
    cost: "Free",
    description: "Build your first résumé with help from local hiring managers. Bring a laptop if you have one."
  },
  {
    id: 4,
    title: "Family Movie Night in the Park",
    type: "Family",
    daysFromToday: 8,
    time: "7:00 PM – 9:00 PM",
    location: "Riverside Park Lawn",
    cost: "Free",
    description: "Bring a blanket for an outdoor family movie. Free popcorn while supplies last."
  },
  {
    id: 5,
    title: "Medicare Q&A for Seniors",
    type: "Health",
    daysFromToday: 10,
    time: "10:00 AM – 11:30 AM",
    location: "Riverbend Senior Center",
    cost: "Free",
    description: "Get plain-language answers about Medicare plans and enrollment deadlines."
  },
  {
    id: 6,
    title: "Teen Coding Club",
    type: "Learning",
    daysFromToday: 12,
    time: "3:30 PM – 5:00 PM",
    location: "Riverbend Public Library",
    cost: "Free",
    description: "Students ages 12 to 18 learn to build websites and games. No experience needed."
  },
  {
    id: 7,
    title: "Neighborhood Park Cleanup",
    type: "Volunteer",
    daysFromToday: 15,
    time: "9:00 AM – 12:00 PM",
    location: "Riverside Park Pavilion",
    cost: "Free",
    description: "Join neighbors to pick up litter and plant flowers. Volunteer hours can count for school service hours."
  },
  {
    id: 8,
    title: "Free Tax Help Kickoff",
    type: "Learning",
    daysFromToday: 19,
    time: "10:00 AM – 2:00 PM",
    location: "Riverbend Public Library, Room B",
    cost: "Free",
    description: "Learn which documents to bring and schedule a free tax preparation appointment."
  },
  {
    id: 9,
    title: "Riverbend Job Fair",
    type: "Jobs",
    daysFromToday: 24,
    time: "11:00 AM – 3:00 PM",
    location: "Riverbend City Hall",
    cost: "Free",
    description: "Meet more than 30 local employers hiring for full-time, part-time, and seasonal jobs."
  },
  {
    id: 10,
    title: "Cultural Food & Music Festival",
    type: "Family",
    daysFromToday: 29,
    time: "12:00 PM – 6:00 PM",
    location: "Downtown Riverbend, Main Street",
    cost: "Free entry",
    description: "Celebrate Riverbend's cultures with food trucks, live music, and kids' activities."
  },
  {
    id: 11,
    title: "Adult Swim Lessons",
    type: "Health",
    daysFromToday: 33,
    time: "6:00 PM – 7:00 PM",
    location: "Riverside Community Pool",
    cost: "$5 per class",
    description: "Beginner-friendly swim lessons for adults taught by certified instructors."
  },
  {
    id: 12,
    title: "Holiday Coat & Toy Drive",
    type: "Volunteer",
    daysFromToday: 40,
    time: "10:00 AM – 4:00 PM",
    location: "Riverbend Community Food Pantry",
    cost: "Free",
    description: "Donate new toys or gently used coats, or volunteer to sort donations for local families."
  }
];
