//import installed packages
const express = require("express");
const morgan = require("morgan");
const { Prohairesis } = require("prohairesis");
const bodyParser = require("body-parser");
const { response } = require("express");
require('dotenv').config();
const validator = require('validator');
const path = require("path");

const app = express();
const port = process.env.PORT || 8888;

//connection to local db - mysql
const mySQLString =
"mysql://" + process.env.DB_USERNAME + ":"+ process.env.DB_PASSWORD + "@" +process.env.DB_HOSTNAME+"/"+process.env.DB_DEFAULT_SCHEMA+"?reconnect=true";
const database = new Prohairesis(mySQLString);

app


  .use(morgan("dev"))
  //   .use('/',express.static("public"))
//   .use("/static", express.static(path.join(__dirname, "static")))
  //parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended: false }))
  .use("/assets", express.static(path.join(__dirname, "assets")))


  //parse application/json
  .use(bodyParser.json())

  .get("/", (req, res) => {
 
      res.sendFile(__dirname +"/registration.html");

  })

  .get("/registration", function (request, response) {
  
      response.sendFile(__dirname + "/registration.html");
    
  })


  .post("/api/register", async (req, res) => {
    const body = req.body;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const mobile = req.body.phone_country + req.body.phone;

    //backend validation
    if(!validator.isEmail(email) || validator.isEmpty(fullname) || validator.isEmpty(req.body.phone)){
        //Throw an error
        let jsonResponse = { status: "KO", message: "Invalid data" };
        res.status(422).json(jsonResponse);
        return;
    }

    await database.execute(
      `
            INSERT INTO contacts (
                fullname,
                email,
                mobile,
                date_added
            ) VALUES(
                @fullname,
                @email,
                @mobile,
                NOW()
            )
        `,
      {
        fullname: fullname,
        mobile: mobile,
        email: email
      }
    );

    let jsonResponse = { status: "OK", message: "User was added" };
    res.status(200).json(jsonResponse);
  })




  .listen(port, () => console.log(`Server listening on port ${port}`));


