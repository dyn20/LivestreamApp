class PublicController{
    home(req,res){
        res.render('home');
    }
}
module.exports = new PublicController;