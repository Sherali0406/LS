"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedDaysFromDate = void 0;
function getSelectedDaysFromDate(selectedDays, fromDate, number_of_lessons) {
    const current = new Date(fromDate);
    const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const result = [];
    while (result.length < number_of_lessons) {
        const day = daysOfWeek[current.getDay()];
        if (selectedDays.includes(day)) {
            result.push(current.toISOString());
        }
        current.setDate(current.getDate() + 1);
    }
    return result;
}
exports.getSelectedDaysFromDate = getSelectedDaysFromDate;
//# sourceMappingURL=get-selected-dats.js.map