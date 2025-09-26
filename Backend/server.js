
// require('dotenv').config({ path: __dirname + '/.env' }); // ensures correct file path
// console.log("✅ STRIPE_SECRET_KEY from env:", process.env.STRIPE_SECRET_KEY);
const express = require('express');
const morgan = require('morgan');
var mongooses = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Stripe = require('stripe');
var https = require('https');
var fs = require('fs');

const path = require('path');


//Models

var admin=require('./models/adminmodel');
// var image=require('./models/imagemodel');
var banner_image=require('./models/bannermodel');
var specialisttype=require('./models/specialistTypeModel');
var specialist=require('./models/specialistmodel');
var workexperience=require('./models/workexperiencemodel');
var yearofpassing=require('./models/yearofpassingmodel');
var caretakerdetail=require('./models/caretakermodel');
var appointmentdetail=require('./models/appointmentmodel');
var slotdetail=require('./models/slotmodel');
var patientmodel=require('./models/patientmodel');
var notificationmodel=require('./models/notificationmodel');
var paymentmodel=require('./models/paymentmodel');
// bring routes

const adminroute=require('./routes/adminrouter');
// const imageroute=require('./routes/imagerouter');
const bannerimageroute=require('./routes/bannerrouter');
const doctorrouter=require('./routes/doctorrouter');
const settingsrouter=require('./routes/settingsrouter');
const caretakerrouter=require('./routes/caretakerrouter');
const patientrouter=require('./routes/patientrouter');

// app
const app = express();

// db

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,  
};
mongooses
    .connect(process.env.DATABASE_LOCAL, option)
    .then(() => console.log('DB connected')).catch(err => {
       console.log(err)
       console.log(err.message)
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'production') {
}
app.use(cors());

app.use('/public', express.static('public'));
// routes middleware

app.use('/api',adminroute);
app.use('/api',bannerimageroute);
// app.use('/api',imageroute);
app.use('/api',doctorrouter);
app.use('/api',settingsrouter);
app.use('/api',caretakerrouter);
app.use('/api',patientrouter);

// port
const port = process.env.PORT || 3255;
// var key = fs.readFileSync('./key.crt','utf8');
// var cert = fs.readFileSync('./cert.crt','utf8');
// var options = {
//   key: key,
//   cert: cert
// };

//   var httpsServer = https.createServer(options, app);

//   httpsServer.listen(port);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
