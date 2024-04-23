import axiosInstance from "../../axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Question.scss";

interface Quiz {
  id: number;
  title: string;
  category_id: number;
  category: string;
  difficulty_level_id: number;
  difficulty_level: string;
}

function Question() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Quiz[]>("/api/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePlay = (quizId: number) => {
    navigate(`/quiz`);
  };

  return (
    <div className="question-page">
      <Navbar></Navbar>
      <main>
        <div className="quiz-section">
          <h2>Quizzes</h2>
          {loading ? (
            // <CircularProgress />
            <h3>LOADING</h3>
          ) : (
            <div className="quiz-table-container">
              <table>
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Difficulty Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz, index) => (
                    <tr key={quiz.id}>
                      <td>{index + 1}</td>
                      <td>{quiz.title}</td>
                      <td>{quiz.category}</td>
                      <td>{quiz.difficulty_level}</td>
                      <td>
                        <button onClick={() => handlePlay(quiz.id)}>
                          Play
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <div className="body" />
    </div>
  );
}
export default Question;
