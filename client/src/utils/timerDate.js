const setTimerDate = (timer) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + timer * 60000);
    return futureDate;
};

export default setTimerDate;
