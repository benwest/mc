Settings = new Mongo.Collection('settings');

Children = new Mongo.Collection('children');

Universes = new Mongo.Collection('universes');

Brands = new Mongo.Collection('brands');

GarmentTypes = new Mongo.Collection('garmentTypes');

Orders = new Mongo.Collection('orders');

OrderItems = new Mongo.Collection('orderItems');

Feedback = new Mongo.Collection('feedback');

Collections = {
	Settings: Settings,
	Children: Children,
	Universes: Universes,
	Brands: Brands,
	GarmentTypes: GarmentTypes,
	Orders: Orders,
	OrderItems: OrderItems,
	Feedback: Feedback
};