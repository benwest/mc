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
    
    }
    
    GarmentTypes.remove({});
      
    GarmentTypes.insert({
        name: 'T-Shirts',
        gender: 'Both'
    });
    
    GarmentTypes.insert({
        name: 'Jumpers',
        gender: 'Both'
    });
    
    GarmentTypes.insert({
        name: 'Trousers',
        gender: 'Both'
    });
    
    GarmentTypes.insert({
        name: 'Socks',
        gender: 'Both'
    });
    
    GarmentTypes.insert({
        name: 'Skirts',
        gender: 'Girl'
    });
    
    GarmentTypes.insert({
        name: 'Dresses',
        gender: 'Girl'
    });
            
    GarmentTypes.insert({
        name: 'Shoes',
        gender: 'Both'
    });
    
    
    Colors.remove({});
	    
	var colors = [{color:"#000000",name:"Licorice"},{color:"#ffffff",name:"Snow"},{color:"#941100",name:"Cayenne"},{color:"#945200",name:"Mocha"},{color:"#929000",name:"Asparagus"},{color:"#4f8f00",name:"Fern"},{color:"#008f00",name:"Clover"},{color:"#009051",name:"Moss"},{color:"#009193",name:"Teal"},{color:"#005493",name:"Ocean"},{color:"#011993",name:"Midnight"},{color:"#531b93",name:"Aubergine"},{color:"#942193",name:"Plum"},{color:"#941751",name:"Maroon"},{color:"#ff2600",name:"Fire Engine"},{color:"#ff9300",name:"Tangerine"},{color:"#fffb00",name:"Lemon"},{color:"#8efa00",name:"Lime"},{color:"#00f900",name:"Spring"},{color:"#00fa92",name:"Sea Foam"},{color:"#00fdff",name:"Turquoise"},{color:"#0096ff",name:"Aqua"},{color:"#0433ff",name:"Blueberry"},{color:"#9437ff",name:"Grape"},{color:"#ff40ff",name:"Magenta"},{color:"#ff2f92",name:"Strawberry"},{color:"#ff7e79",name:"Salmon"},{color:"#ffd479",name:"Cantaloupe"},{color:"#fffc79",name:"Banana"},{color:"#d4fb79",name:"Honeydew"},{color:"#73fa79",name:"Flora"},{color:"#73fcd6",name:"Spindrift"},{color:"#73fdff",name:"Ice"},{color:"#76d6ff",name:"Sky"},{color:"#7a81ff",name:"Orchid"},{color:"#d783ff",name:"Lavender"},{color:"#ff85ff",name:"Bubblegum"},{color:"#ff8ad8",name:"Carnation"}];
	    
	_.each(colors, function(color) { Colors.insert(color) })
    
    var adminUser = Meteor.users.findOne({username: 'admin'});
    
    if(!Settings.findOne({owner: adminUser._id})){
        
        Settings.insert({
            owner: adminUser._id,
            minLooks: 1,
            minColors: 1,
            maxAge: 4
        });
        
    }
    
    Looks.remove({});
    	    
    var looks = [
    	['Sea shells on the sea shore', 'both'],
		['Pint-sized prints', 'both'],
		['Happy-go-lucky', 'girl'],
		['Back to basics', 'both'],
		['Hear them roar', 'both'],
		['Over the Fjords and Far Away', 'girl'],
		['Make Yourself at Home', 'both'],
		['Glad Rags', 'both'],
		['Surprise me!', 'both']
	].map(function(look, i){
		
		return Looks.insert({
			name: look[0],
			gender: look[1],
			icon: '/img/looks/' + (i+1) + '/icon.svg',
			iconOrange: '/img/looks/' + (i+1) + '/icon_orange.svg',
			thumb: '/img/looks/' + (i+1) + '/thumb.jpg'
		})
		
	})
	
	LookImages.remove({});
		
	    
    LookImages.insert({
	    url: '/img/looks/1/img0.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[0]
    })
    
    LookImages.insert({
	    url: '/img/looks/1/img1.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[0]
    })
    
    LookImages.insert({
	    url: '/img/looks/1/img2.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[0]
    })
    
    LookImages.insert({
	    url: '/img/looks/1/img3.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[0]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img0.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[1]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img1.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[1]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img2.jpg',
	    w: 1200,
	    h: 1021,
	    owner: looks[1]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img3.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[1]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img4.jpg',
	    w: 1102,
	    h: 1200,
	    owner: looks[1]
    })
    
    LookImages.insert({
	    url: '/img/looks/2/img5.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[1]
    })

    LookImages.insert({
	    url: '/img/looks/2/img6.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[1]
    })	

    LookImages.insert({
	    url: '/img/looks/3/img0.jpg',
	    w: 1200,
	    h: 919,
	    owner: looks[2]
    })
    
    LookImages.insert({
	    url: '/img/looks/3/img1.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[2]
    })
    
    LookImages.insert({
	    url: '/img/looks/3/img2.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[2]
    })
    
    LookImages.insert({
	    url: '/img/looks/3/img3.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[2]
    })
    
    LookImages.insert({
	    url: '/img/looks/4/img0.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[3]
    })
    
    LookImages.insert({
	    url: '/img/looks/4/img1.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[3]
    })
    
    LookImages.insert({
	    url: '/img/looks/4/img2.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[3]
    })
    
    LookImages.insert({
	    url: '/img/looks/4/img3.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[3]
    })
    
    LookImages.insert({
	    url: '/img/looks/4/img4.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[3]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img0.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img1.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img2.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img3.jpg',
	    w: 1200,
	    h: 829,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img4.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/5/img5.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[4]
    })
    
	LookImages.insert({
	    url: '/img/looks/6/img0.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[5]
    })
    
	LookImages.insert({
	    url: '/img/looks/6/img1.jpg',
	    w: 1200,
	    h: 849,
	    owner: looks[5]
    })
    
	LookImages.insert({
	    url: '/img/looks/6/img2.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[5]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img0.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img1.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img2.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img3.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img4.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/7/img5.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[6]
    })
    
	LookImages.insert({
	    url: '/img/looks/8/img0.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[7]
    })
    
	LookImages.insert({
	    url: '/img/looks/8/img1.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[7]
    })
    
	LookImages.insert({
	    url: '/img/looks/8/img2.jpg',
	    w: 1200,
	    h: 800,
	    owner: looks[7]
    })
    
	LookImages.insert({
	    url: '/img/looks/8/img3.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[7]
    })
    
	LookImages.insert({
	    url: '/img/looks/8/img4.jpg',
	    w: 800,
	    h: 1200,
	    owner: looks[7]
    })    

});