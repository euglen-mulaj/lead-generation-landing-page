# project-04
How to start npm application ? 

- step 1  : generate package.json file 
npm init -y


-step 2: modify package.json file : 
"start" : "node index.js"

-step 3: create file index.js 

-step 4 : install packages 
  npm install express morgan body-parser prohairesis dotenv

express : api calls 
morgan : log calls to backend
body-parser : parse any request
prohairesis : db connection
dotenv : environmental variables

-step 5 : create .gitignore file 
/node_modules to not include packages in git commands

-import installed packages in index.js file 

//imports
const express = require("express");
const morgan = require("morgan");
const { Prohairesis } = require("prohairesis");
const bodyParser = require("body-parser");
const { response } = require("express");
require('dotenv').config();

-other important packages 
validator : npm install validator
path : npm install path
