Router.route('/',{
    name: 'home',
    action: function(){
        if(Meteor.user()){
            this.redirect('profile');
        } else {
            this.render('about');
        }
    }
});

Router.route('/about');

Router.route('/faq');

Router.route('/terms');

Router.route('/privacy-policy');

Router.route('/contact');

Router.route('/login', redirectLoggedIn);

Router.route('/signup', redirectLoggedIn);

Router.route('/reset-password/:token', {
    name: 'resetPassword',
    action: function(){
        if(Meteor.user()){
            this.redirect('profile');
        } else {
            this.render('resetPassword');
        }
    }
});

function redirectLoggedIn(){
    if(Meteor.user()){
        this.redirect('profile');
    } else {
        this.render(this.route.getName());
    }
}