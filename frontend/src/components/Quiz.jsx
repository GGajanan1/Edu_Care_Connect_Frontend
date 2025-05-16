import React, { useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [query, setQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Flag to track submission

  // Fetch quiz questions based on the query
  const handleFetchQuiz = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a topic to generate quiz questions.');
      return;
    }

    setError('');
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    setScore(null);
    setIsSubmitted(false); 

    try {
      const response = await axios.post('http://localhost:8080/api/quiz/generate', { query });
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to fetch quiz questions. Please try again.');
      console.error('Error fetching quiz questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitted) {
      alert('You have already submitted the quiz.');
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      setError('Please answer all the questions before submitting.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let id = localStorage.getItem('id');
      if (!id || id === 'undefined' || id === 'null') {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser && parsedUser.id) {
            id = parsedUser.id;
            localStorage.setItem('id', id);
          } else {
            console.error("User object does not contain an 'id' field.");
          }
        } else {
          console.error('No user found in localStorage.');
        }
      }

      const response = await axios.post('http://localhost:8080/api/quiz/validate', {
        questions,
        userAnswers: Object.values(answers),
        id,
      });
      setScore(response.data.score);
      setIsSubmitted(true); // Mark the quiz as submitted
    } catch (err) {
      setError('Failed to validate quiz answers. Please try again.');
      console.error('Error validating quiz answers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Quiz Generator</h1>
      <form onSubmit={handleFetchQuiz} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a topic (e.g., JavaScript)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {questions.length > 0 && (
        <div style={styles.quizContainer}>
          <h2 style={styles.quizTitle}>Quiz Questions</h2>
          {questions.map((question, index) => (
            <div key={index} style={styles.questionCard}>
              <p style={styles.questionText}>
                {index + 1}. {question.question}
              </p>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} style={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    style={styles.radioInput}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            style={styles.submitButton}
            disabled={loading || isSubmitted} // Disable button if already submitted
          >
            {loading ? 'Submitting...' : 'Submit Quiz'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      )}
      {score !== null && (
        <div style={styles.resultContainer}>
          <h2 style={styles.resultTitle}>Quiz Results</h2>
          <p style={styles.resultText}>
            Your Score: {score} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    color: '#4CAF50',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  quizContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  },
  quizTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '15px',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  questionText: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#333',
  },
  optionLabel: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#555',
  },
  radioInput: {
    marginRight: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  resultContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  resultTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
  },
  resultText: {
    fontSize: '18px',
    color: '#4CAF50',
  },
};

export default Quiz;