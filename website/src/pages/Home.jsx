import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [loginPrompt, setLoginPrompt] = useState(false);
  const onDashboardClick = () => {
    setLoginPrompt(true);
  };
  return (
    <div className="homepage">
      <div className={`home-content ${loginPrompt ? "blur" : ""}`}>
        <h1>We Handle your Manpower work!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          aut id impedit amet. Ad nostrum accusamus, alias quisquam dolorum
          ullam.
        </p>
        <button
          className="btn btn-dashboard btn-outline"
          onClick={onDashboardClick}
        >
          Go to Dashboard
        </button>
      </div>

      {loginPrompt && (
        <div className="login-prompt">
          <div className="login-section">
            <p>Are you already a registered user?</p>
            <Link to="/login">
              <button className="btn btn-fill">Login</button>
            </Link>
          </div>
          <hr />
          <div className="signup-section">
            <p>Not yet registered?</p>
            <Link to="/signup">
              <button className="btn btn-outline">Signup</button>
            </Link>
          </div>

          <div className="close-btn">
            <button onClick={() => setLoginPrompt(false)}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
