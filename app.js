const express = require("express");
const fetch = require("node-fetch");

// packages
require("dotenv").config();

// create express server
const app = express();

const PORT = process.env.PORT || 3000;

// set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ 
    extended: true 
}));
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/convert-mp3", async (req, res) => {

    let url = req.body.url;

    if (!url) {
        return res.render("index", {
            success: false,
            message: "Please provide a valid URL"
        })
    } else {
        try {
            url = url.split("v=")[1].substring(0, 11);
        } catch (error) {
            return res.render("index", {
                success: false,
                message: "Please provide a valid URL"
            });
        }

        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${url}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": process.env.API_HOST,
                "x-rapidapi-key": process.env.API_KEY
            }
        });

        const response = await fetchAPI.json();

        if (response.status === "ok") {
            return res.render("index", {
                success: true, 
                title: response.title, 
                download_link: response.link
            });
        } else {
            return res.render("index", {
                success: false,
                message: response.message
            });
        }

    }
    
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
