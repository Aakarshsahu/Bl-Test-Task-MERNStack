const express = require("express");

const {homepage,register,userlogin,getAllUsers} = require("../controllers/usercontrollers.js");

const router = express.Router();

router.get("/homepage",homepage);
router.post("/register",register);
router.post("/userlogin",userlogin);
router.get("/getAllUsers",getAllUsers)


module.exports = router;