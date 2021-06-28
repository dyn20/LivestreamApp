const roomID = require("../models/roomid");
const {uid} = require('uid');

class LivestreamController
{
    Livestream(req,res)
    {
        res.render('livestream.ejs');
    }
}
module.exports = new LivestreamController;