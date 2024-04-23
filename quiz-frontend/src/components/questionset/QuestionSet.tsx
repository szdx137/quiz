import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./QuestionSet.scss";

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer: number | null; // Added userAnswer property
}
function QuestionSet() {
  const questionData: QuestionData[] = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
      explanation:
        "Paris is the capital city of France and is known for its famous landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum.",
      userAnswer: 1, // User chose the wrong option
    },
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
    {
      question:
        "This is a very long question to test the layout and formatting of the card. How can we ensure that the cards maintain a consistent height and layout, regardless of the length of the content?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 2,
      explanation:
        "This is a long explanation to test the layout and formatting of the card. We can adjust the styles to ensure that the cards maintain a consistent height and layout, regardless of the length of the content. This can be achieved by using flexbox or CSS grid, setting a fixed height for the cards, and allowing the content to scroll if it exceeds the height.",
      userAnswer: null, // User didn't choose any option
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
      explanation:
        "Paris is the capital city of France and is known for its famous landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum.",
      userAnswer: 1, // User chose the wrong option
    },
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
    {
      question:
        "This is a very long question to test the layout and formatting of the card. How can we ensure that the cards maintain a consistent height and layout, regardless of the length of the content?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 2,
      explanation:
        "This is a long explanation to test the layout and formatting of the card. We can adjust the styles to ensure that the cards maintain a consistent height and layout, regardless of the length of the content. This can be achieved by using flexbox or CSS grid, setting a fixed height for the cards, and allowing the content to scroll if it exceeds the height.",
      userAnswer: null, // User didn't choose any option
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
      explanation:
        "Paris is the capital city of France and is known for its famous landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum.",
      userAnswer: 1, // User chose the wrong option
    },
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
                <h3>{data.question}</h3>
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

export default QuestionSet;
