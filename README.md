# Wayfarer — Travel Route Planner

A single-file travel planning app for building multi-stop itineraries, tracking compliance requirements, and validating your trip dates — all stored locally in your browser with no server or sign-up required.

## Features

### 🗺️ Multi-Trip Dashboard
- Create and manage unlimited trips from a home dashboard
- Trip cards display a summary of stops, date range, total nights, and destinations
- Rename, duplicate, delete, or export any trip from a quick-access menu
- Import trips from a previously exported JSON file

### 📍 Itinerary Builder
- Add stops with city, country, arrival/departure dates, and optional notes
- Visual timeline with route connectors, country flag icons, and transit day indicators
- Auto-calculated stats: total destinations, nights, and countries visited
- Drag and drop stops to reorder them along your route

### ✅ Date Validation
- A **Valid** indicator sits beside the Itinerary heading and updates automatically
- Turns green when all stop dates are in the correct sequential order
- Turns red and highlights the specific date fields that are out of order
- Validates on every change — adding, editing, dragging, or removing a stop

### 🛡️ Compliance Checklist Generator
- Toggle trip variables: *Traveling with Pets*, *Driving a Vehicle*, *Traveling with Minors*, *Visa Required*
- Auto-generates a deadline-based compliance checklist from your trip's departure date
- Timeline view with filters by status (Pending/Done) and category (Health/Documents/Insurance/Vehicle)
- Priority tags (Critical/High/Medium/Low) and per-item progress tracking
- Add custom checklist items with your own deadlines and categories

### 💾 Local Persistence
- All trips, stops, settings, and compliance progress saved to browser localStorage
- Data survives page refresh and browser restart — no account needed
- Automatic background saving with a visible save status indicator

### 📤 Export & Import
- Export any trip to a JSON file for backup or sharing
- Import a previously exported trip — it is added alongside your existing trips
- Export your compliance checklist as an ICS calendar file for use in any calendar app

## Getting Started

1. **Open in browser** — open `index.html` in any modern browser; no install or build step required
2. **Create a trip** — click "Create New Trip" and give it a name
3. **Add stops** — click "Add Stop" and fill in the destination, dates, and notes
4. **Reorder stops** — drag the grip handle on any stop card to reorder your route
5. **Check validity** — the Valid indicator next to the heading flags any date conflicts immediately
6. **Configure compliance** — go to Trip Settings and toggle the options that apply to your trip
7. **Track progress** — work through the Compliance tab and check items off as you complete them

## Architecture

**Two-file design** — `index.html` for markup and styles, `app.js` for all application logic.

- No dependencies, no build step, no bundler
- Vanilla JavaScript (ES6+), CSS Grid and Flexbox, localStorage API
- Runs entirely in the browser; nothing leaves your device

## Compliance Rules

Wayfarer includes built-in compliance logic for:

### 🐾 Traveling with Pets
- Microchip verification (90 days before)
- Rabies vaccination (60 days before)
- Pet travel document / EU Passport (45 days before)
- Animal Health Certificate (10 days before)
- Tapeworm treatment (2 days before)

### 🚗 Driving a Vehicle
- International Driving Permit (30 days before)
- Green Card insurance (21 days before)
- Breakdown cover verification (21 days before)
- V5C logbook (7 days before)
- Country identifier sticker (3 days before)

### 👶 Traveling with Minors
- Child passport validity check (60 days before)
- Parental consent letter (14 days before)
- Birth certificate (7 days before)

### 🛂 Visa Required
- Travel insurance (70 days before)
- Visa application (56 days before)
- Accommodation / invitation letter (42 days before)

All deadlines are calculated from your trip's departure date and update automatically as you plan.

## Browser Support

- Chrome / Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Privacy

All data is stored locally in your browser's localStorage. No data is sent to any server. Your trips and compliance information remain entirely private on your device.

## License

MIT License — free to use, modify, and distribute.
