if(process.env.NODE_ENV !="production"){
  require("dotenv").config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); 
const methodOverride = require("method-override");
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo")
{import('tailwindcss').Config}
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const bodyParser = require('body-parser');

const Listing = require("./models/listing.js");
const Laundary = require("./models/laundary.js");
const Education = require("./models/education.js");
const User = require("./models/user.js");
const Customer = require("./models/customer.js");
const Review = require("./models/review.js");
const FAQ = require('./models/faqs.js');
const dbUrl = process.env.ATLASDB_URL;
const {isLoggedIn} =require ("./middleware.js")
const {saveRedirectUrl} =require ("./middleware.js")
main() 
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE", err)
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})
app.get("/laundary", async (req, res) => {
  const allListings = await Laundary.find({});
  
  res.render("listings.ejs", {  allListings: allListings });
});
app.get("/login", async (req, res) => {
  res.render("login.ejs");
});
app.get("/register", async (req, res) => {
  res.render("register.ejs");
});
app.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  const allReviews = await Review.find({});
  res.render("index.ejs", { allReviews : allReviews, allListings: allListings });
});
app.get("/about", async (req, res) => {
    res.render("about.ejs");
});
app.get("/geo", isLoggedIn,async (req, res) => {const allowedEmail = "freeforfire15@gmail.com"; 
  if (req.user && req.user.email !== allowedEmail) {    res.render("geolocation.ejs"); }
    else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
   

});
app.get('/profile', isLoggedIn ,async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.render("profile.ejs", { user }); 
});

app.get("/education",  async (req, res) => {
  const allListings = await Education.find({});
  res.render("education.ejs", { allListings });
});
app.get("/new",  isLoggedIn ,async (req, res) => { const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email === allowedEmail) {  res.render("new.ejs"); }
    else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
   
   
  
 
 });app.get("/newReview",  isLoggedIn ,async (req, res) => { const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email !== allowedEmail) {  res.render("reviewnew.ejs"); }
    else {
    res.status(403).send("Access denied: You are not authorized to view this page.");}});
  
  app.post("/newReview", isLoggedIn , async (req, res) =>  { const allowedEmail = "freeforfire15@gmail.com";  

    if (req.user && req.user.email !== allowedEmail) {
      const newreview = new Review(req.body.histing); 
      await newreview.save();
     res.redirect("/");
    } else {
      res.status(403).send("Access denied: You are not authorized to view this page.");
    }
   
   
  
 
 });

  app.get("/educationnew", isLoggedIn , async (req, res) => { const allowedEmail = "freeforfire15@gmail.com";  

    if (req.user && req.user.email === allowedEmail) {
      res.render("educationnew.ejs");
    } else {
      res.status(403).send("Access denied: You are not authorized to view this page.");
    }
   
  });
  app.get("/newlaundary", isLoggedIn , async (req, res) => { const allowedEmail = "freeforfire15@gmail.com";  

    if (req.user && req.user.email === allowedEmail) {
      res.render("newlaundary.ejs");
    } else {
      res.status(403).send("Access denied: You are not authorized to view this page.");
    }
   
  });
  
  
app.post("/new", isLoggedIn , async (req, res) =>  { const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email === allowedEmail) {
    const newlistings = new Listing(req.body.listing); 
    await newlistings.save();
   res.redirect("/");
  } else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
 
 
});

app.post("/newlaundary", isLoggedIn , async (req, res) =>  { const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email === allowedEmail) {
    const newlistings = new Laundary(req.body.listing); 
    await newlistings.save();
   res.redirect("/");
  } else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
 
 
});
app.post("/educationnew", isLoggedIn , async (req, res) =>  { const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email === allowedEmail) {
    
  const neweducation = new Education(req.body.histing); 
  await neweducation.save();
 res.redirect("/education");
  } else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
 

});
 

  app.post("/register", async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Registered Successfully");
        res.redirect("/");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/");
    }
  });


  app.post("/login",saveRedirectUrl,
    passport.authenticate("local",{failureRedirect: "/",failureFlash: true}), async (req, res) => { let redirectUrl = res.locals.redirectUrl ;
    res.redirect(redirectUrl);
  });
  
  app.get("/logout",isLoggedIn ,  async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are now logged out!");
      res.redirect("/");
    });
  });
  
  app.get("/addtocart/:productid",isLoggedIn,async (req,res)=>  { const allowedEmail = "freeforfire15@gmail.com";  

    if (req.user && req.user.email !== allowedEmail) {

  let user =await User.findOne({email:req.user.email})
  user.cart.push(req.params.productid)
  await user.save(); 
  req.flash("success", "Added to cart");res.redirect("/checkout")
    } else {
      res.status(403).send("Access denied: You are not authorized to view this page.");
    }
  })
  
  
