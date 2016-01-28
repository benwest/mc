Settings = new Mongo.Collection('settings');

Children = new Mongo.Collection('children');

Looks = new Mongo.Collection('looks');

LookImages = new Mongo.Collection('lookImages');

Colors = new Mongo.Collection('colors');

GarmentTypes = new Mongo.Collection('garmentTypes');

Orders = new Mongo.Collection('orders');

Addresses = new Mongo.Collection('addresses');

Collections = {
	Settings: Settings,
	Children: Children,
	Looks: Looks,
	LookImages: LookImages,
	GarmentTypes: GarmentTypes,
	Orders: Orders,
	Addresses: Addresses
};


