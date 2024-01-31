const express = require("express");
const serverless = require("serverless-http");
var random_name = require("random-indian-name");
var docData = require("../images.json");
var _ = require("lodash");

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/doctors", (req, res) => {
  const { city } = req.query;
  var maleDocCount = randomIntFromInterval(1, 5);
  var femaleDocCount = randomIntFromInterval(1, 5);
  var maleDoctorImg = _.sampleSize(docData.male, maleDocCount);
  var femaleDocImg = _.sampleSize(docData.female, femaleDocCount);
  var doctorList = [];
  for (let i = 0; i < maleDocCount; ++i) {
    const doc = {};
    doc.name = random_name({
      gender: "male",
      random: Math.random,
    });
    doc.photo = maleDoctorImg[i];
    doc.specialisation = docData.specializations[randomIntFromInterval(0, 4)];
    doc.experience = randomIntFromInterval(5, 20);
    doc.city = _.startCase(_.toLower(city));
    doctorList.push(doc);
  }
  for (let i = 0; i < femaleDocCount; ++i) {
    const doc = {};
    doc.name = random_name({
      gender: "female",
      random: Math.random,
    });
    doc.photo = femaleDocImg[i];
    doc.specialisation = docData.specializations[randomIntFromInterval(0, 4)];
    doc.experience = randomIntFromInterval(5, 20);
    doc.city = _.startCase(_.toLower(city));
    doctorList.push(doc);
  }
  res.json(doctorList);
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
