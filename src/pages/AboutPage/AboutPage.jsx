import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/App.css'; // Assuming your CSS is already well-defined

const AboutPage = () => {
  return (
    <div className="about-page-container">
      
      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-text">
          <h1>Welcome to the AI-Based UI Analysis Tool</h1>
          <p>
            Upload screenshots of your front-end designs and receive AI-powered feedback on color palettes, UI design improvements, 
            and accessibility suggestions. Our tool analyzes your designs and offers insights on how to enhance user experience and visual cohesion.
          </p>
          <div className="feature-list-container">
            <h3>Features include:</h3>
            <ul className="feature-list">
              <li>Screenshot uploads with real-time analysis</li>
              <li>Color palette suggestions based on design harmony</li>
              <li>Contrast analysis for improved accessibility</li>
              <li>AI-driven recommendations for overall UI improvements</li>
              <li>Project history and design tracking with the <Link to="/projects">Projects List</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Components/Features Section */}
      <section className="feature-section">
        <h2>Explore the Features</h2>
        <div className="feature-container">
          <div className="feature-card">
            <h3>Color Results</h3>
            <p>Get detailed feedback on the colors used in your designs with the <strong>Color Results feature</strong>.</p>
          </div>
          <div className="feature-card">
            <h3>Color Contrast Analysis</h3>
            <p>Ensure your designs are accessible with the <strong>Color Contrast feature</strong>, providing contrast ratio analysis for readability.</p>
          </div>
          <div className="feature-card">
            <h3>AI Analysis</h3>
            <p>Receive AI-generated insights on how to improve your UI through the <strong>AIAnalysis feature</strong>.</p>
          </div>
          <div className="feature-card">
            <h3>Manage Projects</h3>
            <p>View and manage your design projects on the Projects List Page, tracking changes and improvements over time.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <h2>Watch Our Tool In Action</h2>
        <div className="video-container">
          <iframe 
            width="800" 
            height="500" 
            src="https://www.youtube.com/embed/LDU_Txk06tM" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="tutorial-section">
        <h2>How to Use This Tool</h2>
        <ol className="tutorial-list">
          <li>Start by uploading a screenshot of your UI using the <strong>Browse File button</strong>.</li>
          <li>Analyze the color palette using the <strong>Color Results</strong>, where you'll receive detailed insights on the color harmony of your design.</li>
          <li>Ensure your design is accessible by running a contrast analysis using the <strong>Color Contrast tool</strong>.</li>
          <li>Leverage AI-powered insights through the <strong>AI Analysis feature</strong> to get recommendations on how to improve your UI’s overall design.</li>
          <li>Keep track of your projects and design iterations by creating an account and using the Projects and version history features </li>
        </ol>
      </section>
    </div>
  );
};

export default AboutPage;
