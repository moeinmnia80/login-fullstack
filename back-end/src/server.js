const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`API running at http://localhost:${env.port}`);
});
