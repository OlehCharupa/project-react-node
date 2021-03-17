import { createSelector } from "@reduxjs/toolkit";
import { allTasksSelector } from "./tasks-selectors";

export const hoursPlannedSelector = createSelector([allTasksSelector], (items) =>
    items
        .map((task) => Number(task.hoursPlanned))
        .reduce((acc, taskValue) => {
            return (acc += taskValue);
        }, 0)
);

export const sprintDurationSelector = (state) => allTasksSelector(state)[0].hoursWastedPerDay.length;

export const daysSelector = createSelector([allTasksSelector], (items) => items[0].hoursWastedPerDay.map((task) => task.currentDay));