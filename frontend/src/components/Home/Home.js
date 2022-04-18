// Styles
import "./Home.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Home() {
    const { username } = useParams();
    const [userData, setUserData] = useState([]);
    const [divisionTableRows, setTableRows] = useState([]);

    const createRow = (division, percentage, salary) => {
        const amount = parseInt(salary) * parseInt(percentage);

        return (
            <tr>
                <td>{division}</td>
                <td>{percentage * 100}</td>
                <td>{amount}</td>
            </tr>
        );
    };

    const displayTable = () => {
        let salary = userData["salary"];
        let data = userData.details;


        for(let i = 0; i < divisionTableRows.length; i++) {
            divisionTableRows.pop();
        }

        for (let item in data) {
            divisionTableRows.push(createRow(item, data[item], salary));
        }
    };

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(
                    `${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_GET_SPENDING_DETAILS_URI}${username}`
                )
                .then((obj) => obj.data)
                .then((data) => data.result)
                .then((result) => setUserData(result))
                .catch((error) => {
                    alert("Error: Server not responding");
                    console.log(error);
                });
        }

        fetchData()
        .then(() => {
            displayTable();
        })
    }, []);

    return (
        <>
            <div id="home_container">
                <div id="division_table_container">
                    <div id="division_table_header_container">
                        <h2>User division Chart</h2>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <th>DIVISION</th>
                                <th>PERCENTAGE</th>
                                <th>AMOUNT</th>
                            </tr>

                            {divisionTableRows}
                        </tbody>
                    </table>

                    <div id="home_links_container">
                        <button><a href={`/addspendingrecord/${username}`} alt="Enter Spending Record">Enter Spending Record</a></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
