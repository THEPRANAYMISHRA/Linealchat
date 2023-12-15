const express = require("express");
const multer = require('multer');
const { registerUser, loginUser } = require("../controllers/user.controller");
const { userAuthMiddleware } = require("../middleware/auth.user");
const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

userRouter.post("/register", upload.single("avatar"), registerUser);

userRouter.post("/login", loginUser)

module.exports = { userRouter };