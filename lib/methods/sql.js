/*

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
*/

sqlLog = function(q){
	return Meteor.call('sql', q, function(e,r){console.log(e,r)});
}

Meteor.methods({
	
	sql: function(query){
		if(Meteor.isServer){
			return Sql.q(query);
		}
	},
	
	sqlOrderHeader: function(order){
		
		if(order.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.isServer) return Sql.q("SELECT * FROM tblSOMaster WHERE SONum='" + order.i2iId + "'");
		
	},
	
	sqlOrderDispatch: function(order){
		
		if(order.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		//if(Meteor.isServer) return Sql.q("SELECT * FROM tblSODispMaster");
		if(Meteor.isServer) return Sql.q("SELECT * FROM tblSODispMaster WHERE DispMasSONum='" + order.i2iId + "'");
		
	},
	
	sqlOrderLines: function(order){
		
		if(order.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.isServer) return Sql.q("SELECT * FROM tblSODetail WHERE SODetSONum='" + order.i2iId + "'");
		
	}
	
})