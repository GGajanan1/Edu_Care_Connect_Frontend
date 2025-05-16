import React, { useState } from 'react';
import axios from 'axios';

function FreeCourses() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaries, setSummaries] = useState({}); // Store summaries for each course
  const [loadingSummary, setLoadingSummary] = useState({}); // Track loading state for each summary

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a topic to search.');
      return;
    }
    setError('');
    setLoading(true);
    setCourses([]);
    setSummaries({});

    try {
      const response = await axios.get(`http://localhost:8080/api/freecourses?query=${encodeURIComponent(query)}`);
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async (url, index) => {
      console.log('Generating summary for URL:', url); // Debugging log
    setLoadingSummary((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await axios.post('http://localhost:8080/api/summarize', { url });
      setSummaries((prev) => ({ ...prev, [index]: response.data.summary }));
    } catch (err) {
      console.error('Error generating summary:', err);
      setSummaries((prev) => ({ ...prev, [index]: 'Failed to generate summary. Please try again.' }));
    } finally {
      setLoadingSummary((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Free Courses</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a topic (e.g., JavaScript)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Loading...</p>}
      <div style={styles.results}>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <p style={styles.source}>Source: {course.source}</p>
              <a href={course.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                View Course
              </a>
              <button
                onClick={() => handleGenerateSummary(course.link, index)} // Pass the correct URL dynamically
                style={styles.summaryButton}
                disabled={loadingSummary[index]}
              >
                {loadingSummary[index] ? 'Generating Summary...' : 'Generate Summary'}
              </button>
              {summaries[index] && (
                <p style={styles.summaryText}>
                  <strong>Summary:</strong> {summaries[index]}
                </p>
              )}
            </div>
          ))
        ) : (
          !loading && <p style={styles.noResults}>No courses found. Try a different topic.</p>
        )}
      </div>
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
  loading: {
    color: '#4CAF50',
    marginBottom: '10px',
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '600px',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  courseTitle: {
    fontSize: '18px',
    marginBottom: '5px',
    color: '#333',
  },
  source: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '10px',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  summaryButton: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  summaryText: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
  noResults: {
    color: '#777',
    fontSize: '16px',
  },
};

export default FreeCourses;