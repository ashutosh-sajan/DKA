// var User = require ('../models/Users');


module.exports = {
	getAllUsers = (req,res) => {
		User.find({}, (err, users) => {
			if(err) res.status(500).send(err);
			res.status(200).json({ success: true, users });
		})
	}

	getUser = (req, res) => {
		User.findOne({ _id: req.params.id }, (err,user) => {
			if(err) res.status(500).send(err);
			res.status(200).json({ success: true, user });
		})
	}

	verifyToken = (req,res) => {
		User.findOne({ _id: req.user.id }, (err,user) => {
			if(err) res.status(500).send(err);
			res.status(200).json({ success: true, user });
		})
	}

	updateUser = (req,res) => {
		User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true }, (err,user) => {
			if(err) res.status(500).send(err);
			res.status(200).json({ success: true, user });
		})
	}

	deleteUser = (req,res) => {
		User.findOneAndDelete({ _id: req.user.id }, (err,user) => {
			if(err) res.status(500).send(err);
			res.status(200).json({ success: true, user });
		})
	}
}