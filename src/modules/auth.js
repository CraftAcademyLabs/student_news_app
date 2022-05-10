import JtockAuth from "j-tockauth";

let url = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:3000";
} else {
  url = "https://news-in-progress-api.herokuapp.com";
}
const auth = new JtockAuth({
  host: url,
  prefixUrl: "/api",
});

export default auth;
