Template.admin_looks.helpers({
	
	'looks': function(){
		
		return Looks.find({});
		
	},
	
	'hasImages': function(){
		return LookImages.find({owner: this._id}).count();
	},
	
	'images': function(){
		return LookImages.find({owner: this._id}).map(function(image){
			console.log(Images.findOne(image.file));
			return Images.findOne(image.file);
		});
	}
	
})

Template.admin_looks.events({
	
	'change .look-image-upload': function(event){
		
		var look = this;
		
		FS.Utility.eachFile(event, function(file){
			Images.insert(file, function(error, fileObj){
				LookImages.insert({
					file: fileObj._id,
					owner: look._id
				})
			})
		})
		
	}
	
})
