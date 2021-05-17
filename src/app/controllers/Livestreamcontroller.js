const { set } = require("mongoose");

class LivestreamController
{
    Livestream(req,res,next)
    {
        res.render('livestream.ejs')
    }
}
module.exports = new LivestreamController;