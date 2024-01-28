const connectDB = require('../config/dbConn');
const User = require('../model/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    res.json({ 'message': 'Login successful!' });
    await connectDB();

    // const { user, pwd } = req.body;
    // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // // check for duplicate usernames in the db
    // const foundUser = await User.findOne({ username: user }).exec();
    // if (!foundUser) return res.sendStatus(401).json({'message': `User: ${user} not found`}); // Unauthorized
    // // evaluate password
    // const match = await bcrypt.compare(pwd, foundUser.password);
    // if(match) {
    //     const roles = Object.values(foundUser.roles);
    //     // create JWTs
    //     const accessToken = jwt.sign(
    //         { "UserInfo": {
    //                 "username": foundUser.username,
    //                 "roles": roles
    //             }
    //         }, 
    //         process.env.ACCESS_TOKEN_SECRET, 
    //         { expiresIn: '30s' }
    //     );
    //     const refreshToken = jwt.sign(
    //         { "username": foundUser.username }, 
    //         process.env.REFRESH_TOKEN_SECRET,
    //         { expiresIn: '1d'   }
    //     );
    //     // Saving refreshToken with current user
    //     foundUser.refreshToken = refreshToken;
    //     const result = await foundUser.save();
    //     console.log(result);

    //     res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', 
    //     secure: true, 
    //     maxAge: 24 * 60 * 60 * 1000 });
    //     res.json({ accessToken });
    // } else {
    //     res.sendStatus(401).json({ 'message': 'Invalid password.' });
    // }
}

module.exports = { handleLogin };