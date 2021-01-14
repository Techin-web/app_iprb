
export const setError = (error) => {
    return {type: 'error', error, date: new Date().getTime()}
};
