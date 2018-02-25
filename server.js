const express=require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now } ${req.url} ${req.method}`;
	fs.appendFile('server.log', log + '\n');
	console.log(now , req.url ,req.method);
	next();
});
// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentDate',()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});
app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageHome:'home Page',
		sayHello:'hello Everyone',
		});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'abt Page',
		sayHello:'hello Everyone'
	});
});
app.use(express.static(__dirname+'/public'));
app.get('/bad',(req,res)=>{
	res.send({
		error: 404,
		errorMessage:'Unable to load json data'
	});
});
app.listen(3000);