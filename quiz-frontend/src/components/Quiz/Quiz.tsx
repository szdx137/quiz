import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import "./Quiz.scss";

interface Response {
  id: number;
  title: string;
  category: string;
  category_id: number;
  difficulty_level: string;
  difficulty_level_id: number;
  data: Question[];
}

interface Question {
  id: number;
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

function Quiz() {
  const quizId = 17;
  const [response, setResponse] = useState<Response>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const navigate = useNavigate();

  const [hints, setHints] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<
    { question_id: number; option_id: number }[]
  >([]);

  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!hintUsed) {
      setHints(hints - 1);
      setHintUsed(true);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/questions/${quizId}`);
      console.log(response.data);

      setResponse(response.data);
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      // setSelectedOption(null); // Reset selected option for the new question
      setShowHint(false);
      setHintUsed(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      // setSelectedOption(null); // Reset selected option for the new question
      setShowHint(false);
      setHintUsed(false);
    }
  };

  const handleOptionSelect = (questionId: number, optionId: number) => {
    const updatedOptions = [...selectedOptions];
    const optionIndex = updatedOptions.findIndex(
      (option) => option.question_id === questionId
    );

    if (optionIndex !== -1) {
      updatedOptions[optionIndex] = {
        question_id: questionId,
        option_id: optionId,
      };
    } else {
      updatedOptions.push({ question_id: questionId, option_id: optionId });
    }

    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    console.log(selectedOptions);
    // Make a POST request to submit the selected answers

    try {
      const response = await axiosInstance
        .post(`/api/score/`, {
          quiz_id: quizId,
          data: selectedOptions,
        })
        .then((res) => {
          setScore(res.data.score);
          setShowScore(true);
        });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const instantScore = (
    <div className="score-container">
      <h2 className="quiz-title">{response?.title}</h2>
      <div className="details">
        <p>
          Category: <span>{response?.category}</span>
        </p>
        <p>
          Difficulty Level: <span>{response?.difficulty_level}</span>
        </p>
      </div>
      <p className="score">Score: {score}</p>
    </div>
  );

  return (
    <div className="quiz-container">
      {showScore ? (
        instantScore
      ) : (
        <>
          <div className="timer">
            <span>{formatTime(120)}</span>
          </div>

          {hints != 0 && (
            <div className="hint-icon" onClick={toggleHint}>
              Hint({hints})
            </div>
          )}
          {showHint && (
            <div className="hint-box">
              <p>{questions[currentQuestionIndex]?.hint}</p>
            </div>
          )}

          <div>
            <p>
              title: {response?.title} level: {response?.difficulty_level}{" "}
              category:
              {response?.category}
            </p>
          </div>
          <div className="question-box">
            {loading && <h2>LOADING</h2>}

            <h2>{questions[currentQuestionIndex]?.question}</h2>
            <div className="options">
              {questions[currentQuestionIndex]?.options.map((option) => (
                <div key={option.id} className="option">
                  <input
                    type="radio"
                    id={`option${option.id}`}
                    name="answer"
                    checked={
                      selectedOptions.find(
                        (selectedOption) =>
                          selectedOption.question_id ===
                            questions[currentQuestionIndex].id &&
                          selectedOption.option_id === option.id
                      ) !== undefined
                    }
                    onChange={() =>
                      handleOptionSelect(
                        questions[currentQuestionIndex].id,
                        option.id
                      )
                    }
                  />
                  <label htmlFor={`option${option.id}`}>{option.option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="button-group">
            <button
              className="btn"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="btn"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            <button
              className="btn"
              onClick={() =>
                window.confirm("Are you sure you want to exit?") &&
                // window.location.replace("/home")
                navigate("/home")
              }
            >
              Exit
            </button>
            <button className="btn finish-btn" onClick={handleSubmit}>
              Finish
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
