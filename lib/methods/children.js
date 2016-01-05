//if(Meteor.isServer){

	var i2iCreateContact = queryFactory(
		"INSERT INTO tblCCContact (CompanyID, FirstName, ContUserDef01, ContUserDef02) " +
		"SELECT NextCustID, '{name}', '{gender}', '{dob}' " +
		"FROM tblCCCustNextID; " +
		"INSERT INTO tblCCContactWebLogin (WebSiteID, ContactID) " +
		"SELECT 'W1', Last_ID " +
		"FROM (SELECT MAX(ID) AS Last_ID FROM tblCCContact) AS derivedtbl_1; " +
		"INSERT INTO tblCCContactLinks (LinkContID, LinkCustID) " +
		"SELECT derivedtbl_1.Last_ID, tblCCCustNextID.NextCustID " +
		"FROM (SELECT MAX(ID) AS Last_ID FROM tblCCContact) AS derivedtbl_1 CROSS JOIN tblCCCustNextID;"
	)

//}

Meteor.methods({
	
	qAddChild: function(data){
		return i2iCreateContact({
			name: data.name,
			gender: data.gender,
			dob: moment(data.dob).format('MMMM Do YYYY')
		})
	},
	
	addChild: function(data){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(data, {
			name: String,
			gender: Match.OneOf('boy', 'girl'),
			dob: Date
		});
		
		if(Meteor.isServer){
			
			if(Meteor.settings.public.i2i){
			
				i2iCreateContact({
					name: data.name,
					gender: data.gender,
					dob: moment(data.dob).format('MMMM Do YYYY')
				})
				
				var i2iId = Sql.q("SELECT MAX(ID) AS Last_ID FROM tblCCContact")[0].Last_ID;
			
			}
					
			return Children.insert({
				owner: Meteor.userId(),
				name: data.name,
				dob: data.dob,
				gender: data.gender,
				i2iId: i2iId,
				colors: [],
				looks: [],
				sizing: {
					height: false,
					weight: false,
					shoes: false
				}
			});
			
		}
		
	},
	
	setSizing: function(id, sizes){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(sizes, {
			height: Number,
			weight: Number,
			shoes: Number
		});
		
		Children.update(id, {
			$set: {
				sizing: sizes
			}
		});
				
	},
	
	setColors: function(id, colors){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
				
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(colors, [String]);
		
		Children.update(id, {
			$set: {
				colors: colors
			}
		});
		
	},
	
	setLooks: function(id, looks){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
				
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(looks, [String]);
		
		Children.update(id, {
			$set: {
				looks: looks
			}
		});
		
	},
		
	removeChild: function(id){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		Children.remove(id);
		
	},
	
	updateSizes: function(id, sizes){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(sizes, {
			height: Number,
			weight: Number,
			shoes: Number
		});
		
		Children.update(id, {
			$set: {sizing: sizes}
		})
		
	}
	
})