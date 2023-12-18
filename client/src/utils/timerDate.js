

const setTimerDate = (timer) => {
    const currentDate = new Date();

    const futureDate = new Date(currentDate.getTime() + timerVariable * 60000);
    return futureDate;
};

module.exports = setTimerDate;