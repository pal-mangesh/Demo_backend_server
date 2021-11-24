const Express = require("express");
const CORS = require("cors");
const DB = require("mongoose");


const app = Express();
// connect to db
const dbConnection = DB.connect("mongodb://localhost:27017/germ_site_db", { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to DB!");


// create a Lead table in db
const LeadModel = DB.model("lead", {
    name: String,
    email: String,
    phone: String,
    message: String
});




app.use(CORS());
app.use(Express.json()); // for parsing application/json
app.use(Express.urlencoded({ extended: true }));

app.post("/api/lead", async(req, res) => {

    const rawLead = req.body;
    if (rawLead && rawLead.name) {
        const newLead = new LeadModel(rawLead);
        const response = await newLead.save();
        res.send(response);
    } else {
        res.send("ERROR: Invalid data provided!");
    }

})

app.listen(1337, () => {
    console.log("Server started at: localhost:1337");
});