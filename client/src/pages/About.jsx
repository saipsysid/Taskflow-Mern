
export default function About() {
  return (
    <div className="container py-5">
      <div className="card card-body shadow-sm">
        <h2>About TaskFlow</h2>

        <p>
          TaskFlow is a productivity management application
          developed using the MERN stack.
        </p>

        <h5>Technologies Used</h5>

        <ul>
          <li>React for the frontend</li>
          <li>Node.js and Express.js for the backend</li>
          <li>MongoDB for database storage</li>
          <li>Bootstrap 5 for responsive design</li>
          <li>REST API for communication between frontend and backend</li>
        </ul>

        <p>
          The application helps users organize tasks, set priorities,
          manage deadlines, and monitor their productivity.
        </p>
      </div>
    </div>
  );
}
