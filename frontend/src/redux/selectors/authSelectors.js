export const isAuthenticated = (state) => state.auth.token;
export const getUserName = (state) => state.auth.user.email.split("@")[0];
export const getUserEmail = (state) => state.auth.user.email;
