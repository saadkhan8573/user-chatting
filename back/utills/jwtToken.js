const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // option for cookie
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true
    };

    res.json({
        sucess: true,
        token,
        user
    })
}

module.exports = sendToken;