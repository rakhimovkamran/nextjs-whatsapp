export const getRecipientEmail = (users, userIsLoggedIn) =>
    users?.filter((user) => user !== userIsLoggedIn.email)[0]
