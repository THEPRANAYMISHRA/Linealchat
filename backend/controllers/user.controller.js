const { UserModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// this is for registration of user
const registerUser = async (req, res) => {
    let avatar = req.file.filename;

    const { email, password, name } = req.body;

    if (!email || !password || !name) {

        return res.status(401).json({ message: 'All fields are required' });
    } else {
        try {
            const isUserPressent = await UserModel.findOne({ email: email });
            if (isUserPressent) {
                return res.status(409).json({ message: "Email already exists" });
            } else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (hash) {
                        let new_user = new UserModel({
                            email: email,
                            password: hash,
                            name: name,
                            profilePhoto: {
                                filename: avatar,
                                url: 'http://localhost:3000/static/' + avatar,
                            }
                        });

                        await new_user.save();
                        return res.status(201).send({ message: 'Registered Successfully' });
                    } else {
                        throw err;
                    }
                });
            }
        } catch (error) {
            return res.status(400).send({ message: "Registered failed" })
        }
    }
}

// this is for login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'All fields are required' });
        }

        const isUserPresent = await UserModel.findOne({ email });

        if (isUserPresent) {
            bcrypt.compare(password, isUserPresent.password, async (err, result) => {
                if (result) {
                    try {
                        const token = jwt.sign(
                            { name: isUserPresent.name, email: isUserPresent.email },
                            process.env.JWT_TOKEN,
                            { expiresIn: '24h' }
                        );
                        return res.status(200).json({
                            token,
                            name: isUserPresent.name,
                            profilePhoto: isUserPresent.profilePhoto.url,
                        });
                    } catch (error) {
                        console.error('Error', error);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                } else {
                    return res.status(403).json({ message: 'Invalid Credentials' });
                }
            });
        } else {
            return res.status(404).json({ message: 'No user found with this Email' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { registerUser, loginUser };