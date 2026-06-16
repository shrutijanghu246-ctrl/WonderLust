const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  //index
  .get(wrapAsync(listingController.index))
  //create
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createNewListing),
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

router
  .route("/:id")
  //show
  .get(wrapAsync(listingController.showListing))
  //update
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  //delete
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
