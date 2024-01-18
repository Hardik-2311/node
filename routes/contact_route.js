const express = require("express");
const router = express.Router();
const {getContact}=require("../controllers/contact_controllers")
const {specificContact}=require("../controllers/contact_controllers")
const {createContact}=require("../controllers/contact_controllers")
const {updateContact}=require("../controllers/contact_controllers")
const {deleteContact}=require("../controllers/contact_controllers")
// get all the contacts
router.route("/").get(getContact);


// get a specific contact
router.route("/:id").get(specificContact);

// create a contact
router.route("/").post(createContact);


// update a contact
router.route("/:id").put(updateContact);


// delete a contact
router.route("/:id").delete(deleteContact);

module.exports = router;
