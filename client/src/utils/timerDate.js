const setTimerDate = (timer) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + timer * 60 * 1000);
    console.log(currentDate, futureDate, 'DATES')
    return futureDate;
};

export default setTimerDate;
