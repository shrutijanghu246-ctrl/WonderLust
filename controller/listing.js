const Listing = require("../models/listing");

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
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
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
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
