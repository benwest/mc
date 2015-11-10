Settings = new Mongo.Collection('settings');

Children = new Mongo.Collection('children');

Looks = new Mongo.Collection('looks');

LookImages = new Mongo.Collection('lookImages');

Brands = new Mongo.Collection('brands');

Colors = new Mongo.Collection('colors');

GarmentTypes = new Mongo.Collection('garmentTypes');

Orders = new Mongo.Collection('orders');

OrderItems = new Mongo.Collection('orderItems');

Addresses = new Mongo.Collection('addresses');

Feedback = new Mongo.Collection('feedback');

Collections = {
	Settings: Settings,
	Children: Children,
	Looks: Looks,
	LookImages: LookImages,
	Brands: Brands,
	GarmentTypes: GarmentTypes,
	Orders: Orders,
	OrderItems: OrderItems,
	Addresses: Addresses,
	Feedback: Feedback
};