class PublicController{
    home(req,res){
        res.render('home.hbs');
    }
}
module.exports = new PublicController;