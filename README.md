# WonderLust 🌍

A full-stack Airbnb-inspired web application where users can explore, create, and review travel listings from around the world.

**Live Demo:** [wonderlust-52hi.onrender.com](https://wonderlust-52hi.onrender.com)

---

## Features

- **Browse Listings** — Explore travel stays filtered by category (Mountains, Castles, Beaches, and more) or search by country
- **User Authentication** — Secure sign up, log in, and log out using Passport.js
- **Create & Manage Listings** — Authenticated users can add new listings with images, location, price, and category
- **Interactive Maps** — Each listing displays its location on an interactive Mapbox map using forward geocoding
- **Reviews & Ratings** — Logged-in users can leave star-rated reviews on listings
- **Authorization** — Only listing owners can edit or delete their listings; only review authors can delete their reviews
- **Image Uploads** — Listing images are uploaded and stored on Cloudinary via Multer
- **Persistent Sessions** — Sessions are stored in MongoDB Atlas using connect-mongo
- **Flash Messages** — User-friendly success and error notifications across all actions

---

## Tech Stack

**Frontend**

- EJS (Embedded JavaScript Templates)
- ejs-mate for layout boilerplate
- Bootstrap 5
- Mapbox GL JS

**Backend**

- Node.js
- Express.js
- Passport.js + passport-local-mongoose (authentication)
- Multer + Cloudinary (image uploads)
- Mapbox SDK (geocoding)
- Joi (server-side validation)

**Database**

- MongoDB with Mongoose
- MongoDB Atlas (production)
- connect-mongo (session store)

---

## Project Structure

```
WonderLust/
├── controller/        # Route handler logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/            # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/            # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/             # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   └── users/
├── public/            # Static assets
│   ├── css/
│   └── js/
├── utils/             # Helper utilities
├── middleware.js      # Custom middleware
├── schema.js          # Joi validation schemas
├── cloudConfig.js     # Cloudinary configuration
└── app.js             # Entry point
```

---

## Local Setup

### Prerequisites

- Node.js
- MongoDB (local instance)
- Cloudinary account
- Mapbox account

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/shrutijanghu246-ctrl/WonderLust.git
   cd WonderLust
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:

   ```
   ATLASDB_URL=your_mongodb_atlas_url
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   ```

4. **Run the app**

   ```bash
   node app.js
   ```

5. Visit `http://localhost:8080`

---

## Deployment

This project is deployed on **Render** with **MongoDB Atlas** as the production database and **Cloudinary** for image storage.

---

## Author

**Shruti Janghu**  
B.Tech Civil Engineering, NIT Kurukshetra  
[GitHub](https://github.com/shrutijanghu246-ctrl)
