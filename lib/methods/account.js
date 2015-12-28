//if(Meteor.isServer){
		
	var i2iInsertCustomer = queryFactory(
		"INSERT INTO tblCCCust (ID, CustName, Email, Tel, CustType, DefTaxCode, CustCurrCode) " +
		"SELECT NextCustID, '{firstName} {lastName}', '{email}', '{phone}', 'A1', 'S', 'GBR' AS CurrencyCode " +
		"FROM vwMagentoCustomerNextID; " +
		"UPDATE vwMagentoCustomerNextID " +
		"SET NextCustID = NextCustID + 1"
	);
		
	var i2iUpdateName = queryFactory(
		"UPDATE tblCCCust " +
		"SET CustName='{firstName} {lastName}' " +
		"WHERE ID={i2iId};"
	);
	
	var i2iUpdatePhone = queryFactory(
		"UPDATE tblCCCust " +
		"SET Tel='{phone}' " +
		"WHERE ID={i2iId};"
	)
	
	var i2iUpdateEmail = queryFactory(
		"UPDATE tblCCCust " +
		"SET Email='{email}' " +
		"WHERE ID={i2iId};"
	)
	
	var i2iUpdateBraintree = queryFactory(
		"UPDATE tblCCCust " +
		"SET UD1='{braintreeId}' " +
		"WHERE ID={i2iId};"
	)
	
//}


Meteor.methods({
	
	createAccount: function(customer){
		
		check(customer, {
			email: String,
			firstName: String,
			lastName: String,
			phone: String,
			password: String
		});
				
		if(Meteor.isServer){
			
			if( Accounts.findUserByEmail(customer.email) ) throw new Meteor.Error('user-exists', 'This e-mail address is already registered.');
						
			customer.i2iId = Sql.q('SELECT NextCustId FROM vwMagentoCustomerNextID')[0].NextCustId;
			
			i2iInsertCustomer(customer);
			
			return Accounts.createUser({
				email: customer.email,
				password: customer.password,
				profile: {
					firstName: customer.firstName,
					lastName: customer.lastName,
					phone: customer.phone,
					i2iId: customer.i2iId
				}
			});
			
		}
		
	},
	
	changeName: function(first, last){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(first, String);
		check(last, String);
		
		if(Meteor.isServer){
			i2iUpdateName({
				firstName: first,
				lastName: last,
				i2iId: Meteor.users.findOne(this.userId).profile.i2iId
			});
		}
		
        Meteor.users.update(this.userId, {
            $set: {
                'profile.firstName': first,
                'profile.lastName': last
            }
        });
        		
	},
	
	changePhoneNumber: function(number){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(number, String);
		
		if(Meteor.isServer){
			i2iUpdatePhone({
				phone: number,
				i2iId: Meteor.users.findOne(this.userId).profile.i2iId
			})
		}
		
        Meteor.users.update(this.userId, {
            $set: {
                'profile.phone': number
            }
        });
		
	},
	
	changeEmail: function(newEmail){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(newEmail, String);
		
		if(!/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,13})$/.test(newEmail)){
			throw new Meteor.Error('invalid-email', 'Please enter a valid e-mail address');
		}
		
		var oldEmail = Meteor.users.findOne(this.userId).emails[0].address;
		
		if(oldEmail === newEmail) return;
		
		if(Meteor.isServer){
			i2iUpdateEmail({
				email: newEmail,
				i2iId: Meteor.users.findOne(this.userId).profile.i2iId
			})
		}
				
		if(!this.isSimulation){
			
			Accounts.removeEmail(this.userId, oldEmail);
			Accounts.addEmail(this.userId, newEmail);
			Accounts.sendVerificationEmail(this.userId, newEmail);
			
		}
		
	},
	
	sendVerificationEmail: function(){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.users.findOne(this.userId).emails[0].verified) return;
		
		Accounts.sendVerificationEmail(this.userId);
		
	}
		
})