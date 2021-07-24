
var id;
var express=require("express");
var mongoose=require("mongoose");
var passport= require("passport");
var LocalStrategy= require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var request=require("request");
var bodyParser=require("body-parser");
mongoose.Promise = global.Promise;
try {
     mongoose.connect(
      'mongodb+srv://Gautam79:Gautam79@cluster0.hswd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Database is connected")
    );

  } catch (e) {
    console.log("could not connect database");
}
var userSchema= new mongoose.Schema({
	email: {type:String ,required:true, unique:true},
	username: {type:String ,required:true, unique:true},
	password:{type:String}
});

var commenting=new mongoose.Schema({
	imbd_id:{type:String},
	user_name:{type :String,required:true},
	comment:{type:String,required:true}
});

var review=mongoose.model("review",commenting);
userSchema.plugin(passportLocalMongoose);
var user=mongoose.model("user",userSchema);

var app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"I am the god dont mess with me boss",
	resave:false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()) );
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
var movie1="http://www.omdbapi.com/?apikey=eaf698e1&s=";
var detail="http://www.omdbapi.com/?apikey=eaf698e1&i=";
var movie2="marvel";
app.get("/",function(req,res)
{
	var url=movie1+movie2;
	request(url,function(error,response,body)
		{
			if(!error && response.statusCode==200)
				{	
					var cat=JSON.parse(body);
					var title=cat["Search"];
					console.log(title);
					if(title != null)
					{
						res.render("movies.ejs",{web : title});
					}
					else
					{
						movie2="marvel";
						res.redirect("/");
					}
				}
			else
				res.send("sorry an error occured");
		});
});

app.post("/Signup",function(req,res)
{
	console.log("its the signup part");
	if(false)
		{
			console.log("its error caused by me");
		}
	else  
	{
		console.log("error is in register part")
		user.register(new user({username:req.body.username}),req.body.password,function(err,user)
			{
				if(!err)
				{
					console.log("Signup form has an error please check it" );
					res.redirect("/rockstart");
				}
				else
				{
					console.log("boss find the solution");
					passport.authenticate("local")(req,res,function()
					{
					console.log("its the authentication part");
					res.redirect("/");
					});

				}
			});
	}
}); 
app.post("/title",function(req,res)
{
	movie2=req.body.search;
	res.redirect("/");
});
app.get("/id/:detail",function(req,res)
{
	var mk=req.params.detail;
	id=mk;
	var url=detail+mk;
	review.find({imbd_id : mk},function(err,review)
	{
		if(err)
		{
			request(url,function(error,response,body)
			{
			if(!error && response.statusCode==200)
				{	
					var cat=JSON.parse(body);
					res.render("movies2.ejs",{web :cat});
					console.log("Page two opening correctly");

				}
			else
				res.send("sorry an error piche hat occured");
			});
		}
		else
		{
			request(url,function(error,response,body)
			{
			if(!error && response.statusCode==200)
				{	
					var cat=JSON.parse(body);
					res.render("movies2.ejs",{web :cat,user_comment : review});
					console.log(review);
					console.log("Page two opening correctly");

				}
			else
				res.send("sorry an error occured bhad m jao");
			});
		}
	});
});
app.post("/comment",function(req,res)
{
	console.log("its working uto this point");
		review.create({
		imbd_id :id,
		user_name:req.body.user_name,
		comment : req.body.comment
	});
		res.redirect("/id/"+id);
},function(err,review)
{
	if(err)
	{
		console.log("There is error wih saving")
	}
	else
	{
		console.log("data saved succesfully")
	}
});



app.listen(process.env.PORT,function()
{
	console.log("server has started !!!");
});
