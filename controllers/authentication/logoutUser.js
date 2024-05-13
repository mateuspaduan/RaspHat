const logoutUser = async (req, res) => {
    return res.clearCookie('token').json({message: "Logged out!"});
};

module.exports = logoutUser;