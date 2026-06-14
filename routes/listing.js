const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  }),
);

//New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("show.ejs", { listing });
  }),
);

// Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    console.log(req.user);
    newListing.owner = req.user._id;
    let url = req.body.listing.image;
    if (!url || url.trim() === "") {
      url =
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1000&auto=format&fit=crop";
    }

    newListing.image = {
      url: url,
      filename: "listingimage",
    };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }),
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
  }),
);

// Update Route - keep it simple, edit.ejs handles nesting already
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    let updateData = { ...req.body.listing };
    updateData.image = {
      url:
        req.body.listing.image ||
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1000&auto=format&fit=crop",
      filename: listing.image.filename || "listingimage",
    };

    await Listing.findByIdAndUpdate(id, updateData);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

//DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
