const express=require("express");
const router=express.Router({mergeParams :true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {validateReview,isLoggegIn,isReviewAuthor}=require("../middleware.js")

const reviewControler=require("../controlers/reviews.js")


// post Review route
router.post("/",isLoggegIn, validateReview,wrapAsync(reviewControler.createReview))

// Delete  review route

router.delete("/:reviewId",isLoggegIn,isReviewAuthor, wrapAsync(reviewControler.destroyReview))

module.exports=router;