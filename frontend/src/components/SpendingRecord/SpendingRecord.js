// Styles
import "./SpendingRecord.css";

import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function SpendingRecord() {
    const [currentLabel, setCurrentLabel] = useState("");
    const [divisions, setDivisions] = useState([]);
    const [spendingDivisionsDiv, setSpendingDivisionsDiv] = useState([]);
    const {username} = useParams();

    const setLabel = (event) => {
        event.preventDefault();

        if (currentLabel !== "") {
            document
                .getElementById(currentLabel)
                .setAttribute("style", "background-color: #809bfe");
        }

        event.target.setAttribute("style", "background-color: #0b2eac");
        setCurrentLabel(event.target.id);

        if (currentLabel === "custom") {
            document
                .getElementById("custom_label")
                .setAttribute("style", "display: inline-block");
        } else {
            document
                .getElementById("custom_label")
                .setAttribute("style", "display: none");
        }
    };

    const createLabelBtn = (id, value) => {
        return (
            <button type="button" id={id} onClick={setLabel}>
                {value}
            </button>
        );
    };

    const createSpendingDivisonDiv = (label, value) => {
        label = label.replace(/_/g, " ");

        return (
            <div id="spending_div">
                <p>{label}</p>
                <p>:</p>
                <p>{value}</p>
            </div>
        );
    };

    const clearSpendingDivisionDiv = () => {
        for(let i = 0; i < spendingDivisionsDiv.length; i++) {
            spendingDivisionsDiv.pop();
        }
    }

    const displaySpendingDivisonDiv = () => {
        // Clearing spendingDivisionsDiv
        for(let i = 0; i < spendingDivisionsDiv.length; i++) {
            spendingDivisionsDiv.pop();
        }

        divisions.forEach((division) => {
            spendingDivisionsDiv.push(createSpendingDivisonDiv(division["label"], division["amount"]));
        })
    };

    const addSpendingDivison = (event) => {
        event.preventDefault();

        let label = currentLabel;
        const amount = parseInt(document.getElementById("amount").value);
        document.getElementById(`${currentLabel}`).setAttribute("style", "background-color: #809bfe");

        if (label === "" || isNaN(amount)) {
            return;
        }

        // Getting custom label
        if (label === "custom") {
            label = document
                .getElementById("custom_label")
                .value.replace(/ /g, "_");
        }

        // Reset current label
        setCurrentLabel("");

        let labelIsPresent = false;
        divisions.forEach((division) => {
            if (division["label"] === label) {
                division["amount"] += amount;

                labelIsPresent = true;
                return;
            }
        });
 
        if (!labelIsPresent) {
            divisions.push({ label: label, amount: amount });
        }

        // resetLabels();
        displaySpendingDivisonDiv();
    };

    const getMonth = (value) => {
        let month = "";

        switch(value) {
            case 1:
                month = "january"
                break;
            case 2:
                month = "february"
                break;
            case 3:
                month = "march";
                break;
            case 4:
                month = "april";
                break;
            case 5:
                month = "may";
                break;
            case 6:
                month = "june";
                break;
            case 7:
                month =  "july";
                break;
            case 8:
                month =  "august";
                break;
            case 9:
                month =  "september";
                break;
            case 10:
                month =  "october";
                break;
            case 11:
                month =  "november";
                break;
            case 12:
                month =  "december";
                break;
            default:
                month = "";
        }

        return month;
    }

    const submitSpendingDivisions = () => {
        if(divisions.length === 0) {
            return;
        }
    
        let [year, month] = document.querySelector("#date_container input").value.split("-");
        year = parseInt(year);
        month = getMonth(parseInt(month));

        let data = {}
        data["username"] = username;
        data["year"] = year;
        data["month"] = month;
        data["spending"] = {};

        divisions.forEach((division) => {
            data["spending"][division["label"].toLowerCase()] = division["amount"];
        })

        console.log(data);
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        let result = [];
        
        axios.post(`${process.env.REACT_APP_NODE_URI}${process.env.REACT_APP_ADD_SPENDING_RECORDS_URI}${username}`, data)
        .then((res) => res.data)
        .then((data) => data.result)
        .then((acknowledgment) => {
            console.log(acknowledgment["acknowledged"]);
            if(acknowledgment["acknowledged"]) {
                window.location.replace(`/home/${username}`);
            }
        })

        console.log(result);
        
        clearSpendingDivisionDiv();
    }

    useEffect(() => {
        const todaysDate = new Date();
        let currentYear = todaysDate.getFullYear();
        let currentMonth = todaysDate.getMonth() + 1; // Converting 0-indexed to 1-indexed
        currentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;

        document.querySelector(
            "#date_container input"
        ).value = `${currentYear}-${currentMonth}`;
    });

    return (
    
        <>
            <div id="setup_spending_container">
                <div id="setup_spending_header_container">
                    <h2> Spending Division: </h2>
                    <div id="date_container">
                        <input type="month" />
                    </div>
                </div>
                <form>
                    <div id="spending_divisions_container">{spendingDivisionsDiv}</div>
                    <div id="label_container">
                        {createLabelBtn("Rent", "Rent")}
                        {createLabelBtn("Entertainment", "Entertainment")}
                        {createLabelBtn("Food", "Food")}
                        {createLabelBtn("Health", "Health")}
                        {createLabelBtn("Education", "Education")}
                        {createLabelBtn("EMI_or_Loans", "EMI/Loan")}
                        {createLabelBtn("Household_Goods", "Household Goods")}
                        {createLabelBtn("Insurance", "Insurance")}
                        {createLabelBtn("custom", "Custom Label")}
                    </div>

                    <input type="text" id="custom_label" placeholder="Label" />
                    <br />
                    <input type="text" id="amount" placeholder="Amount" />
                    <br />

                    <button type="button" onClick={addSpendingDivison}>
                        Add Division
                    </button>
                </form>

                <button type="submit" onClick={submitSpendingDivisions}>Next</button>

                <a href={`/home/${username}`} id="go_back_btn"><button>Go back</button></a>
            </div>
        </>
    );
}

export default SpendingRecord;
