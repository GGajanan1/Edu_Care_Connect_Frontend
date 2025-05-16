import React from 'react';

function AboutUs() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.description}>
        Welcome to <strong>EduCare Connect</strong>, a platform designed to revolutionize education by bridging the gap between rural students and experienced teachers. Our mission is to empower students in underserved areas by providing them with access to quality education, mentorship, and collaborative learning opportunities.
      </p>

      <h2 style={styles.subtitle}>Our Vision</h2>
      <p style={styles.description}>
        At EduCare Connect, we envision a world where every student, regardless of their location or background, has access to the resources and guidance they need to succeed. By leveraging technology and fostering community-driven learning, we aim to create a brighter future for education.
      </p>

      <h2 style={styles.subtitle}>What Makes Us Unique?</h2>
      <ul style={styles.list}>
        <li>
          <strong>Connecting Rural Students and Teachers:</strong> We provide a platform where rural students can connect with experienced teachers (retired and non-retired) to clear their doubts during live sessions.
        </li>
        <li>
          <strong>AI-Powered Meeting Summaries:</strong> After every session, our intelligent bot generates a concise summary of the discussion, ensuring students can revisit key points anytime.
        </li>
        <li>
          <strong>Community Features:</strong> Students can participate in group studies, collaborate with peers, and engage in meaningful discussions through our community feature.
        </li>
        <li>
          <strong>Interactive Quizzes:</strong> We offer quizzes to help students test their knowledge and track their progress in a fun and engaging way.
        </li>
        <li>
          <strong>YouTube Video Summaries:</strong> Our platform provides AI-generated summaries of educational YouTube videos, saving students time and helping them focus on key concepts.
        </li>
      </ul>

      <h2 style={styles.subtitle}>Our Mission</h2>
      <p style={styles.description}>
        Our mission is to break down barriers in education by creating a platform that connects students and teachers, fosters collaboration, and leverages technology to enhance learning outcomes. We aim to make education accessible, engaging, and impactful for everyone.
      </p>

      <h2 style={styles.subtitle}>How We Help</h2>
      <p style={styles.description}>
        EduCare Connect is more than just a platform—it's a community. Here's how we help:
      </p>
      <ul style={styles.list}>
        <li>Facilitate live doubt-clearing sessions between students and teachers.</li>
        <li>Generate AI-powered summaries of meetings and educational content.</li>
        <li>Encourage collaborative learning through community features and group studies.</li>
        <li>Offer engaging quizzes to enhance learning outcomes.</li>
        <li>Provide quick and accurate summaries of YouTube educational videos.</li>
      </ul>

      <h2 style={styles.subtitle}>Why Choose EduCare Connect?</h2>
      <p style={styles.description}>
        EduCare Connect is built with the belief that education is a fundamental right. By combining the expertise of teachers with the power of AI, we provide a unique learning experience that is accessible, efficient, and impactful.
      </p>

      <h2 style={styles.subtitle}>Join Us</h2>
      <p style={styles.description}>
        Whether you're a student looking for guidance or a teacher passionate about making a difference, EduCare Connect is the platform for you. Together, we can create a brighter future for education.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '20px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '15px',
    textAlign: 'justify',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '15px',
  },
};

export default AboutUs;