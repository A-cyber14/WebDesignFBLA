/* =========================================================
   data.js — All of the website's content lives here.
   ---------------------------------------------------------
   Every organization below is REAL and operates in (or serves)
   Pinellas County, Florida. Each listing was checked against the
   organization's own website or an official government website
   on the date in its "verified" field, and "source" links to the
   page that was checked.

   Rules we followed:
   - If the official source did not state something (hours, cost,
     eligibility, service area), we wrote "Not listed" instead of
     guessing.
   - Map coordinates come from geocoding each verified street
     address with OpenStreetMap Nominatim ("OSM") or the U.S. Census
     Bureau Geocoder ("Census"). Nothing was placed by hand.
   - Domestic-violence services are intentionally NOT mapped.

   To update a listing: re-check the source, edit the fields, and
   change "verified" to the new date.
   ========================================================= */

const LAST_VERIFIED = "2026-11-09";

// The communities used by the location filter.
const cities = [
  "St. Petersburg", "Clearwater", "Largo", "Pinellas Park", "Dunedin",
  "Tarpon Springs", "Palm Harbor", "Safety Harbor", "Seminole", "Oldsmar",
  "Gulfport", "Treasure Island", "Madeira Beach", "St. Pete Beach", "East Lake"
];

// Resource categories. "icon" is a key in the ICONS object in main.js.
const categories = [
  { id: "food",           name: "Food",                 icon: "food",           color: "#E0761B" },
  { id: "housing",        name: "Housing & Shelter",    icon: "housing",        color: "#2F6FDB" },
  { id: "health",         name: "Health & Mental Health", icon: "health",       color: "#D93A5B" },
  { id: "jobs",           name: "Jobs & Careers",       icon: "jobs",           color: "#7A4FD6" },
  { id: "education",      name: "Education",            icon: "education",      color: "#1D8A6F" },
  { id: "seniors",        name: "Seniors",              icon: "seniors",        color: "#B8691E" },
  { id: "transportation", name: "Transportation",       icon: "transportation", color: "#0A84A8" },
  { id: "disability",     name: "Disability & Access",  icon: "disability",     color: "#4C5FD5" },
  { id: "family",         name: "Family & Childcare",   icon: "family",         color: "#C2448F" },
  { id: "emergency",      name: "Emergency & Disaster", icon: "emergency",      color: "#C4281C" },
  { id: "financial",      name: "Financial & Legal",    icon: "financial",      color: "#2E7D32" },
  { id: "veterans",       name: "Veterans",             icon: "veterans",       color: "#34507A" }
];

/* ---------------------------------------------------------
   Resource fields
   id          unique text id (used in saved lists)
   name        organization or program name
   categories  one or more category ids (first = main category)
   description what it offers, in plain language
   area        "countywide" = serves all of Pinellas County
               "unstated"   = the source does not say which areas it serves
   areaNote    extra detail about who/where it serves
   locations   verified physical locations (may be empty)
   phones      [{ label, number }] — the first is the main number
   website     official website
   hours, eligibility, cost   as stated by the source
   free        true only when the source says the service is free
   urgent      true for 24/7 crisis and emergency lines
   source      the page we checked
   verified    the date we checked it (YYYY-MM-DD)
   --------------------------------------------------------- */
