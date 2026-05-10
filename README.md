<p align="center">
  <img src="public/images/logo5.png" alt="StayVista Logo" width="80" />
</p>

<h1 align="center">StayVista</h1>

<p align="center">
  <strong>An End-to-End Hospitality & Vacation Rental Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#environment-variables">Environment Variables</a> ·
  <a href="#api-routes">API Routes</a> ·
  <a href="#project-structure">Project Structure</a> ·
  <a href="#screenshots">Screenshots</a>
</p>

---

## Overview

**StayVista** is a full-stack vacation rental platform that enables property owners to list their spaces, guests to discover and review stays, and administrators to manage the complete property lifecycle. The application features dynamic map-based location rendering, cloud-hosted image management, multi-role authorization, and a responsive design optimized for both desktop and mobile devices.

---

## Features

| Category | Details |
|---|---|
| **Property Listings** | Full CRUD operations — create, read, update, and delete listings with title, description, price, location, and images |
| **Cloud Image Hosting** | Image upload via Multer with Cloudinary storage; automatic fallback to default image if none provided |
| **Interactive Maps** | MapTiler API integration for geocoding and dynamic map rendering with pinned location markers |
| **User Authentication** | Sign up, log in, log out, and profile management via Passport.js with session persistence |
| **Multi-Role Authorization** | Owner vs. Guest permissions — only listing owners can edit/delete their properties |
| **Reviews & Ratings** | Star-based rating system (1–5) with per-user review authoring and author-only deletion |
| **Search** | Location-based search with case-insensitive regex matching |
| **Tax Toggle** | Dynamic GST calculation toggle (18%) on listing prices |
| **Filter Carousel** | Swipeable category filter bar with touch, trackpad, and button navigation |
| **Form Validation** | Server-side validation with Joi schemas; client-side validation with Bootstrap |
| **Flash Messages** | Success and error notifications via connect-flash |
| **Responsive Design** | Mobile-first layout with glassmorphism UI elements and micro-animations |
| **Session Store** | MongoDB-backed session persistence via connect-mongo with encrypted secrets |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js 5 |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Templating** | EJS + ejs-mate (layouts) |
| **Authentication** | Passport.js + passport-local-mongoose |
| **Validation** | Joi |
| **Image Upload** | Multer + multer-storage-cloudinary |
| **Cloud Storage** | Cloudinary |
| **Maps & Geocoding** | MapTiler SDK + Geocoding API |
| **Sessions** | express-session + connect-mongo |
| **HTTP Client** | Axios |
| **CSS Framework** | Bootstrap 5 + Custom CSS |
| **Icons** | Font Awesome 6 |

---

## Architecture

The application follows the **MVC (Model–View–Controller)** pattern:

```
┌─────────────────────────────────────────────────────┐
│                     Client (Browser)                │
│              EJS Views + Bootstrap + JS             │
└──────────────────────┬──────────────────────────────┘
                       │  HTTP Request
                       ▼
┌─────────────────────────────────────────────────────┐
│                    Express Router                   │
│         routes/listing.js · reviews.js · user.js    │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌────────────┐ ┌──────────┐ ┌──────────────┐
   │ Middleware  │ │Validators│ │  Controllers  │
   │ isLoggedIn  │ │Joi Schema│ │listings.js    │
   │ isOwner     │ │          │ │reviews.js     │
   │ saveRedirect│ │          │ │users.js       │
   └────────────┘ └──────────┘ └──────┬───────┘
                                      │
                       ┌──────────────┼──────────────┐
                       ▼              ▼              ▼
               ┌─────────────┐ ┌───────────┐ ┌────────────┐
               │  Mongoose   │ │Cloudinary │ │  MapTiler  │
               │  Models     │ │  Upload   │ │  Geocoding │
               │  (MongoDB)  │ │           │ │            │
               └─────────────┘ └───────────┘ └────────────┘
```

### Data Model Relationships

```
User ──┐
       ├── owns ──▶ Listing ◀── has many ── Review
       │                                      │
       └── authors ───────────────────────────┘
```

- **User** → has many **Listings** (as owner)
- **Listing** → has many **Reviews** (ObjectId references)
- **Review** → belongs to one **User** (as author)
- **Listing** → stores **GeoJSON Point** geometry for map coordinates

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **MongoDB Atlas** account (or local MongoDB instance)
- **Cloudinary** account
- **MapTiler** account (for API key)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/stayvista-app.git
cd stayvista-app

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables below)
cp .env.example .env

