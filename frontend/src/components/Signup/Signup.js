// Styles
import axios from "axios";
import "./Signup.css";

function Signup() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        let messageDiv = document.getElementById("message_container");
        let errorMessageDiv = document.getElementById("signup_error_container");
        let firstName = document.getElementById("first_name").value;
        let lastName = document.getElementById("last_name").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if(firstName === "" || lastName === "" || username === "" || password === "") {
            errorMessageDiv.textContent = "Error: Please enter valid data";
            return;
        }

        const user = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password
        };

        errorMessageDiv.textContent = "";
        messageDiv.textContent = "";

        let result = await axios.get(`${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_GET_USER_URI}${username}`);

        if(result.data.result) {
            errorMessageDiv.textContent = "Username is already taken";
            return;
        }

        await axios.post(`${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_ADD_USER_URI}${username}`, user)
        .then((result) => result.data)
        .then((data) => data.result)
        .then((result) => {
            if(result.acknowledged) {
                messageDiv.textContent = "Account Successfully Created";

                setTimeout(function () {
                    window.location.replace(`/login`);
                }, 1000);
            } 
            else {
                document.getElementById("signup_error_container").textContent = "Error: Could not create new user";
            }
        })
        .catch((error) => {
            console.log(error);
            document.getElementById("signup_error_container").textContent = "Error: Could not create new user";
        })
    };

    return (
        <>
            <div id="signup_container">
                <div id="signup_header_container">
                    <h2> Sign Up </h2>
                </div>

                <form>
                    <table>
                        <tr>
                            <td><label htmlFor="first_name">Enter first name:</label></td>
                            <td><input type="text" id="first_name" name="first_name" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="last_name">Enter last name:</label></td>
                            <td><input type="text" id="last_name" name="last_name" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="username">Enter your username: </label></td>
                            <td><input
                            type="text"
                            id="username"
                        /></td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="password">Enter your password: </label>
                            </td>
                            <td>
                            <input
                            type="password"
                            id="password"
                            />
                            </td>
                        </tr>
                    </table>

                   <div id="already_have_account_container">
                        <a href="/login" alt="Login page">Already have an account?</a>
                    </div>

                    <button type="submit" onClick={handleSubmit}>
                        Signup
                    </button>
                </form>

                <div id="signup_error_container"></div>
                <div id="message_container"></div>
            </div>
        </>
    );
}

export default Signup;