const resources = [
  /* ---------- Crisis & information lines ---------- */
  {
    id: "first-contact-211",
    name: "First Contact — 211 Helpline",
    categories: ["emergency", "financial", "housing"],
    description: "Free, confidential helpline that connects you with local help for rent, utilities, food, shelter, disaster recovery, and more. First Contact was formerly called 211 Tampa Bay Cares.",
    area: "countywide",
    areaNote: "Serves Pinellas and other Tampa Bay counties.",
    locations: [],
    phones: [
      { label: "Call 211", number: "211" },
      { label: "Text your ZIP code to", number: "898211", sms: true },
      { label: "Call center", number: "727-210-4211" }
    ],
    website: "https://www.firstcontact.org/",
    hours: "24 hours a day, 7 days a week",
    eligibility: "Anyone",
    cost: "Free and confidential",
    free: true,
    urgent: true,
    source: "https://www.firstcontact.org/",
    verified: "2026-11-09"
  },
  {
    id: "988-lifeline",
    name: "988 Suicide & Crisis Lifeline",
    categories: ["health", "emergency"],
    description: "Call, text, or chat with a trained crisis counselor any time. First Contact answers 988 for the Tampa Bay area. Veterans can dial 988 and press 1.",
    area: "countywide",
    areaNote: "National line answered locally by First Contact.",
    locations: [],
    phones: [
      { label: "Call or text", number: "988" }
    ],
    website: "https://www.firstcontact.org/",
    hours: "24 hours a day, 7 days a week",
    eligibility: "Anyone",
    cost: "Free and confidential",
    free: true,
    urgent: true,
    source: "https://www.firstcontact.org/",
    verified: "2026-11-09"
  },
  {
    id: "eleos-wellness",
    name: "Eleos Wellness & Support (PEMHS)",
    categories: ["health", "emergency"],
    description: "Nonprofit mental health provider offering crisis stabilization, suicide prevention, a Mobile Crisis Response Team, and community programs. Eleos is the public name of Personal Enrichment through Mental Health Services (PEMHS).",
    area: "unstated",
    areaNote: "Main campus in Pinellas Park; also an Omni Park campus in Largo (7431 114th Ave., Suite 104).",
    locations: [
      { label: "Main Campus", address: "11254 58th Street N, Pinellas Park, FL 33782", city: "Pinellas Park", lat: 27.87395, lng: -82.71255, geocoder: "Census" }
    ],
    phones: [
      { label: "24-hour suicide prevention hotline", number: "727-791-3131" },
      { label: "Main line", number: "727-545-6477" }
    ],
    website: "https://eleoswellness.org/",
    hours: "Hotline answered 24 hours. Office hours not listed.",
    eligibility: "Not listed",
    cost: "Not listed",
    free: false,
    urgent: true,
    source: "https://eleoswellness.org/",
    verified: "2026-11-09"
  },
  {
    id: "casa-pinellas",
    name: "CASA (Community Action Stops Abuse)",
    categories: ["family", "emergency"],
    description: "The official provider of domestic violence support in Pinellas County: a 24-hour hotline, emergency shelter, counseling, advocacy, outreach, and prevention for people of all genders, ages, and backgrounds. For safety, this listing is not shown on the map.",
    area: "countywide",
    areaNote: "Pinellas County. Outside Pinellas, call the Florida hotline: 1-800-500-1119.",
    locations: [],
    phones: [
      { label: "24-hour hotline", number: "727-895-4912" },
      { label: "Florida Domestic Violence Hotline", number: "1-800-500-1119" }
    ],
    website: "https://www.casapinellas.org/",
    hours: "Hotline answered 24 hours. Online chat at casapinellas.org/chat.",
    eligibility: "Anyone affected by domestic violence",
    cost: "Not listed",
    free: false,
    urgent: true,
    source: "https://www.casapinellas.org/",
    verified: "2026-11-09"
  },

  /* ---------- County government ---------- */
  {
    id: "pinellas-human-services",
    name: "Pinellas County Human Services",
    categories: ["financial", "housing", "disability"],
    description: "County department offering Adult Emergency Financial Assistance for unexpected hardship, the Family Housing Assistance Program for families experiencing homelessness, help applying for Social Security disability benefits, and more. Apply online or call intake.",
    area: "countywide",
    locations: [
      { label: "Human Services office", address: "647 First Ave. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77216, lng: -82.64277, geocoder: "OSM" }
    ],
    phones: [
      { label: "Human Services & intake", number: "727-464-4200" },
      { label: "TDD", number: "727-464-4062" }
    ],
    website: "https://pinellas.gov/department/human-services/",
    links: [{ label: "Apply online", url: "https://connections.pinellas.gov/care-coordination" }],
    hours: "Office hours not listed. County Information Desk: Mon–Fri 8 a.m.–5 p.m. (727-464-3000).",
    eligibility: "Qualified low-income Pinellas County residents. Each program has its own rules; the Family Housing Assistance Program takes referrals through the county's Coordinated Entry System.",
    cost: "Free to apply",
    free: true,
    source: "https://pinellas.gov/department/human-services/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-county-health-program",
    name: "Pinellas County Health Program (PCHP)",
    categories: ["health"],
    description: "County health coverage focused on prevention, with mental health and substance use services, specialty care referrals, and case management. A related Health Care for the Homeless program serves residents without stable housing.",
    area: "countywide",
    locations: [],
    phones: [{ label: "Human Services", number: "727-464-4200" }],
    website: "https://pinellas.gov/programs/pinellas-county-health-program/",
    links: [{ label: "Health Care for the Homeless", url: "https://pinellas.gov/programs/health-care-for-the-homeless-program/" }],
    hours: "Not listed",
    eligibility: "Qualified low-income Pinellas County residents",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/department/human-services/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-veterans-services",
    name: "Pinellas County Veterans Services",
    categories: ["veterans", "financial"],
    description: "Helps veterans and their families apply for VA disability compensation, pension, and survivor benefits, and verifies eligibility for Florida veterans' property tax exemptions. Appointments are offered by phone, video, or in person.",
    area: "countywide",
    locations: [
      { label: "Clearwater office (appointments preferred)", address: "2189 Cleveland St., Suite 263, Clearwater, FL 33765", city: "Clearwater", lat: 27.96532, lng: -82.7465, geocoder: "OSM" },
      { label: "St. Petersburg office (appointments only)", address: "647 First Ave. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77216, lng: -82.64277, geocoder: "OSM" }
    ],
    phones: [{ label: "Appointments (all locations)", number: "727-464-8460" }],
    website: "https://pinellas.gov/department/veterans-services/",
    hours: "Mon–Fri 8 a.m.–5 p.m., closed 12–1 p.m. for lunch",
    eligibility: "Veterans and their families",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/department/veterans-services/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-emergency-management",
    name: "Pinellas County Emergency Management",
    categories: ["emergency"],
    description: "The county's official source for hurricane preparedness, evacuation zones, shelters, and Alert Pinellas emergency notifications. See our Emergency page for direct links.",
    area: "countywide",
    locations: [
      { label: "Emergency Management office", address: "10750 Ulmerton Rd., Bldg. 1, Suite 267, Largo, FL 33778", city: "Largo", lat: 27.89341, lng: -82.79022, geocoder: "OSM" }
    ],
    phones: [
      { label: "Emergency Management", number: "727-464-3800" },
      { label: "County Information Center (during emergencies)", number: "727-464-4333" }
    ],
    website: "https://pinellas.gov/department/emergency-management/",
    links: [
      { label: "Know Your Zone", url: "https://kyz.pinellascounty.org" },
      { label: "Sign up for Alert Pinellas", url: "https://pinellas.gov/alert-pinellas/" }
    ],
    hours: "County Information Desk: Mon–Fri 8 a.m.–5 p.m.",
    eligibility: "All residents",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/department/emergency-management/",
    verified: "2026-11-09"
  },
  {
    id: "special-needs-evacuation",
    name: "Special Needs Evacuation Program",
    categories: ["emergency", "disability", "seniors", "transportation"],
    description: "Pinellas County program for residents who need help evacuating before a storm, including evacuation transportation and special needs shelters. Register before hurricane season.",
    area: "countywide",
    locations: [],
    phones: [{ label: "Emergency Management", number: "727-464-3800" }],
    website: "https://pinellas.gov/special-needs/",
    hours: "Not listed",
    eligibility: "Residents who need evacuation assistance (see the program page for details)",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/department/emergency-management/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-consumer-protection",
    name: "Pinellas County Consumer Protection",
    categories: ["financial"],
    description: "Helps residents recognize and report scams and fraud, and handles complaints about businesses. Hosts free events during Fraud Awareness Week.",
    area: "countywide",
    locations: [],
    phones: [{ label: "Consumer Protection", number: "727-464-6200" }],
    website: "https://pinellas.gov/department/consumer-protection/",
    hours: "Not listed",
    eligibility: "Pinellas County residents",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/event/fraud-awareness-week-2026-free-paper-shredding-event/",
    verified: "2026-11-09"
  },

  /* ---------- Food ---------- */
  {
    id: "hope-villages-food",
    name: "Hope Villages of America — Food Distribution Center",
    categories: ["food"],
    description: "Walk-in food distribution with no appointment or referral needed. Each visit provides about 3–4 days of food for every member of the household, once per month. Staff can also refer you to other local services.",
    area: "countywide",
    areaNote: "You must live or work in Pinellas County for most food. USDA TEFAP food is available to all Florida residents.",
    locations: [
      { label: "Food Distribution Center", address: "700 Druid Road, Clearwater, FL 33756", city: "Clearwater", lat: 27.95734, lng: -82.79686, geocoder: "OSM" }
    ],
    phones: [{ label: "Food Distribution Center", number: "727-443-4031" }],
    website: "https://hopevillagesofamerica.org/food-distribution-center/",
    hours: "Mon–Fri 12:30–3:30 p.m.; Tuesdays until 6:30 p.m.",
    eligibility: "Bring a photo ID, proof of address if your ID is not current, and Social Security cards and/or birth certificates for everyone in the household. Most food has no income requirement; TEFAP food needs no ID.",
    cost: "Free",
    free: true,
    source: "https://hopevillagesofamerica.org/food-distribution-center/",
    verified: "2026-11-09"
  },
  {
    id: "feeding-tampa-bay",
    name: "Feeding Tampa Bay — Feeding Pinellas Empowerment Center",
    categories: ["food"],
    description: "Regional food bank serving 10 counties across West Central Florida. Its online Find Food map lists pantries and distributions near you, and its Feeding Pinellas Empowerment Center is in St. Petersburg.",
    area: "countywide",
    areaNote: "Serves 10 West Central Florida counties.",
    locations: [
      { label: "Feeding Pinellas Empowerment Center", address: "6330 54th Ave. N, St. Petersburg, FL 33709", city: "St. Petersburg", lat: 27.82092, lng: -82.72255, geocoder: "Census" }
    ],
    phones: [{ label: "Main line", number: "813-254-1190" }],
    website: "https://ftb.org/",
    links: [{ label: "Find Food map", url: "https://ftb.org/findfood/" }],
    hours: "Neighbor Services (appointments and walk-ins): Mon–Fri 9 a.m.–4 p.m., as listed on the contact page. Confirm the location before visiting.",
    eligibility: "Not listed",
    cost: "Not listed",
    free: false,
    source: "https://ftb.org/contact-us/",
    verified: "2026-11-09"
  },
  {
    id: "feast-food-pantry",
    name: "FEAST Food Pantry",
    categories: ["food"],
    description: "Drive-up food pantry with no appointment required. Families receive a four-day supply of food, and perishable items can be requested from a volunteer.",
    area: "unstated",
    areaNote: "Located in Palm Harbor. The pantry does not list a service area — call to confirm.",
    locations: [
      { label: "Drive-up pantry", address: "2255 Nebraska Ave., Palm Harbor, FL 34683", city: "Palm Harbor", lat: 28.08004, lng: -82.74469, geocoder: "OSM" }
    ],
    phones: [{ label: "Pantry", number: "727-789-5275" }],
    website: "https://feastfoodpantry.org/",
    hours: "Mon 4:30–6:30 p.m.; Tue–Fri 9 a.m.–12 p.m.",
    eligibility: "Not listed",
    cost: "Free",
    free: true,
    source: "https://feastfoodpantry.org/",
    verified: "2026-11-09"
  },
  {
    id: "spfc-we-help",
    name: "St. Petersburg Free Clinic — We Help Services",
    categories: ["food"],
    description: "Food pantry and community navigation services, including help getting a Florida ID or birth certificate and transportation assistance.",
    area: "unstated",
    areaNote: "Located in St. Petersburg. Service area not listed.",
    locations: [
      { label: "We Help Services", address: "863 3rd Ave. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77536, lng: -82.64596, geocoder: "OSM" }
    ],
    phones: [{ label: "We Help Services", number: "727-821-1200" }],
    website: "https://thespfc.org/",
    links: [{ label: "Find Food map", url: "https://thespfc.org/map/" }],
    hours: "Not listed — call before visiting",
    eligibility: "Not listed",
    cost: "Not listed",
    free: false,
    source: "https://thespfc.org/contact/",
    verified: "2026-11-09"
  },
  {
    id: "access-florida",
    name: "ACCESS Florida — SNAP, Medicaid & Cash Assistance",
    categories: ["food", "financial", "health"],
    description: "Apply for SNAP food benefits, Medicaid, and Temporary Cash Assistance through the Florida Department of Children and Families' MyACCESS portal, then check status and manage benefits online.",
    area: "countywide",
    areaNote: "Statewide program.",
    locations: [],
    phones: [{ label: "DCF Customer Call Center", number: "850-300-4323" }],
    website: "https://www.myflfamilies.com/services/public-assistance",
    links: [{ label: "MyACCESS portal", url: "https://myaccess.myflfamilies.com" }],
    hours: "Online portal available any time",
    eligibility: "Set by the State of Florida for each program",
    cost: "Free to apply",
    free: true,
    source: "https://www.myflfamilies.com/services/public-assistance",
    verified: "2026-11-09"
  },

  /* ---------- Housing & shelter ---------- */
  {
    id: "homeless-leadership-alliance",
    name: "Homeless Leadership Alliance of Pinellas",
    categories: ["housing"],
    description: "Coordinates Pinellas County's network of homeless services, including the Coordinated Entry process. For immediate help, the Alliance asks people to call 2-1-1.",
    area: "countywide",
    locations: [
      { label: "Office", address: "647 1st Ave. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77216, lng: -82.64277, geocoder: "OSM" }
    ],
    phones: [
      { label: "For immediate help", number: "211" },
      { label: "Office", number: "727-933-0100" }
    ],
    website: "https://www.pinellashomeless.org/",
    hours: "Not listed",
    eligibility: "People experiencing or at risk of homelessness",
    cost: "Not listed",
    free: false,
    source: "https://www.pinellashomeless.org/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-hope",
    name: "Pinellas Hope (Catholic Charities)",
    categories: ["housing"],
    description: "Emergency shelter and support for homeless adults on a 10-acre campus, with Hope Cottages and permanent supportive apartments, including units for veterans. Outreach teams help residents with food, transportation, and employment.",
    area: "unstated",
    areaNote: "Located in Clearwater. Contact the program to learn how intake works.",
    locations: [
      { label: "Pinellas Hope campus", address: "5726 126th Ave. N, Clearwater, FL 33760", city: "Clearwater", lat: 27.88638, lng: -82.70992, geocoder: "Census" }
    ],
    phones: [{ label: "Office", number: "727-556-6397" }],
    website: "https://pinellashope.org/",
    hours: "Not listed",
    eligibility: "Homeless adults. Intake is handled by Community Outreach teams.",
    cost: "Not listed",
    free: false,
    source: "https://pinellashope.org/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-safe-harbor",
    name: "Pinellas Safe Harbor",
    categories: ["housing"],
    description: "Shelter run by the Pinellas County Sheriff's Office for homeless people involved in the justice system and people leaving the Pinellas County Jail. Men and women sleep in separate housing units, and an on-site clinic is open Monday through Saturday.",
    area: "countywide",
    locations: [
      { label: "Safe Harbor", address: "14840 49th Street N, Clearwater, FL 33762", city: "Clearwater", lat: 27.90645, lng: -82.70078, geocoder: "Census" }
    ],
    phones: [{ label: "Safe Harbor", number: "727-464-8058" }],
    website: "https://www.pinellassheriff.gov/SafeHarbor",
    hours: "Not listed",
    eligibility: "Intake staff assess each person's qualifications",
    cost: "Not listed",
    free: false,
    source: "https://www.pinellassheriff.gov/SafeHarbor",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-housing-authority",
    name: "Pinellas County Housing Authority",
    categories: ["housing"],
    description: "Housing Choice Vouchers (Section 8), public and affordable housing, HUD-VASH vouchers for veterans, Family Self-Sufficiency, and a homeownership program. Check the website to see which waitlists are open; the Interest List is not a waiting list.",
    area: "unstated",
    areaNote: "Service area not listed on the homepage.",
    locations: [
      { label: "Main office", address: "11479 Ulmerton Rd., Largo, FL 33778", city: "Largo", lat: 27.89474, lng: -82.79831, geocoder: "OSM" }
    ],
    phones: [
      { label: "Main office", number: "727-443-7684" },
      { label: "TDD", number: "800-955-8770" }
    ],
    website: "https://www.pinellashousing.com/",
    hours: "Not listed",
    eligibility: "Varies by program",
    cost: "Not listed",
    free: false,
    source: "https://www.pinellashousing.com/",
    verified: "2026-11-09"
  },

  /* ---------- Health ---------- */
  {
    id: "doh-pinellas",
    name: "Florida Department of Health in Pinellas County",
    categories: ["health", "family"],
    description: "Public health services including immunizations, WIC nutrition support, adult and child health, pediatric dental care, STI and tuberculosis services, refugee health, and free or low-cost breast and cervical cancer screenings for eligible women.",
    area: "countywide",
    locations: [
      { label: "St. Petersburg Health Department", address: "205 Dr. Martin Luther King Jr. St. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77364, lng: -82.64661, geocoder: "Census", phone: "727-824-6900", hours: "Mon–Fri 8 a.m.–5 p.m." },
      { label: "Clearwater Health Department", address: "310 N. Myrtle Ave., Clearwater, FL 33755", city: "Clearwater", lat: 27.96927, lng: -82.79601, geocoder: "OSM", phone: "727-469-5800" }
    ],
    phones: [{ label: "Main line", number: "727-824-6900" }],
    website: "https://pinellas.floridahealth.gov/",
    links: [{ label: "All locations", url: "https://pinellas.floridahealth.gov/locations/" }],
    hours: "St. Petersburg: Mon–Fri 8 a.m.–5 p.m. Other locations vary.",
    eligibility: "Varies by service",
    cost: "Varies by service; some screenings are free or low cost for eligible patients",
    free: false,
    source: "https://pinellas.floridahealth.gov/location/st-petersburg-health-department/",
    verified: "2026-11-09"
  },
  {
    id: "evara-health",
    name: "Evara Health",
    categories: ["health", "family", "seniors"],
    description: "Community health center (formerly Community Health Centers of Pinellas) with 20 clinic locations and 5 pharmacies across the county. Offers family, pediatric, women's, geriatric, dental, and behavioral health care.",
    area: "countywide",
    areaNote: "20 locations across Pinellas County. Use the website's location finder.",
    locations: [],
    phones: [{ label: "Main line (also after-hours on-call)", number: "727-824-8181" }],
    website: "https://www.evarahealth.org/",
    links: [{ label: "Find a location", url: "https://www.evarahealth.org/locations" }],
    hours: "Varies by location",
    eligibility: "Not listed — see “Paying for Care” on the website",
    cost: "See “Paying for Care” on the website",
    free: false,
    source: "https://www.evarahealth.org/",
    verified: "2026-11-09"
  },
  {
    id: "spfc-health",
    name: "St. Petersburg Free Clinic — Health & Dental Centers",
    categories: ["health"],
    description: "Primary and specialty health care, dental care, medication services, and health education for uninsured adults.",
    area: "unstated",
    areaNote: "Located in St. Petersburg. Service area not listed.",
    locations: [
      { label: "Health Center & Dental Center", address: "5501 4th St. N, St. Petersburg, FL 33703", city: "St. Petersburg", lat: 27.82244, lng: -82.63857, geocoder: "OSM" }
    ],
    phones: [
      { label: "Health Center", number: "727-327-0333" },
      { label: "Dental Center", number: "727-485-8795" }
    ],
    website: "https://thespfc.org/",
    hours: "Not listed — call before visiting",
    eligibility: "Uninsured adults",
    cost: "Not listed",
    free: false,
    source: "https://thespfc.org/contact/",
    verified: "2026-11-09"
  },
  {
    id: "directions-for-living",
    name: "Directions for Living",
    categories: ["health", "family"],
    description: "Mental health care for adults and children, family support and early intervention programs, housing stability support, and Mental Health First Aid training.",
    area: "unstated",
    areaNote: "Several locations; see the website's Locations & Hours page.",
    locations: [],
    phones: [{ label: "Main line", number: "727-524-4464" }],
    website: "https://www.directionsforliving.org/",
    links: [{ label: "Locations & hours", url: "https://www.directionsforliving.org/locations/" }],
    hours: "See the website's Locations & Hours page",
    eligibility: "Not listed",
    cost: "Not listed",
    free: false,
    source: "https://www.directionsforliving.org/",
    verified: "2026-11-09"
  },

  /* ---------- Jobs & education ---------- */
  {
    id: "careersource-tampa-bay",
    name: "CareerSource Tampa Bay",
    categories: ["jobs", "veterans", "education"],
    description: "Job search help, career training, hiring events, free workshops, veteran services, and youth services for ages 16–24. Some workshops require an EmployFlorida profile.",
    area: "countywide",
    areaNote: "Serves Pinellas and Hillsborough counties.",
    locations: [
      { label: "Gulf to Bay Center", address: "2312 Gulf to Bay Blvd., Clearwater, FL 33765", city: "Clearwater", lat: 27.96061, lng: -82.74154, geocoder: "OSM" },
      { label: "St. Petersburg Center", address: "3420 8th Ave. S, St. Petersburg, FL 33711", city: "St. Petersburg", lat: 27.76214, lng: -82.68107, geocoder: "OSM" },
      { label: "Tarpon Springs Center (closed 12–1 p.m.)", address: "682 E. Klosterman Road, Tarpon Springs, FL 34689", city: "Tarpon Springs", lat: 28.12287, lng: -82.75897, geocoder: "Census" }
    ],
    phones: [{ label: "All Pinellas centers", number: "727-524-4344" }],
    website: "https://careersourcetampabay.com/",
    links: [{ label: "Events & workshops", url: "https://careersourcetampabay.com/events/" }],
    hours: "Mon–Fri 8 a.m.–5 p.m.",
    eligibility: "Job seekers; youth services for ages 16–24",
    cost: "Free workshops; ask about other services",
    free: true,
    source: "https://careersourcetampabay.com/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-technical-college",
    name: "Pinellas Technical College",
    categories: ["education", "jobs"],
    description: "About 60 career programs in health science, skilled trades, IT, culinary arts, and more, plus adult basic education, GED preparation, and ESOL at the Clearwater campus.",
    area: "countywide",
    locations: [
      { label: "Clearwater campus", address: "6100 154th Ave. N, Clearwater, FL 33760", city: "Clearwater", lat: 27.91232, lng: -82.72065, geocoder: "Census", phone: "727-538-7167" },
      { label: "St. Petersburg campus", address: "901 34th St. S, St. Petersburg, FL 33711", city: "St. Petersburg", lat: 27.76076, lng: -82.68178, geocoder: "OSM", phone: "727-893-2500" }
    ],
    phones: [
      { label: "Clearwater campus", number: "727-538-7167" },
      { label: "St. Petersburg campus", number: "727-893-2500" }
    ],
    website: "https://www.myptc.edu/",
    hours: "Not listed",
    eligibility: "Varies by program",
    cost: "Tuition varies by program; financial assistance is available to those who qualify",
    free: false,
    source: "https://www.myptc.edu/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-county-schools",
    name: "Pinellas County Schools",
    categories: ["education", "family", "food"],
    description: "The public school district for all of Pinellas County. Find student registration, free and reduced-price school meals, homework help, mentoring programs, and family engagement resources.",
    area: "countywide",
    locations: [
      { label: "District administration", address: "301 4th St. SW, Largo, FL 33770", city: "Largo", lat: 27.91376, lng: -82.79203, geocoder: "OSM" }
    ],
    phones: [{ label: "District office", number: "727-588-6000" }],
    website: "https://www.pcsb.org/",
    links: [
      { label: "How to enroll", url: "https://www.pcsb.org/departments/district-services/student-registration/how-to-enroll/how-to-enroll" },
      { label: "Free & reduced meals", url: "https://www.pcsb.org/departments/facilities-and-operations/food-and-nutrition/free-and-reduced-meals" }
    ],
    hours: "Not listed",
    eligibility: "Pinellas County students and families",
    cost: "Free public education; meal eligibility varies",
    free: true,
    source: "https://www.pcsb.org/",
    verified: "2026-11-09"
  },
  {
    id: "pinellas-library-cooperative",
    name: "Pinellas Public Library Cooperative",
    categories: ["education", "disability"],
    description: "Connects 14 public libraries across the county. A library card gives free access to ebooks through Libby, language learning, free museum passes, and more. Includes a Talking Book Library for blind and print-disabled readers and a Deaf Literacy Center.",
    area: "countywide",
    areaNote: "Member libraries: Clearwater, Dunedin, East Lake, Gulf Beaches, Gulfport, Largo, Oldsmar, Palm Harbor, Pinellas Park, Safety Harbor, St. Petersburg, St. Pete Beach, Seminole, and Tarpon Springs.",
    locations: [
      { label: "Cooperative office", address: "1330 Cleveland St., Clearwater, FL 33755", city: "Clearwater", lat: 27.96573, lng: -82.78176, geocoder: "OSM" }
    ],
    phones: [{ label: "Cooperative office", number: "727-441-8408" }],
    website: "https://www.pplc.us/",
    hours: "Varies by library. Digital library available any time.",
    eligibility: "See “Get a Card” on the website",
    cost: "Free with a library card; libraries are fine-free",
    free: true,
    source: "https://www.pplc.us/",
    verified: "2026-11-09"
  },

  /* ---------- Family & childcare ---------- */
  {
    id: "early-learning-coalition",
    name: "Early Learning Coalition of Pinellas County",
    categories: ["family", "education", "financial"],
    description: "Helps families pay for child care through School Readiness, enrolls 4-year-olds in free Voluntary Prekindergarten (VPK), and offers child care referrals, developmental screenings, and Help Me Grow.",
    area: "countywide",
    locations: [
      { label: "North County / Administrative office", address: "2536 Countryside Blvd., Suite 500, Clearwater, FL 33763", city: "Clearwater", lat: 28.0133, lng: -82.73796, geocoder: "OSM" }
    ],
    phones: [{ label: "Main line", number: "727-548-1439" }],
    website: "https://www.elcpinellas.net/",
    links: [{ label: "Child care financial assistance", url: "https://elcpinellas.org/for-families-financial-care-assistance/" }],
    hours: "Mon–Fri 8 a.m.–4:30 p.m. (kiosks close at 4 p.m.)",
    eligibility: "VPK: children turning 4. School Readiness: see the financial assistance page.",
    cost: "VPK is free; School Readiness helps eligible families pay for child care",
    free: false,
    source: "https://www.elcpinellas.net/",
    verified: "2026-11-09"
  },

  /* ---------- Seniors & disability ---------- */
  {
    id: "area-agency-on-aging",
    name: "Area Agency on Aging of Pasco-Pinellas",
    categories: ["seniors", "disability"],
    description: "The Elder Helpline connects older adults, adults with disabilities, and caregivers with in-home support, caregiver help, nutrition and wellness programs, and disaster preparation.",
    area: "countywide",
    areaNote: "Serves Pasco and Pinellas counties.",
    locations: [
      { label: "Gadsden Building, Suite 100", address: "9549 Koger Blvd. N, St. Petersburg, FL 33702", city: "St. Petersburg", lat: 27.85886, lng: -82.64041, geocoder: "OSM" }
    ],
    phones: [
      { label: "Elder Helpline (toll-free)", number: "1-800-963-5337" },
      { label: "Helpline from outside the area", number: "727-217-8111" },
      { label: "Administrative office", number: "727-570-9696" }
    ],
    website: "https://www.agingcarefl.org/",
    hours: "Mon–Fri 8 a.m.–5 p.m.; closed federal holidays",
    eligibility: "Older adults, adults with disabilities, and caregivers. Each service has its own requirements.",
    cost: "Not listed",
    free: false,
    source: "https://www.agingcarefl.org/",
    verified: "2026-11-09"
  },
  {
    id: "neighborly-care-network",
    name: "Neighborly Care Network",
    categories: ["seniors", "food", "transportation"],
    description: "Meals on Wheels home-delivered meals, Senior Cafe dining, Adult Day Services, and curb-to-curb, wheelchair-accessible rides to medical appointments, shopping, and meal sites.",
    area: "countywide",
    locations: [
      { label: "Administration office", address: "5225 Tech Data Dr., Suite 102, Clearwater, FL 33760", city: "Clearwater", lat: 27.91684, lng: -82.71072, geocoder: "Census" }
    ],
    phones: [{ label: "Main line", number: "727-573-9444" }],
    website: "https://www.neighborly.org/",
    hours: "Not listed",
    eligibility: "Meals on Wheels: age 60 and older. Other services: not listed.",
    cost: "Not listed",
    free: false,
    source: "https://www.neighborly.org/",
    verified: "2026-11-09"
  },
  {
    id: "lighthouse-of-pinellas",
    name: "Lighthouse of Pinellas",
    categories: ["disability", "jobs"],
    description: "Free vision rehabilitation, adaptive training, counseling, and job readiness for people of all ages who are blind or visually impaired, with programs for infants, children, teens, and adults.",
    area: "countywide",
    locations: [
      { label: "Main office, Suite 103", address: "6925 112th Circle N, Largo, FL 33773", city: "Largo", lat: 27.87411, lng: -82.7344, geocoder: "Census" }
    ],
    phones: [{ label: "Main line", number: "727-544-4433" }],
    website: "https://lhpfl.org/",
    hours: "Mon–Fri 8:30 a.m.–4:30 p.m.",
    eligibility: "People who are blind or visually impaired",
    cost: "Free core services",
    free: true,
    source: "https://lhpfl.org/",
    verified: "2026-11-09"
  },

  /* ---------- Transportation ---------- */
  {
    id: "psta",
    name: "Pinellas Suncoast Transit Authority (PSTA)",
    categories: ["transportation"],
    description: "Countywide bus service, including the SunRunner. Reduced fares for seniors 65+, people with disabilities, and Medicare cardholders. Children 8 and under ride free, as do Pinellas public school students ages 9–18 and USF, SPC, and PTC students with ID. PSTA Access offers paratransit.",
    area: "countywide",
    locations: [
      { label: "Grand Central Station", address: "3180 Central Ave., St. Petersburg, FL 33712", city: "St. Petersburg", lat: 27.7709, lng: -82.67651, geocoder: "OSM", hours: "Front window: Mon–Fri 7:15 a.m.–5:15 p.m.; Sat–Sun 8:15 a.m.–4:15 p.m." },
      { label: "Clearwater Customer Service Center (Park Street)", address: "525 Park St., Clearwater, FL 33756", city: "Clearwater", lat: 27.9647, lng: -82.79958, geocoder: "OSM", hours: "Mon–Fri 7:15 a.m.–5:15 p.m.; Sat–Sun 8:15 a.m.–4:15 p.m." },
      { label: "Pinellas Park Customer Service Center", address: "3801 70th Ave. N, Pinellas Park, FL 33781", city: "Pinellas Park", lat: 27.83568, lng: -82.68587, geocoder: "OSM", hours: "Mon–Fri 7:15 a.m.–5:15 p.m.; Sat–Sun 8:15 a.m.–4:15 p.m." }
    ],
    phones: [
      { label: "InfoLine (trip planning)", number: "727-540-1900" },
      { label: "PSTA Access (paratransit)", number: "727-540-1888" },
      { label: "InfoLine TDD", number: "727-540-0603" }
    ],
    website: "https://psta.net/",
    links: [{ label: "Fares", url: "https://psta.net/rider-info/fares/" }],
    hours: "InfoLine: Mon–Fri 6 a.m.–8 p.m.; Sat 7 a.m.–8 p.m.; Sun & holidays 8 a.m.–4:30 p.m.",
    eligibility: "Anyone can ride. Reduced fares require an accepted ID.",
    cost: "PSTA's fare page lists $2.25 per ride with daily and monthly caps, but also shows a second fare table. Confirm current fares with PSTA.",
    free: false,
    source: "https://psta.net/contact-us/",
    verified: "2026-11-09"
  },
  {
    id: "psta-td-program",
    name: "PSTA Transportation Disadvantaged (TD) Program",
    categories: ["transportation", "financial"],
    description: "Low-cost bus passes for Pinellas residents with limited income who have no other way to get to life-sustaining trips such as work, medical care, and groceries. A late-shift option covers jobs between 10 p.m. and 6 a.m.",
    area: "countywide",
    areaNote: "Qualifying St. Petersburg residents ride for free.",
    locations: [],
    phones: [{ label: "TD Program", number: "727-540-1900" }],
    website: "https://psta.net/rider-info/fares/",
    hours: "Call during InfoLine hours",
    eligibility: "Pinellas County residents with household income at or below 200% of the federal poverty level (for 2026: $31,920/year for 1 person, $42,480 for 2, $53,760 for 3, $63,600 for 4) who can't get rides from household members.",
    cost: "$13 for 31 days or $5 for 10 days; free for qualifying St. Petersburg residents",
    free: false,
    source: "https://psta.net/rider-info/fares/",
    verified: "2026-11-09"
  },

  /* ---------- Veterans ---------- */
  {
    id: "bay-pines-va",
    name: "Bay Pines VA Healthcare System",
    categories: ["veterans", "health"],
    description: "VA medical center for veterans. Pinellas County Veterans Services notes that its Emergency Department is open 24/7 regardless of discharge status or VA enrollment.",
    area: "countywide",
    locations: [
      { label: "C.W. Bill Young VA Medical Center", address: "10000 Bay Pines Blvd., Bay Pines, FL 33744", city: "Bay Pines", lat: 27.80721, lng: -82.77336, geocoder: "OSM" }
    ],
    phones: [
      { label: "Main line", number: "727-398-6661" },
      { label: "Toll-free", number: "888-820-0230" },
      { label: "Veterans Crisis Line: dial 988, then press 1", number: "988" }
    ],
    website: "https://www.va.gov/bay-pines-health-care/",
    hours: "Emergency Department open 24/7",
    eligibility: "Veterans (VA health care eligibility rules apply)",
    cost: "Not listed",
    free: false,
    source: "https://pinellas.gov/department/veterans-services/",
    verified: "2026-11-09"
  },

  /* ---------- Financial & legal ---------- */
  {
    id: "gulfcoast-legal-services",
    name: "Gulfcoast Legal Services",
    categories: ["financial", "housing", "family"],
    description: "Free civil legal help with evictions and landlord disputes, foreclosure, protection orders and family law, consumer problems, IRS letters, and immigration relief for crime victims. Apply online 24/7 or walk in.",
    area: "unstated",
    areaNote: "Pinellas office in downtown St. Petersburg.",
    locations: [
      { label: "Pinellas office, Suite 420", address: "501 1st Ave. N, St. Petersburg, FL 33701", city: "St. Petersburg", lat: 27.77235, lng: -82.64051, geocoder: "OSM" }
    ],
    phones: [{ label: "Pinellas office", number: "727-821-0726" }],
    website: "https://www.gulfcoastlegal.org/",
    hours: "Walk-ins Mon–Fri 9 a.m.–5 p.m. (closed 12:30–1:30 p.m. Mon–Thu; no walk-ins after 12:30 p.m. Fri)",
    eligibility: "Assessed through the online intake form",
    cost: "Free",
    free: true,
    source: "https://www.gulfcoastlegal.org/",
    verified: "2026-11-09"
  }
];


/* ---------------------------------------------------------
   Events — real, dated events from official calendars.
   Times are Eastern Time. An event disappears automatically
   once its end time has passed, so the site never shows an
   expired event as upcoming.
   --------------------------------------------------------- */
const events = [
  {
    id: "cstb-ai-job-seekers-2026-11-10",
    title: "Harnessing AI for Job Seekers",
    type: "Educational workshop",
    start: "2026-11-10T10:00:00-05:00",
    end: "2026-11-10T11:00:00-05:00",
    location: "CareerSource Tampa Bay — St. Petersburg Center",
    address: "3420 8th Ave. S, St. Petersburg, FL",
    city: "St. Petersburg",
    organizer: "CareerSource Tampa Bay",
    description: "Learn to use AI to write resumes and cover letters that get through applicant tracking systems. In person; requires an EmployFlorida profile and separate sign-up.",
    cost: "Free",
    source: "https://careersourcetampabay.com/events/harnessing-ai-for-job-seekers-st-pete/2026-11-10/"
  },
  {
    id: "paychecks-patriots-resource-fair-2026-11-10",
    title: "Pinellas Paychecks for Patriots Resource Fair",
    type: "Job fair",
    start: "2026-11-10T10:00:00-05:00",
    end: "2026-11-10T12:00:00-05:00",
    location: "Pinellas Technical College — Clearwater Campus, Building 10",
    address: "6100 154th Ave. N, Clearwater, FL",
    city: "Clearwater",
    organizer: "CareerSource Tampa Bay",
    description: "For veterans, transitioning service members, and military spouses and families: resume reviews, professional photos, and community services.",
    cost: "Free",
    source: "https://careersourcetampabay.com/events/paychecks-for-patriots-resource-fair/"
  },
  {
    id: "the-hub-resource-series-2026-11-10",
    title: "The Hub Resource Series",
    type: "Community assistance",
    start: "2026-11-10T13:00:00-05:00",
    end: "2026-11-10T15:00:00-05:00",
    location: "CareerSource Tampa Bay — St. Petersburg Center",
    address: "3420 8th Ave. S, St. Petersburg, FL",
    city: "St. Petersburg",
    organizer: "CareerSource Tampa Bay",
    description: "Free monthly event with referrals for employment, mental health, housing, legal, food, and medical support.",
    cost: "Free",
    source: "https://careersourcetampabay.com/events/the-hub-resource-series/2026-11-10/"
  },
  {
    id: "paychecks-patriots-job-fair-2026-11-10",
    title: "Pinellas Paychecks for Patriots Job Fair",
    type: "Job fair",
    start: "2026-11-10T13:00:00-05:00",
    end: "2026-11-10T15:00:00-05:00",
    location: "Pinellas Technical College — Clearwater Campus, Building 10",
    address: "6100 154th Ave. N, Clearwater, FL",
    city: "Clearwater",
    organizer: "CareerSource Tampa Bay",
    description: "Hiring event connecting veterans and military families with local employers.",
    cost: "Not listed",
    source: "https://careersourcetampabay.com/events/pinellas-paychecks-for-patriots-job-fair/"
  },
  {
    id: "fraud-week-shredding-2026-11-14",
    title: "Fraud Awareness Week: Free Paper Shredding",
    type: "Community assistance",
    start: "2026-11-14T09:00:00-05:00",
    end: "2026-11-14T11:00:00-05:00",
    location: "East Lake High School",
    address: "1300 Silver Eagle Drive, Tarpon Springs, FL 34688",
    city: "East Lake",
    organizer: "Pinellas County Consumer Protection",
    description: "Free shredding for Pinellas County residents, limited to 3 boxes or bags per vehicle and ending early if the truck fills. The Sheriff's Office will also collect unused medication.",
    cost: "Free",
    source: "https://pinellas.gov/event/fraud-awareness-week-2026-free-paper-shredding-event/"
  },
  {
    id: "hhw-north-2026-11-14",
    title: "Household Chemical Collection at HHW North",
    type: "Community assistance",
    start: "2026-11-14T09:00:00-05:00",
    end: "2026-11-14T14:00:00-05:00",
    location: "HHW North",
    address: "29582 US Highway 19 N, Clearwater, FL",
    city: "Clearwater",
    organizer: "Pinellas County Solid Waste",
    description: "Drop-off collection for household chemicals so they can be disposed of safely.",
    cost: "Not listed",
    source: "https://pinellas.gov/event/household-chemical-collection-at-hhw-north-42/"
  },
  {
    id: "fraud-week-identity-theft-2026-11-16",
    title: "Fraud Awareness Week: Identity Theft",
    type: "Senior program",
    start: "2026-11-16T10:00:00-05:00",
    end: "2026-11-16T11:00:00-05:00",
    location: "Gulfport Senior Center",
    address: "5501 27th Ave. S, Gulfport, FL",
    city: "Gulfport",
    organizer: "Pinellas County Consumer Protection",
    description: "Learn how to protect your personal information and recognize identity theft.",
    cost: "Not listed",
    source: "https://pinellas.gov/event/fraud-awareness-week-2026-identity-theft/"
  },
  {
    id: "fraud-week-scams-2026-11-17",
    title: "Fraud Awareness Week: Scam Presentation",
    type: "Senior program",
    start: "2026-11-17T10:00:00-05:00",
    end: "2026-11-17T11:00:00-05:00",
    location: "Dr. William E. Hale Senior Activity Center",
    address: "330 Douglas Ave., Dunedin, FL",
    city: "Dunedin",
    organizer: "Pinellas County Consumer Protection",
    description: "A presentation on common scams and how to avoid them.",
    cost: "Not listed",
    source: "https://pinellas.gov/event/fraud-awareness-week-2026-scam-presentation/"
  }
];

// Official calendars to check for more events (shown on the Events page).
const eventSources = [
  { name: "Pinellas County Government calendar", url: "https://pinellas.gov/events/", note: "County workshops, collections, and public meetings" },
  { name: "CareerSource Tampa Bay events", url: "https://careersourcetampabay.com/events/", note: "Hiring events, job fairs, and free career workshops" },
  { name: "Feeding Tampa Bay — Find Food", url: "https://ftb.org/findfood/", note: "Food pantries and distributions near you" },
  { name: "Pinellas Public Library Cooperative", url: "https://www.pplc.us/", note: "Library programs across 14 member libraries" },
  { name: "First Contact (211)", url: "https://www.firstcontact.org/", note: "Call 211 for help finding programs any time" }
];