# 4. (Optional) Seed the database with sample listings
node init/index.js

# 5. Start the development server
node app.js
```

The application will be running at **http://localhost:3000**

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB
ATLAS_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# Session
SECRET=your_session_secret_here

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapTiler
MAPTILER_API_KEY=your_maptiler_api_key
```

---

## API Routes

### Listings

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/listings` | View all listings (with optional search) | Public |
| `GET` | `/listings/:id/show` | View a single listing with reviews and map | Public |
| `GET` | `/create` | Render create listing form | Login |
| `POST` | `/create` | Create a new listing | Login |
| `GET` | `/listings/:id/edit` | Render edit listing form | Owner |
| `PATCH` | `/listings/:id` | Update a listing | Owner |
| `DELETE` | `/listings/:id` | Delete a listing and its reviews | Owner |

### Reviews

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/listings/:id/reviews` | Add a review to a listing | Login |
| `DELETE` | `/listings/:id/reviews/:reviewid/delete` | Delete a review | Author |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/signup` | Render signup form | Public |
| `POST` | `/signup` | Register a new user | Public |
| `GET` | `/login` | Render login form | Public |
| `POST` | `/login` | Authenticate user | Public |
| `GET` | `/logout` | Render logout confirmation | Login |
| `POST` | `/logout` | Log out user | Login |
| `GET` | `/profile` | View user profile | Login |

---

## Project Structure

```
stayvista-app/
│
├── app.js                  # Application entry point & Express config
├── cloudConfig.js          # Cloudinary + Multer storage config
├── middleware.js            # Auth, ownership, & validation middleware
├── schema.js               # Joi validation schemas
├── package.json
│
├── controllers/
│   ├── listings.js         # Listing CRUD logic
│   ├── reviews.js          # Review create/delete logic
│   └── users.js            # Auth & profile logic
│
├── models/
│   ├── listings.js         # Listing schema (GeoJSON, image, refs)
│   ├── reviews.js          # Review schema (rating, comment, author)
│   └── users.js            # User schema (passport-local-mongoose)
│
├── routes/
│   ├── listing.js          # Listing routes
│   ├── reviews.js          # Review routes (mergeParams)
│   └── user.js             # Auth routes
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Master layout (navbar, footer, scripts)
│   ├── partials/
│   │   ├── navbar.ejs      # Navigation with search & glass buttons
│   │   ├── footer.ejs      # Footer
│   │   └── flash.ejs       # Flash message alerts
│   ├── index.ejs           # Home — listings grid, filters, tax toggle
│   ├── show.ejs            # Detail — image, info, reviews, map
│   ├── create.ejs          # New listing form
│   ├── edit.ejs            # Edit listing form
│   ├── login.ejs           # Login form
│   ├── signup.ejs          # Signup form
│   ├── logout.ejs          # Logout confirmation
│   ├── profile.ejs         # User profile
│   └── error.ejs           # Error display
│
├── public/
│   ├── style.css           # Main stylesheet (responsive + glassmorphism)
│   ├── review.css          # Star rating widget styles
│   ├── eedit.css           # Edit form spacing overrides
│   └── js/
│       └── script.js       # Bootstrap form validation
│
├── init/
│   ├── data.js             # Seed data (basic)
│   ├── data2.js            # Seed data (with geometry & owners)
│   └── index.js            # Database seeder script
│
└── utils/
    └── ExpressError.js     # Custom error class (status + message)
```

---

## Key Implementation Details

### Async Error Handling

All async route handlers are wrapped with `asyncWrap()` to catch rejected promises and forward them to the Express error-handling middleware:

```javascript
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
```

### Geocoding Pipeline

When a listing is created or updated, the location string is sent to the MapTiler Geocoding API. The returned GeoJSON `Point` geometry is stored directly in MongoDB, enabling map rendering on the detail page:

```javascript
const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(data.location)}.json?key=${mapToken}`;
const response = await axios.get(maptilerUrl);
// Store: response.data.features[0].geometry → { type: "Point", coordinates: [lng, lat] }
```

### Cascading Deletes

When a listing is deleted, all associated reviews are removed first to prevent orphaned documents:

```javascript
await review.deleteMany({ _id: { $in: thislisting.reviews } });
await Listing.findByIdAndDelete(id);
```

### Session Persistence

Sessions are stored in MongoDB via `connect-mongo` with encrypted secrets and a 24-hour touch interval to minimize database writes:

```javascript
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600,
});
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ by <strong>Himanshu Swami</strong>
</p>
