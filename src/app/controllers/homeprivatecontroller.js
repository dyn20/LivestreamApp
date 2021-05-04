class PublicController{
    home(req,res){
        res.render('homeprivate');
    }
}
module.exports = new PublicController;