import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { hoursPlannedSelector, sprintDurationSelector, daysSelector } from "../../redux/selectors/diagramSelectors";
import { allTasksSelector } from "../../redux/selectors/tasks-selectors";
import style from './Diagram.module.css'

const Diagram = () => {
    const allTasks = useSelector(state => allTasksSelector(state));
    const duration = useSelector(state => sprintDurationSelector(state))
    const hoursPlanned = useSelector(state => hoursPlannedSelector(state))
    const days = useSelector(state => daysSelector(state))
    console.log(days)

    const redLine = (hoursPlanned, duration) => {
        const arrTimeOfProgect = [hoursPlanned];
        const sprintHoursPerDay = hoursPlanned / duration;
        let remainingHours = hoursPlanned;

        for (let i = 0; i < duration; i += 1) {
            arrTimeOfProgect.push((remainingHours - sprintHoursPerDay).toFixed(2));
            remainingHours -= sprintHoursPerDay;
        }
        return arrTimeOfProgect;
    };

    const blueLine = (hoursPlanned, duration, allTasks) => {
        const getSumArrOfHoursPerDay = (duration, allTasks) => {
            const arrSumOfPerDay = [];
            const corrHoursArrChecker = (item) => {
                const itemHoursPlanned = item.hoursPlanned;
                const itemHoursWasted = item.hoursWasted;
                let correctArrHoursWastedPerDay = null;
                if (itemHoursPlanned >= itemHoursWasted) {
                    correctArrHoursWastedPerDay = item.hoursWastedPerDay;
                } else {
                    correctArrHoursWastedPerDay = item.hoursWastedPerDay.map((el) => ({
                        ...el,
                        singleHoursWasted:
                            (itemHoursPlanned / itemHoursWasted) * el.singleHoursWasted,
                    }));
                }
                return correctArrHoursWastedPerDay;
            };
            const singleHoursWasted = (item, i) => {
                const result = +(corrHoursArrChecker(item)[i].singleHoursWasted)
                return result
            }
            for (let i = 0; i < duration; i += 1) {
                let total = 0;
                for (let item of allTasks) {
                    total += singleHoursWasted(item, i);
                }
                arrSumOfPerDay.push(total);
            }
            return arrSumOfPerDay;
        };
        const arrOftotalHoursPerDay = getSumArrOfHoursPerDay(duration, allTasks);
        console.log("arrOftotalHoursPerDay", arrOftotalHoursPerDay)
        const arrTimes = [hoursPlanned];
        let startPoint = hoursPlanned
        for (let arg of arrOftotalHoursPerDay) {
            arrTimes.push((startPoint - arg).toFixed(2));
            startPoint -= arg
        }
        return arrTimes
    };

    const formatDays = (days) => {
        const conversionDay = (day) => {
            const newDay = moment(day, 'DD-MM-YYYY')
                .format("DD MMM");
            return newDay
        }
        const result = days.map((day) => conversionDay(day))
        result.unshift(0)
        return result
    };
    console.log(blueLine(hoursPlanned, duration, allTasks))
    const chartData = {
        labels: formatDays(days), // дени (даты снизу диаграммы) arrDays
        datasets: [
            {
                label: "Запланований залишок трудовитрат",
                fill: false,
                lineTension: 0,
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                data: redLine(hoursPlanned, duration), // массив времени
            },
            {
                label: "Актуальний залишок трудовитрат",
                fill: false,
                lineTension: 0.4,
                borderColor: "rgb(0, 89, 255)",
                backgroundColor: "rgb(0, 89, 255)",
                data: blueLine(hoursPlanned, duration, allTasks), // массив времени
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
            text: "Burndown Chart(Calendar Team)                                                          ",
            fontColor: "#181C27",
            fontFamily: "'Montserrat', 'sans-serif'",
            fontSize: 23,
            padding: 0,
            position: "top",
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
            titleFontSize: 16,
            titleMarginBottom: 10,
            bodyFontFamily: "'Montserrat', 'sans-serif'",
            bodyFontSize: 16,
            bodySpacing: 5,
            bodyAlign: "center",
            xPadding: 8,
            yPadding: 8,
            caretPadding: 5,
            caretSize: 10,
            cornerRadius: 6,
            // callbacks: {
            //     label: (tooltipItem) => {
            //         let label = `  ${tooltipItem.value}`;
            //         return label;
            //     },
            // },
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Людино-години",
                        fontFamily: "'Montserrat', 'sans-serif'",
                        fontSize: 16,
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
                fontSize: 12,
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