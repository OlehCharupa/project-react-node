import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import style from './Diagram.module.css'

const Diagram = () => {
    const duration = useSelector(state => state)
    const hoursPlanned = useSelector(state => state)
    const arrDaysPlan = useSelector(state => state)


    const redLine = (timesOnSprints, duration) => {
        let allHoursOnSprint
        for (let key in timesOnSprints) {
            allHoursOnSprint += key
        }
        const arrTimeOfProgect = [hoursPlanned];
        const sprintHoursPerDay = hoursPlanned / duration;
        let remainingHours = hoursPlanned;

        for (let key of duration) {
            arrTimeOfProgect.push((remainingHours - sprintHoursPerDay).toFixed(2));
            remainingHours -= sprintHoursPerDay;
        }
        return arrTimeOfProgect;
    };

    const blueLine = () => {

    };

    const chartData = {
        labels: ['1 апр', '2 апр', '3 апр', '4 апр', '5 апр', '6 апр'],// дени (даты снизу диаграммы) mb arrDays
        datasets: [
            {
                label: "Запланований залишок трудовитрат",
                fill: false,
                lineTension: 0,
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                data: [250, 188, 125, 63, 0], // массив времени
            },
            {
                label: "Актуальний залишок трудовитрат",
                fill: false,
                lineTension: 0.4,
                borderColor: "rgb(0, 89, 255)",
                backgroundColor: "rgb(0, 89, 255)",
                data: [250, 180, 125, 115, 100, 0], // массив времени
            },
        ],
    }

    const chartOptions = {
        layout: {
            padding: {
                left: 0,
                right: 10,
                top: 20,
                bottom: 10,
            },
        },
        responsive: true,
        title: {
            display: true,
            text: "Burndown Chart(Calendar Team)",
            fontColor: "#181C27",
            fontFamily: "'Montserrat', 'sans-serif'",
            fontSize: 20,
            padding: 0,
        },
        elements: {
            line: {
                borderWidth: 2,
            },
            point: {
                pointStyle: "circle",
                borderWidth: 2,
                hoverRadius: 5,
                hoverBackgroundColor: "rgba(255, 255, 255, 0.2)",
                hoverBorderWidth: 2,
                radius: 2,
                hitRadius: 10,
            },
        },
        tooltips: {
            mode: "index",
            titleFontSize: 14,
            titleMarginBottom: 10,
            bodyFontFamily: "'Montserrat', 'sans-serif'",
            bodyFontSize: 14,
            bodySpacing: 5,
            bodyAlign: "center",
            xPadding: 8,
            yPadding: 8,
            caretPadding: 5,
            caretSize: 10,
            cornerRadius: 6,
            callbacks: {
                label: (tooltipItem) => {
                    let label = tooltipItem.value;
                    label = "  " + label;
                    return label;
                },
            },
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Людино-години",
                        fontFamily: "'Montserrat', 'sans-serif'",
                        fontSize: 14,
                        fontColor: "#181C27",
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize: 14,
                        fontColor: "#181C27",
                    },
                    gridLines: {
                        display: true,
                    },
                },
            ],
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: false,
                        fontSize: 14,
                        fontColor: "#181C27",
                    },
                },
            ],
        },
        legend: {
            display: true,
            fullWidth: false,
            labels: {
                fontColor: "#181C27",
                fontFamily: "'Montserrat', 'sans-serif'",
                fontSize: 14,
                boxWidth: 5,
                usePointStyle: true,
                padding: 20,
            },
        },
    };
    return (
        <div className={style.contanerDiagram}>
            <Line data={chartData} options={chartOptions} />
        </div >
    );
};

export default Diagram;