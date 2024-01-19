const Contact = require("../models/contatctmodel");
const asynchandler = require("express-async-handler");

const getContact = asynchandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ contacts });
});

const specificContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  // if contact is found
  res.status(200).json(contact);
});

const createContact = asynchandler(async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  // if it is empty
  if (!name || !email) {
    res.status(404).json({ message: "all fields are required" });
  }
  // if not create an object of this model
  const contact = await Contact.create({
    name,
    email,
  });
  res.status(201).json(contact);
});

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedcontact);
});

const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  await Contact.deleteOne({ _id: req.params.id})
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  specificContact,
  createContact,
  updateContact,
  deleteContact,
};