app.get("/checkout", isLoggedIn , async (req, res) => {
  let user =await User.findOne({email:req.user.email}).populate("cart")
 

  const cartTitles = user.cart.map(item => item.title).join(", ");
  const totalAmount = user.cart.reduce((sum, item) => sum + item.price, 0);
  res.render("checkout.ejs",{user: user, cartTitles: cartTitles, totalAmount: totalAmount});
  
});
// Checkout Route
app.post("/checkout", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate("cart");
    
    // Validate cart
    if (!user.cart || user.cart.length === 0) {
      req.flash("error", "Your cart is empty");
      return res.redirect("/checkout");
    }

    // Create order
    const newOrder = new Customer({
      name: req.body.customer.name,
      address: req.body.customer.address,
      phone: req.body.customer.phone,
      totalcloth: req.body.customer.totalcloth,
      totalweight: req.body.customer.totalweight,
      nameofcloth: req.body.customer.nameofcloth,
      products: user.cart.map(item => item.title).join(", "),
      totalamount: user.cart.reduce((sum, item) => sum + item.price, 0),
      user: user._id
    });

    const savedOrder = await newOrder.save();

    // Update user
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { orders: savedOrder._id },
        $set: { cart: [] }
      },
      { new: true }
    );

    req.flash("success", "Order placed successfully!");
    res.redirect("/order");

  } catch (err) {
    console.error("Checkout error:", err);
    req.flash("error", "Failed to process your order");
    res.redirect("/checkout");
  }
});

// Orders Route
app.get("/order", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "orders",
        options: { sort: { createdAt: -1 } }
      });

    res.render("orders", {
      orders: user.orders,
      formatDate: (date) => date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });

  } catch (err) {
    console.error("Orders error:", err);
    req.flash("error", "Failed to load orders");
    res.redirect("/");
  }
});

app.get("/customer", isLoggedIn, async (req, res) => {
  const allowedEmail = "freeforfire15@gmail.com";  

  if (req.user && req.user.email === allowedEmail) {
    const allListings = await Customer.find({});
    res.render("customer.ejs", { allListings });
  } else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
});
// Add these routes at the end before app.listen()

// Chatbot Page Route
app.get('/chatbot', (req, res) => {
  res.render('chatbot.ejs'); // Make sure you have chatbot.ejs in views
});

// Admin Panel Route
app.get('/admin', isLoggedIn, (req, res) => {
  const allowedEmail = "freeforfire15@gmail.com";  
  if (req.user && req.user.email === allowedEmail) {
    res.render('newchat.ejs'); // Make sure you have admin.ejs in views
  } else {
    res.status(403).send("Access denied: You are not authorized to view this page.");
  }
});

// Enhanced FAQ API Routes with Admin Auth
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/faqs', isLoggedIn, async (req, res) => {
  const allowedEmail = "freeforfire15@gmail.com";
  
  try {
    // Validate admin access
    if (req.user?.email !== allowedEmail) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Validate input
    const { question, answer, keywords } = req.body;
    if (!question?.trim() || !answer?.trim() || !keywords?.length) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create FAQ
    const faq = new FAQ({
      question: question.trim(),
      answer: answer.trim(),
      keywords: keywords.filter(k => k.trim().length > 0)
    });

    await faq.save();
    res.status(201).json(faq);
    
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.delete('/api/faqs/:id', isLoggedIn, async (req, res) => {
  const allowedEmail = "freeforfire15@gmail.com";
  try {
    if (req.user && req.user.email === allowedEmail) {
      await FAQ.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    res.status(404).json({ error: 'FAQ not found' });
  }
});

// Add this route before your app.listen()
app.get('/api/laundaries', async (req, res) => {
  try {
      const laundaries = await Laundary.find({});
      res.json(laundaries);
  } catch (error) {
      console.error('Error fetching laundaries:', error);
      res.status(500).json({ error: 'Server error' });
  }
});


 app.listen(8080, () => {
      console.log("server is listening to port 8080");
  }); 

  