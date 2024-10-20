import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
  content: String,
});

const Description =
  mongoose.models.Description ||
  mongoose.model("Description", descriptionSchema);

export default Description;
