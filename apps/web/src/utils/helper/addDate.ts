export const addDate = (date: Date, interval: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + interval);

    return newDate;
};
