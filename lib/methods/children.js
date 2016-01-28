if(Meteor.isServer){
/*
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

	var i2iCreateContact = queryFactory(
		"INSERT INTO tblCCContact (CompanyID, FirstName, ContUserDef01, ContUserDef02) " +
		"SELECT '{parentId}', '{name}', '{gender}', '{dob}' " +
		"INSERT INTO tblCCContactWebLogin (WebSiteID, ContactID) " +
		"SELECT 'W1', Last_ID " +
		"FROM (SELECT MAX(ID) AS Last_ID FROM tblCCContact) AS derivedtbl_1; " +
		"INSERT INTO tblCCContactLinks (LinkCustID) " +
		"SELECT '{parentId}' " +
		"FROM tblCCCustNextID;"
	);
*/
	var i2iCreateContact = queryFactory(
		"INSERT INTO tblCCContact (CompanyID, FirstName, ContUserDef01, ContUserDef02) " +
		"SELECT '{parentId}', '{name}', '{gender}', '{dob}' " +
		"INSERT INTO tblCCContactWebLogin (WebSiteID, ContactID) " +
		"SELECT 'W1', Last_ID " +
		"FROM (SELECT MAX(ID) AS Last_ID FROM tblCCContact) AS derivedtbl_1; " +
		"INSERT INTO tblCCContactLinks (LinkCustID, LinkContID) " +
		"SELECT '{parentId}', derivedtbl_1.LastContID " +
		"FROM tblCCCustNextID CROSS JOIN " +
		"(SELECT MAX(ID) AS LastContID FROM tblCCContact) AS derivedtbl_1; " +
		"UPDATE tblCCContactNextID " +
		"SET NextCustID = derivedtbl_1.LastContID + 1 " +
		"FROM tblCCContactNextID CROSS JOIN " +
		"(SELECT MAX(ID) AS LastContID FROM tblCCContact) AS derivedtbl_1"
	);
	
}

Meteor.methods({
		
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
			
			var user = Meteor.users.findOne(this.userId);
			
			if(Meteor.settings.i2i){
								
				i2iCreateContact({
					name: data.name,
					gender: data.gender,
					dob: moment(data.dob).format('MMMM Do YYYY'),
					parentId: user.profile.i2iId
				})
				
				var i2iId = Sql.q("SELECT MAX(ID) AS Last_ID FROM tblCCContact")[0].Last_ID;
							
			}
			
			var child = Children.insert({
				owner: this.userId,
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
						
			if(Meteor.settings.email){			
				emailAnja(user.profile.firstName + ' ' + user.profile.lastName + ' has added a child, ' + data.name, [
					'Name: ' + data.name,
					'Gender: ' + data.gender,
					'Date of birth: ' + moment(data.dob).format('MMMM Do YYYY')
				]);
			}
			
			return child;
			
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
		
	}
		
})