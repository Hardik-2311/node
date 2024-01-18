//@desc Get all contact
//@route Get /api/contacts
//@access public
const asynchandler = require("express-async-handler");
const getContact = async (req, res) => {
  res.send("get all the contacts");
};

const specificContact = asynchandler(async (req, res) => {
  res.send(`get only this ${req.params.id} contact`);
});

const createContact = asynchandler(async (req, res) => {
  console.log(req.body);
  const { name, age, sex } = req.body;
  if (!name || !age || !sex) {
    res.status(404).json({ message: "all fields are required" });
  }
  res.send("post contact");
});

const updateContact = asynchandler(async (req, res) => {
  res.send(`update this contact ${req.params.id}`);
});

const deleteContact = asynchandler(async (req, res) => {
  res.send(`delete this ${req.params.id}`);
});

module.exports = {
  getContact,
  specificContact,
  createContact,
  updateContact,
  deleteContact,
};
