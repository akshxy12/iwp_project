// Styles
import "./Createplan.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Createplan() {
    const { username } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let salary = parseInt(document.getElementById("salary").value);
        let savingsPercent = parseInt(document.getElementById("savings").value);
        let rentPercent = parseInt(document.getElementById("rent").value);
        let foodPercent = parseInt(document.getElementById("food").value);
        let entertainmentPercent = parseInt(
            document.getElementById("entertainment").value
        );
        let housingPercent = parseInt(document.getElementById("housing").value);
        let healthPercent = parseInt(document.getElementById("health").value);
        let personalPercent = parseInt(
            document.getElementById("personal").value
        );
        let otherneedsPercent = parseInt(
            document.getElementById("other_needs").value
        );

        if (
            isNaN(salary) ||
            isNaN(savingsPercent) ||
            isNaN(rentPercent) ||
            isNaN(foodPercent) ||
            isNaN(entertainmentPercent) ||
            isNaN(housingPercent) ||
            isNaN(healthPercent) ||
            isNaN(personalPercent) ||
            isNaN(otherneedsPercent)
        ) {
            return;
        }

        savingsPercent =
            savingsPercent >= 1 ? savingsPercent / 100 : savingsPercent;
        rentPercent = rentPercent >= 1 ? rentPercent / 100 : rentPercent;
        foodPercent = foodPercent >= 1 ? foodPercent / 100 : foodPercent;
        entertainmentPercent =
            entertainmentPercent >= 1
                ? entertainmentPercent / 100
                : entertainmentPercent;
        housingPercent =
            housingPercent >= 1 ? housingPercent / 100 : housingPercent;
        healthPercent =
            healthPercent >= 1 ? healthPercent / 100 : healthPercent;
        personalPercent =
            personalPercent >= 1 ? personalPercent / 100 : personalPercent;
        otherneedsPercent =
            otherneedsPercent >= 1
                ? otherneedsPercent / 100
                : otherneedsPercent;

        const data = {
            username: username,
            details: {
                salary: salary,
                savings: savingsPercent,
                rent: rentPercent,
                food: foodPercent,
                entertainment: entertainmentPercent,
                housing: housingPercent,
                health: healthPercent,
                personal: personalPercent,
                other_needs: otherneedsPercent,
            },
        };

        let result = await axios
            .get(
                `${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_GET_USER_URI}${username}`
            )
            .catch((error) => {
                alert("Error: Server not responding");
                console.log(error);
            });

        if (!result.data.result) {
            return;
        }

        result = await axios
            .post(
                `${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_ADD_SPENDING_DETAILS_URI}${username}`,
                data
            )
            .then((obj) => obj.data)
            .then((data) => data.result)
            .then((result) => {
                if (result.acknowledged) {
                    window.location.replace(`/home/${username}`);
                } else {
                    alert("Error: Server not responding");
                }
            })
            .catch((error) => {
                alert("Error: Server not responding");
                console.log(error);
            });
    };

    useEffect(() => {
        async function checkSetupDone() {
            let result = await axios.get(
                `${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_GET_SPENDING_DETAILS_URI}${username}`
            );

            if (result.data.result) {
                window.location.replace(`/home/${username}`);
            }
        }

        checkSetupDone();
    });

    return (
        <>
            <div id="createplan_container">
                <div id="createplan_form_container">
                    <div id="createplan_form_header_container">
                        <h2>Creating the plan</h2>
                    </div>

                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="salary">
                                            Enter Salary :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="salary" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="savings">
                                            Enter Savings(in %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="savings" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="rent">
                                            Enter Rent(in %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="rent" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="food">
                                            Enter Food Expenditure(in %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="food" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="entertainment">
                                            Enter Entertainment Expenditure(in
                                            %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="entertainment" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="housing">
                                            Enter Housing Expenditure(Bills
                                            payment,Repairs,Goods) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="housing" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="health">
                                            Enter Health Expenditure(in %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="health" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="personal">
                                            Enter Personal Expenses(in %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="personal" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="other_needs">
                                            Enter Expenditure on Other needs(in
                                            %) :
                                        </label>
                                    </td>
                                    <td>
                                        <input type="text" id="other_needs" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>

                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default Createplan;
