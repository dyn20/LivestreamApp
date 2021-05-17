class LogoutController
{
    Logout(req, res)
    {
        res.clearCookie("token");
        res.clearCookie("email");
        res.redirect('/')
    }
}

module.exports =new LogoutController