const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    rating: Number,
    image: String
});

const Movie = mongoose.model("Movie", movieSchema);

mongoose.connect("mongodb://127.0.0.1:27017/movieDB")
    .then(async () => {
        console.log("MongoDB connected");

        // Clear old movies
        await Movie.deleteMany({});

        // Add movies
        await Movie.insertMany([
            {
                title: "The Amazing Spiderman",
                year: 2012,
                genre: "Action",
                rating: 7.0,
                image:  "images/spiderman.webp"
            },
            {
                title: "The Incredibles",
                year: 2004,
                genre: "Animation",
                rating: 8.0,
                image:  "images/incredibles.jpg"
            },
            {
                title: "Avatar",
                year: 2025,
                genre: "Action",
                rating: 7.2,
                image: "images/avathar.jpg"
            },
            {
                title: "Batman",
                year: 2022,
                genre: "Action , Crime",
                rating: 7.8,
                image:  "images/batman.jpg"
            },
            {
                title: "Captain america",
                year: 2011,
                genre: "Sci-Fi , Action",
                rating: 6.9,
                image: "images/captain_america.jpg"
            },
            {
                title: "IronMan",
                year: 2008,
                genre: "Action",
                rating: 6.9,
                image:  "images/iron man.jpg"
            }
        ]);

        console.log("Movies added");
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });

app.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});