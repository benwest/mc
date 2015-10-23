Meteor.startup(function(){
    
    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
    
    //process.env.MAIL_URL = 'smtp://bongmail:bongbong@smtp.webfaction.com:587';
    
    if(!Meteor.users.find({}).count()){
    
        Accounts.createUser({
            email: 'anja@muddycreatures.com',
            username: 'admin',
            password: 'admin',
            profile: {
                firstName: 'Anja',
                lastName: 'Stavnsbjerg'
            }
        });
    
        Accounts.createUser({
            email: 'willie@dad.com',
            password: 'whatever',
            profile: {
                firstName: 'William',
                lastName: 'Dadson'
            }
        });
    
        Accounts.createUser({
            email: 'steve@dad.com',
            password: 'whatever',
            profile: {
                firstName: 'Stephen',
                lastName: 'Dadson'
            }
        });
    
        Accounts.createUser({
            email: 'sweetcake@mum.com',
            password: 'whatever',
            profile: {
                firstName: 'Emily',
                lastName: 'Mumsworth'
            }
        });
    
        Accounts.createUser({
            email: 'sheels@mum.com',
            password: 'whatever',
            profile: {
                firstName: 'Sheila',
                lastName: 'Mumsworth'
            }
        });
    
    }
    
    if(!Brands.find({}).count()){
        
        Brands.insert({
            name: 'American Apparel'
        });
        
        Brands.insert({
            name: 'Petit Bateau'
        });

        Brands.insert({
            name: 'Caramel'
        });
        
        Brands.insert({
            name: 'Cos'
        });
        
    }
    
    if(!Universes.find({}).count()){
        
        Universes.insert({
            name: 'Nautical'
        });
        
        Universes.insert({
            name: 'Great Outdoors'
        });
        
        Universes.insert({
            name: 'Summer Vibes'
        });
        
        Universes.insert({
            name: 'Disco'
        });
        
    }
    
    if(!Inventory.find().count()){
        
        Inventory.insert({
            brand: 'Petit Bateau',
            garment: 'T-shirt',
            description: 'Long sleeved with motif',
            size: '5',
            cost: 12,
            quantity: 5
        })
        
        Inventory.insert({
            brand: 'Petit Bateau',
            garment: 'Jumper',
            description: 'Red turtleneck with sailboat print',
            size: '3',
            cost: 12,
            quantity: 17
        })
        
        Inventory.insert({
            brand: 'Cos',
            garment: 'Trousers',
            description: 'Beige cotton twill chinos',
            size: '4',
            cost: 12,
            quantity: 20
        })
        
    }
    
    if(!GarmentTypes.find().count()){
        
        GarmentTypes.insert({
            name: 'T-Shirts'
        });
        
        GarmentTypes.insert({
            name: 'Jumpers'
        });
        
        GarmentTypes.insert({
            name: 'Trousers'
        });
        
        GarmentTypes.insert({
            name: 'Socks'
        });
        
    }
    
    var adminUser = Meteor.users.findOne({username: 'admin'});
    
    if(!Settings.findOne({owner: adminUser._id})){
        
        Settings.insert({
            owner: adminUser._id,
            daysToReturn: 10,
            minBrands: 1,
            minLooks: 1,
            minColors: 1
        });
        
    }

});