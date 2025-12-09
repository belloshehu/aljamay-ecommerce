export const hasExpired = (date: Date) => {
	/* Returns true if time has expired. Otherwise false
    Params: 
        date: date in the future or past

        Example:
            If current date and time is 06/12/2025 10:20Am, and the argument passed is earlier, it will return true
    */

	const expiresIn = parseInt(process.env?.VERIFICATION_CODE_EXPIRATION!);
	return Date.now() - date.getTime() < expiresIn * 60 * 1000;
};
