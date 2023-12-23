const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
           if (err, foundUser.username !== decoded.username) return res.sendStatus(403);
           const roles = Object.values(foundUsers.roles);
           const accessToken = jwt.sign(
                { "UserInfo": {
                    "username": decoded.username,
                    "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
           );
           res.json({ accessToken });
        }
    )
}


// const User = require('../model/User');
// const jwt = require('jsonwebtoken');

// const handleRefreshToken = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

//     const foundUser = await User.findOne({ refreshToken }).exec();

//     // Detect refresh token reuse!
//     if (!foundUser) {
//         jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET,
//             async (err, decode) => {
//                 if (err) return refreshToken.sendStatus(403); // Forbidden
//                 // Delete refresh tokens of hacked user
//                 const hackedUser = await User.findOne({ username: decoded.username }).exec();
//                 hackedUser.refreshToken = [];
//                 const result = await hackedUser.save();
//              }
//         )
//         return res.sendStatus(403); // Forbidden
//     }

//     const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

//     // evaluate jwt
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//             if (err) {
//                 // expired refresh token
//                 foundUser.refreshToken = [...newRefreshTokenArray];
//                 const result = await foundUser.save();
//             }
//             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
//             // Refresh token was still valid
//             const roles = Object.values(foundUser.roles);
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": decoded.username,
//                         "roles": roles
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '10s' }
//             );

//             const newRefreshToken = jwt.sign(
//                 { "username": foundUser.username },
//                 process.env.REFRESH_TOKEN_SECRET,
//                 { expiresIn: '15s' }
//             );
//             // Saving refreshToken with current user
//             foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//             const result = await foundUser.save();

//             // Creates Secure Cookies with refresh token
//             res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
                
//             res.json({ accessToken });
//         }
//     );
// }

module.exports = { handleRefreshToken };