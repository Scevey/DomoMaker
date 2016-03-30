var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;
var delName;
var delAge;
var delLevel
var makerPage = function(req,res){
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console,log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		res.render('app',{csrfToken: req.csrfToken(), domos:docs});
	});
};
var makeDomo = function(req,res){
	if(!req.body.name || !req.body.age){
		return res.status(400).json({error: "RAWR! name age and level are required"});
	}
	var domoData = {
		name: req.body.name,
		age: req.body.age,
		level: req.body.level,
		owner: req.session.account._id 
	};
	
	var newDomo = new Domo.DomoModel(domoData);
	
	newDomo.save(function(err){
		if(err){
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		res.json({redirect: '/maker'});
	});
};
var deleteDomo = function(req,res){
	var domoData = {
		name: req.body.delName,
		age: req.body.delAge,
		level: req.body.delLevel,
		owner: req.session.account._id,
		id: req.body.delID
	};
    Domo.DomoModel.findByID(req.body.delID, function(err, doc) {
        //errs, handle them
        if(err) {
            return res.json({err:err}); //if error, return it            
        }
        
        //if no matches, let them know (does not necessarily have to be an error since technically it worked correctly)
        if(!doc) {
            return res.json({error: "No Domos found"});
        }
		doc.remove(function(err) {
			if(err) {
				return res.json({err:err}); //if error, return it
			}
        
        //return success
			res.json({redirect: '/maker'});
		});
};
module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.del = deleteDomo;