const { connect } = require("mongoose");

export async function connectDB() {
  const [result, err] = await asyncResolver(
    connect("mongodb://localhost:27017/testing")
  );
  if (err) {
    console.log("Something went wrong ...", err.message);
    return;
  }
  console.log("MongoDB connected successfully");
}

export async function asyncResolver(func) {
  try {
    const res = await func;
    return [res, null];
  } catch (err) {
    return [[], err];
  }
}
