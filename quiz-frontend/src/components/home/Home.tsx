import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Home.scss";

const categories = ["General Knowledge", "Books", "Film", "Music", "Science"];
const difficultyLevels = ["Easy", "Medium", "Hard"];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleStartQuiz = () => {
    // Handle start quiz logic here
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Difficulty:", selectedDifficulty);
    navigate("/quiz");
  };

  return (
    <div className="home-page">
      <Navbar></Navbar>

      <main>
        <section className="quiz-section">
          <h2>Take a Quiz</h2>
          <div className="quiz-controls">
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option value="">Select Difficulty</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="start-btn"
              onClick={handleStartQuiz}
              disabled={!selectedCategory || !selectedDifficulty}
            >
              Start Quiz
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
