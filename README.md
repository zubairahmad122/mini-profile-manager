# Mini Profile Manager

A **responsive profile management UI** built with React and TypeScript, where users can create, edit, and view profile cards.

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or higher)

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## Features

* **Create Profile**: Add your name, age, and profile picture
* **View Profile**: See your profile in a card layout
* **Profile Details**: Click "View Profile" for a full-page view with a large image
* **Edit Profile**: Modify your information anytime
* **Delete Profile**: Clear everything with confirmation
* **Persistent Storage**: Profile saves automatically using `localStorage`

---

## Technical Choices

### React + TypeScript

* TypeScript provides type safety and prevents many common errors.
* React makes state management and conditional rendering simple and maintainable.

### Image Handling

* **Image URL input** — Paste any image URL
* **File upload with preview** — Upload from your device; images are converted to base64 so they persist in `localStorage`.
* Trade-off: base64 is ~33% larger than original, but fine for profile pictures under 5MB.

### localStorage for Persistence

* No backend needed — profile persists across reloads and browser restarts.

### Component Structure

* `CreateProfile` — Form for adding/editing profiles
* `PreviewProfile` — Card preview on main page
* `ProfileDetails` — Full-page profile view
* `Header` — App title and subtitle
* `Input` — Reusable form input (in `ui/` folder)
* `ProfileSelect` — Image selector with preview

> Each component does **one thing well**, following the single responsibility principle.

### State Management

* Simple `useState` in `App.tsx` handles profile data and edit mode.
* Redux or Context is unnecessary for this small app.

### Validation

* Hand-rolled validation:

  * Name: 2–50 characters
  * Age: 1–120
  * Image URL: Valid URL format
  * File upload: JPEG/PNG/GIF/WebP, max 5MB
* Shows inline errors and focuses the first invalid field

### CSS Approach

* Plain CSS with **BEM naming convention** (`__` and `--`)
* Responsive layout for mobile and desktop
* No CSS-in-JS or Tailwind

### Accessibility

* Fully keyboard navigable
* Proper ARIA labels and focus indicators
* Semantic HTML for screen readers

---

## Improvements With More Time

1. **Backend Integration** — REST API + database, user authentication, cloud image storage, multi-device sync
2. **Testing** — Unit, integration, and E2E tests for higher reliability
3. **Multiple Profiles** — List view, search/filter, categories, bulk operations
4. **Advanced Image Features** — Cropping/resizing, drag-and-drop, webcam capture
5. **Enhanced Form** — More fields (bio, email, social links), multi-step wizard
6. **PWA Features** — Offline support, installable on mobile, push notifications
7. **Animations** — Smooth transitions with Framer Motion
8. **Theme Customization** — Dark mode, custom color schemes, user preferences

---

## Project Structure

```
src/
├── components/
│   ├── CreateProfile.tsx    # Form for create/edit
│   ├── PreviewProfile.tsx   # Profile card preview
│   ├── ProfileDetails.tsx   # Full profile view
│   ├── Header.tsx           # App header
│   └── ui/
│       ├── Input.tsx        # Reusable input component
│       └── ProfileSelect.tsx # Image selector
├── App.tsx                  # Main app logic
├── App.css                  # Component styles
├── index.css                # Global styles
└── main.tsx                 # Entry point
```

---

## Browser Support

* Works on all modern browsers (Chrome, Firefox, Safari, Edge)
* Tested on desktop and mobile

---

## Notes

* Images stored as base64 in `localStorage`
* Single-user app (one profile at a time)
* No authentication
* `localStorage` has ~5–10MB limit, enough for profile data

---

Built with **React 18**, **TypeScript**, and **Vite**.

