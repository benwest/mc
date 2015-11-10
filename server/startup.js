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
		    name: 'Sea shells on the sea shore',
		    icon: '/img/looks/1/icon.svg'
	    })
	    
	    var prints = Looks.insert({
		    name: 'Pint-sized prints',
		    icon: '/img/looks/2/icon.svg'
	    })
	    
	    var happy = Looks.insert({
		    name: 'Happy-go-lucky',
		    icon: '/img/looks/3/icon.svg'
	    })
	    
	    var basics = Looks.insert({
		    name: 'Back to basics',
		    icon: '/img/looks/4/icon.svg'
	    })
	    
	    var roar = Looks.insert({
		    name: 'Hear them roar',
		    icon: '/img/looks/5/icon.svg'
	    })
	    
	    var fjords = Looks.insert({
		    name: 'Over the Fjords and Far Away',
		    icon: '/img/looks/6/icon.svg'
	    })
	    
	    var home = Looks.insert({
		    name: 'Make Yourself at Home',
		    icon: '/img/looks/7/icon.svg'
	    })
	    
	    var glad = Looks.insert({
		    name: 'Glad Rags',
		    icon: '/img/looks/8/icon.svg'
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
		    w: 1024,
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
    
    if(!Colors.find().count()){
	    
	    var colors = [{color:"#000000",name:"Licorice"},{color:"#ffffff",name:"Snow"},{color:"#941100",name:"Cayenne"},{color:"#945200",name:"Mocha"},{color:"#929000",name:"Asparagus"},{color:"#4f8f00",name:"Fern"},{color:"#008f00",name:"Clover"},{color:"#009051",name:"Moss"},{color:"#009193",name:"Teal"},{color:"#005493",name:"Ocean"},{color:"#011993",name:"Midnight"},{color:"#531b93",name:"Aubergine"},{color:"#942193",name:"Plum"},{color:"#941751",name:"Maroon"},{color:"#ff2600",name:"Fire Engine"},{color:"#ff9300",name:"Tangerine"},{color:"#fffb00",name:"Lemon"},{color:"#8efa00",name:"Lime"},{color:"#00f900",name:"Spring"},{color:"#00fa92",name:"Sea Foam"},{color:"#00fdff",name:"Turquoise"},{color:"#0096ff",name:"Aqua"},{color:"#0433ff",name:"Blueberry"},{color:"#9437ff",name:"Grape"},{color:"#ff40ff",name:"Magenta"},{color:"#ff2f92",name:"Strawberry"},{color:"#ff7e79",name:"Salmon"},{color:"#ffd479",name:"Cantaloupe"},{color:"#fffc79",name:"Banana"},{color:"#d4fb79",name:"Honeydew"},{color:"#73fa79",name:"Flora"},{color:"#73fcd6",name:"Spindrift"},{color:"#73fdff",name:"Ice"},{color:"#76d6ff",name:"Sky"},{color:"#7a81ff",name:"Orchid"},{color:"#d783ff",name:"Lavender"},{color:"#ff85ff",name:"Bubblegum"},{color:"#ff8ad8",name:"Carnation"}];
	    
	    _.each(colors, function(color) { Colors.insert(color) })
	    
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