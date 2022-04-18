// Styles
import "./Login.css";

const axios = require("axios");

async function handleSubmit(event) {
    event.preventDefault();

    const errorMessageDiv = document.getElementById("login_error_container");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameInput.value = "";
    passwordInput.value = "";
    errorMessageDiv.value = "";

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    let result = await axios.get(
        `${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_GET_USER_URI}${username}`
    );
    let data = result.data.result;

    if (data == null) {
        errorMessageDiv.textContent = "User not found";
    } else if (data["password"].replace(/'/g, "") === password) {
        window.location.replace(`/createplan/${username}`);
    } else {
        document.getElementById("login_error_container").textContent =
            "Error: Invalid Email or Password";
    }
}

function Login() {
    return (
        <>
            <div id="login_container">
                <h2> Login </h2>
                <form>
                    <input type="text" id="username" placeholder="Username" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    <div id="create_account_container">
                        Not a user yet? <a href="/signup" alt="Signup page"><span> Create an account </span></a>
                    </div>

                    <button type="submit" onClick={handleSubmit}>
                        Login
                    </button>
                </form>

                <div id="login_error_container"></div>
            </div>
        </>
    );
}

export default Login;
