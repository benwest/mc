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
                lastName: 'Stavnsbjerg',
                addresses: []
            }
        });
    
        Accounts.createUser({
            email: 'willie@dad.com',
            password: 'whatever',
            profile: {
                firstName: 'William',
                lastName: 'Dadson',
                addresses: []
            }
        });
    
        Accounts.createUser({
            email: 'steve@dad.com',
            password: 'whatever',
            profile: {
                firstName: 'Stephen',
                lastName: 'Dadson',
                addresses: []
            }
        });
    
        Accounts.createUser({
            email: 'sweetcake@mum.com',
            password: 'whatever',
            profile: {
                firstName: 'Emily',
                lastName: 'Mumsworth',
                addresses: []
            }
        });
    
        Accounts.createUser({
            email: 'sheels@mum.com',
            password: 'whatever',
            profile: {
                firstName: 'Sheila',
                lastName: 'Mumsworth',
                addresses: []
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
            name: 'T-Shirts',
            sizing: 'tops',
            gender: 'Both'
        });
        
        GarmentTypes.insert({
            name: 'Jumpers',
            sizing: 'tops',
            gender: 'Both'
        });
        
        GarmentTypes.insert({
            name: 'Trousers',
            sizing: 'bottoms',
            gender: 'Both'
        });
        
        GarmentTypes.insert({
            name: 'Socks',
            sizing: 'shoes & socks',
            gender: 'Both'
        });
        
        GarmentTypes.insert({
            name: 'Skirts',
            sizing: 'bottoms',
            gender: 'Both'
        });
        
        GarmentTypes.insert({
            name: 'Dresses',
            sizing: 'dresses',
            gender: 'Both'
        });
                
        GarmentTypes.insert({
            name: 'Shoes',
            sizing: 'shoes & socks',
            gender: 'Both'
        });
        
    }
    
    if(!LookImages.find({}).count()){
	    
	    var shells = Looks.insert({
		    name: 'Sea shells on the sea shore'
	    })
	    
	    var prints = Looks.insert({
		    name: 'Pint-sized prints'
	    })
	    
	    var happy = Looks.insert({
		    name: 'Happy-go-lucky'
	    })
	    
	    var basics = Looks.insert({
		    name: 'Back to basics'
	    })
	    
	    var roar = Looks.insert({
		    name: 'Hear them roar'
	    })
	    
	    var fjords = Looks.insert({
		    name: 'Over the Fjords and Far Away'
	    })
	    
	    var home = Looks.insert({
		    name: 'Make Yourself at Home'
	    })
	    
	    var glad = Looks.insert({
		    name: 'Glad Rags'
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/1/img0.jpg',
		    w: 683,
		    h: 1024,
		    owner: shells
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/1/img1.jpg',
		    w: 683,
		    h: 1024,
		    owner: shells
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/1/img2.jpg',
		    w: 693,
		    h: 1024,
		    owner: shells
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/1/img3.jpg',
		    w: 1024,
		    h: 683,
		    owner: shells
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img0.jpg',
		    w: 447,
		    h: 670,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img1.jpg',
		    w: 447,
		    h: 670,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img2.jpg',
		    w: 740,
		    h: 629,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img3.jpg',
		    w: 447,
		    h: 670,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img4.jpg',
		    w: 492,
		    h: 535,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/2/img5.jpg',
		    w: 670,
		    h: 1005,
		    owner: prints
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/3/img0.jpg',
		    w: 455,
		    h: 683,
		    owner: happy
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/3/img1.jpg',
		    w: 447,
		    h: 670,
		    owner: happy
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/3/img2.jpg',
		    w: 1024,
		    h: 683,
		    owner: happy
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/3/img3.jpg',
		    w: 455,
		    h: 683,
		    owner: happy
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/4/img0.jpg',
		    w: 670,
		    h: 1005,
		    owner: basics
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/4/img1.jpg',
		    w: 670,
		    h: 1005,
		    owner: basics
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/4/img2.jpg',
		    w: 683,
		    h: 683,
		    owner: basics
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/4/img3.jpg',
		    w: 1024,
		    h: 683,
		    owner: basics
	    })
	    
	    LookImages.insert({
		    url: '/img/looks/4/img4.jpg',
		    w: 456,
		    h: 683,
		    owner: basics
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img0.jpg',
		    w: 447,
		    h: 670,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img1.jpg',
		    w: 446,
		    h: 669,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img2.jpg',
		    w: 683,
		    h: 683,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img3.jpg',
		    w: 456,
		    h: 683,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img4.jpg',
		    w: 683,
		    h: 1024,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/5/img5.jpg',
		    w: 455,
		    h: 683,
		    owner: roar
	    })
	    
		LookImages.insert({
		    url: '/img/looks/6/img0.jpg',
		    w: 447,
		    h: 670,
		    owner: fjords
	    })
	    
		LookImages.insert({
		    url: '/img/looks/6/img1.jpg',
		    w: 365,
		    h: 548,
		    owner: fjords
	    })
	    
		LookImages.insert({
		    url: '/img/looks/6/img2.jpg',
		    w: 670,
		    h: 1005,
		    owner: fjords
	    })
	    
		LookImages.insert({
		    url: '/img/looks/7/img0.jpg',
		    w: 447,
		    h: 670,
		    owner: home
	    })
	    
		LookImages.insert({
		    url: '/img/looks/8/img0.jpg',
		    w: 670,
		    h: 1005,
		    owner: glad
	    })
	    
	    
	    
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