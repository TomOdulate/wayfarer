# Wayfarer — Travel Route Planner

A beautiful, single-file travel planning application with multi-trip support, itinerary management, and AI-powered compliance checklists.

## Features

### 🧭 **Multi-Trip Dashboard**
- Create and manage unlimited trips
- Quick-access trip cards showing stats (stops, dates, nights, destinations)
- Rename or delete trips with a simple menu

### 📍 **Itinerary Builder**
- Add sequential trip stops with city, country, arrival/departure dates, and notes
- Visual timeline with route connectors and country flags
- Auto-calculated stats: total nights, number of countries, date ranges

### ✅ **Compliance Checklist Generator**
- Toggle trip variables: *Traveling with Pets*, *Driving a Vehicle*, *Traveling with Minors*, *Visa Required*
- Automatically generate deadline-based compliance requirements
- Timeline view with filters by status (Pending/Done) and category (Health/Documents/Insurance/Vehicle)
- Priority tags (CRITICAL/HIGH/MEDIUM/LOW) and progress tracking

### 💾 **Full Local Persistence**
- All trips, stops, settings, and compliance checkmarks saved to browser localStorage
- Data survives page refresh and browser restart

## Getting Started

1. **Open in browser**: Simply open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
2. **Create a trip**: Click "Create New Trip" and enter a name
3. **Add stops**: Click "Add Stop" and fill in destination, dates, and notes
4. **Set trip settings**: Configure compliance requirements (Pets, Vehicle, Minors, Visa)
5. **Check compliance**: View auto-generated deadline timeline

## Architecture

**Single-file design** (`index.html`):
- All HTML, CSS, and JavaScript in one file
- No dependencies, no build step required
- ~1300 lines of code
- ~50KB minified

### Tech Stack
- Vanilla JavaScript (ES6+)
- CSS Grid & Flexbox
- LocalStorage API
- No frameworks or external libraries

## Compliance Rules

Wayfarer includes built-in compliance logic for:

### 🐾 **Traveling with Pets**
- Microchip verification (90 days before)
- Rabies vaccination (60 days before)
- Pet travel document/EU Passport (45 days before)
- Animal Health Certificate (10 days before)
- Tapeworm treatment (2 days before)

### 🚗 **Driving a Vehicle**
- International Driving Permit (30 days before)
- Green Card insurance (21 days before)
- Breakdown cover verification (21 days before)
- V5C logbook (7 days before)
- Country identifier sticker (3 days before)

### 👶 **Traveling with Minors**
- Child passport validity check (60 days before)
- Parental consent letter (14 days before)
- Birth certificate (7 days before)

### 🛂 **Visa Required**
- Travel insurance (70 days before)
- Visa application (56 days before)
- Accommodation/invitation letter (42 days before)

All deadlines are calculated from your trip's departure date and auto-update as you plan.

## Usage

### Creating a Trip
1. Click **"Create New Trip"** on the home dashboard
2. Enter a trip name (e.g., "Europe Summer 2026")
3. You'll be taken to the itinerary view

### Adding Stops
1. Click **"Add Stop"** in the itinerary view
2. Fill in:
   - City / Destination
   - Country
   - Arrival & Departure dates
   - Optional notes
3. Stops appear as a timeline with connectors

### Managing Compliance
1. Go to **"Trip Settings"**
2. Toggle options like "Traveling with Pets" or "Driving a Vehicle"
3. Your compliance checklist updates automatically in the **"Compliance & Documents"** tab
4. Check off items as you complete them

### Back to Home
Click the **back arrow (←)** in the header to return to the trip dashboard and switch between trips.

## Browser Support

- ✓ Chrome/Chromium (90+)
- ✓ Firefox (88+)
- ✓ Safari (14+)
- ✓ Edge (90+)

## Privacy

All data is stored locally in your browser's localStorage. **No data is sent to any server.** Your trips and compliance information remain private on your device.

## License

MIT License — feel free to use, modify, and distribute.

---

**Made with ❤️ for travelers who plan ahead.**
