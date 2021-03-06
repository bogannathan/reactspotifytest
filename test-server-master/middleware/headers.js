//This headers file allows any origin. 
//headers are like passports that allow passage & determine what kind of actions a source can take

module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*')
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE')
	res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	next()
}