var express = require("express");
var random_name = require("random-indian-name");
var docData = require("./images.json");
var _ = require("lodash");
var cors = require("cors");

var app = express();
app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
app.get("/doctors", (req, res, next) => {
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
