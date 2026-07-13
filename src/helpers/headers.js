export const AuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem("access_token")}`,
});