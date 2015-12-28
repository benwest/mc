//if(Meteor.isServer){
	
	function template(template, data) {
	    return template.replace(/{([^{}]*)}/g,
	        function (a, b) {
	            var r = data[b];
	            return typeof r === 'string' || typeof r === 'number' ? r : a;
	        }
	    );
	};
	
	var customerUpdateTemplate = "" +
		"INSERT INTO tblCCCust" +
		"(ID, CustName, Email, Tel, CustType, DefTaxCode, CustCurrCode) " +
		"SELECT NextCustID, '{firstName} {lastName}', '{email}', '{phone}', 'A1', 'S', 'GBR' AS CurrencyCode " +
		"FROM vwMagentoCustomerNextID; " +
		"UPDATE vwMagentoCustomerNextID " +
		"SET NextCustID = NextCustID + 1";
		
	function customerUpdateQuery(data){
		return template(customerUpdateTemplate, data);
	}
	
//}


Meteor.methods({
	
	sql: function(query){
		if(Meteor.isServer){
			return Sql.q(query);
		}
	},
	
	sqlInsertCustomer: function(customer){
				
		check(customer, {
			email: String,
			firstName: String,
			lastName: String,
			phone: String
		})
		
		var query = customerUpdateQuery(customer);
		
		//return query;
		
		return Sql.q(query);
		
	}
	
})