const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js")
const {isLoggegIn,isOwner,validateListing}=require("../middleware.js")
const listingControler=require("../controlers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingControler.index))
.post(isLoggegIn,upload.single('listing[image]'),validateListing,wrapAsync(listingControler.createListing))



//New route.
router.get("/new",isLoggegIn,listingControler.renderNewForm)


router.route("/:id")
.get(wrapAsync(listingControler.showListing))
.put(isLoggegIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingControler.updateListing))
.delete(isLoggegIn,isOwner,wrapAsync(listingControler.destroyListing))






//Edit route.
router.get("/:id/edit",isLoggegIn,isOwner,wrapAsync(listingControler.renderEditForm))


module.exports=router;
