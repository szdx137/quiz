import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./QSet.scss";

interface Question {
  question_id: number;
  question: string;
  hint: string;
  description: string;
  options: Option[];
}

interface Option {
  id: number;
  option: string;
  is_correct: boolean;
  question_id: number;
}

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer: number | null; // Added userAnswer property
}
function QSet() {
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<Question>();

  const questionData: QuestionData[] = [
    {
      question: 'Who wrote the novel "To Kill a Mockingbird"?',
      options: [
        "J.K. Rowling",
        "Harper Lee",
        "F. Scott Fitzgerald",
        "Jane Austen",
      ],
      correctAnswer: 1,
      explanation:
        'The novel "To Kill a Mockingbird" was written by Harper Lee, an American novelist known for her acclaimed work exploring racial injustice in the American South.',
      userAnswer: 1, // User chose the correct option
    },

    // Add more question data here
  ];

  return (
    <div className="questionset-page">
      <Navbar></Navbar>
      <div className="view-question-set-container">
        <h1>View Question Set</h1>
        <div className="question-cards">
          {questionData.map((data, index) => (
            <div className="question-card" key={index}>
              <div className="card-content">
                {editMode ? (
                  <input value={data.question} onChange={() => {}} />
                ) : (
                  <h3>{data.question}</h3>
                )}

                <div className="options">
                  {data.options.map((option, optionIndex) => (
                    <div
                      className={`option ${
                        optionIndex === data.correctAnswer
                          ? "correct"
                          : data.userAnswer !== null &&
                            optionIndex === data.userAnswer
                          ? "incorrect"
                          : ""
                      }`}
                      key={optionIndex}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="explanation">
                  <label>Explanation:</label>
                  <textarea value={data.explanation} readOnly />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QSet;
