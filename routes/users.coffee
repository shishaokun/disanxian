express = require 'express'
https = require 'https'

app = express()

router = express.Router()

map = require '../views/path.json'

getCtrl = (req, res) ->
	# console.log req
	url = req._parsedUrl.pathname
	query = req.query

	# console.log query

	info = map[url]

	if info 
		if info.lgnAble
			originalUrl = encodeURIComponent req.headers.host + req.originalUrl
			res.writeHead 302,
				'Location': '/login?url=' + originalUrl
			res.end()
		else
			res.render info.name,
				title: info.title
	else 
		res.status 404
		res.render 'error', 
			message: '您访问的页面找不到。Not found 404.',
			error: {},
			aboutUrl: '/aboutme'


app.get /^\/.*/, (req, res) ->
	# getCtrl req, res

	url = req._parsedUrl.pathname
	query = req.query

	# console.log query

	if url is '/aboutme' 
		res.render 'aboutme', {
			'title': '地三鲜工作室'
		}
	else
		res.writeHead 302,
			'Location': '/aboutme'
		res.end()

app.post /^\/.*/, (req, res) ->
	console.log req._parsedUrl.pathname


module.exports = app