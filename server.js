require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = require("./app");

// database connection
async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log("Database connection successful".bgGreen.bold);
  } catch (error) {}
}

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
