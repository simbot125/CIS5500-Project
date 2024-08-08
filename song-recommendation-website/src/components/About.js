import React from 'react';
import '../AboutPage.css'; // Adjust the path to point to the css file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Songify</h1>
        <p>
          Songify is your one-stop destination for music recommendations, reviews, and more.
          Our platform allows you to explore trending tracks, get personalized song recommendations,
          and discover the musical profile of any year.
        </p>
        <p>
          Our mission is to enhance your music listening experience by providing you with the tools
          and insights you need to explore and enjoy the world of music.
        </p>
        <h2>Our Features</h2>
        <ul>
          <li>Year in Review: Explore the musical profile of a selected year.</li>
          <li>Playlist Recommendations: Get personalized playlist recommendations based on your favorite genres and moods.</li>
          <li>Search for Songs: Discover new music by searching for your favorite songs and artists.</li>
        </ul>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Feel free to reach out to us through our contact form.
        </p>
      </div>
    </div>
  );
};

export default About;
