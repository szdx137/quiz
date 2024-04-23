import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Score.scss";
import axiosInstance from "../../axios";

interface ScoreData {
  questionset_id: number;
  quiz_id: number;
  title: string;
  category_id: number;
  category: string;
  difficulty_level_id: number;
  difficulty_level: string;
  played_date: string;
  score: number;
}

function Score() {
  const navigate = useNavigate();

  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ScoreData[]>(
        "/api/quiz-history/"
      );
      setScoreData(response.data);
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (sn: number) => {
    // Handle delete logic here
    console.log(`Deleting row with sn: ${sn}`);
  };

  const handleView = (sn: number) => {
    // Handle view logic here
    console.log(`Viewing row with sn: ${sn}`);
    navigate("/questionset");
  };

  return (
    <div className="score-page">
      <Navbar></Navbar>

      <div className="my-score-container">
        <h1>My Score</h1>
        {loading ? (
          <h3>LOADING</h3>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Difficulty Level</th>
                  <th>Played Date</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoreData.map((data) => (
                  <tr key={data.questionset_id}>
                    <td>{data.questionset_id}</td>
                    <td>{data.title}</td>
                    <td>{data.category}</td>
                    <td>{data.difficulty_level}</td>
                    <td>{data.played_date}</td>
                    <td>{data.score}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleView(data.questionset_id)}
                      >
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(data.questionset_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button className="prev-btn">Previous</button>
              <button className="next-btn">Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Score;
