import React from "react";
import { Line } from "react-chartjs-2";

const Diagram = () => {



    const chartData = {
        labels: "",// день (даты снизу диаграммы)
        datasets: [
            {
                label: "Запланований залишок трудовитрат",
                fill: false,
                lineTension: 0,
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                data: [], // массив времени
            },
            {
                label: "Актуальний залишок трудовитрат",
                fill: false,
                lineTension: 0.3,
                borderColor: "rgb(0, 89, 255)",
                backgroundColor: "rgb(0, 89, 255)",
                data: [], // массив времени
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
            text: "", // sprinta заголовок
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
        <div className="">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default Diagram;