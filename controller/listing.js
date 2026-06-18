const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
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
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createNewListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  let url = req.file
    ? req.file.path
    : "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1000&auto=format&fit=crop";
  let filename = req.file ? req.file.filename : "listingimage";

  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  let updateData = { ...req.body.listing };

  if (req.file) {
    updateData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await Listing.findByIdAndUpdate(id, updateData);
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};

module.exports.index = async (req, res) => {
  const { category, country } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (country) filter.country = { $regex: country, $options: "i" };
  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", { allListings });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;
  const results = await Listing.distinct("country", {
    country: { $regex: q, $options: "i" },
  });
  res.json(results);
};
