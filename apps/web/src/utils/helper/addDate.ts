export const addDate = (date: Date, interval: number) => {
    const newDate = new Date();
    newDate.setDate(date.getDate() + interval);

    return newDate;
};
