import "./Landing.css";

function Landing() {
  return (
    <div id="landing_container">
      <h1>WELCOME</h1>

      <div id="landing_center_container">
        <p>to the Finance Management System</p>
        <h1>FMS</h1>
      </div>

      <div id="login_btn_container">
        <a href="/login">
          <button type="button">Login</button>
        </a>
      </div>
    </div>
  );
}

export default Landing;
