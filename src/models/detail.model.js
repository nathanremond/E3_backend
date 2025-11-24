import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  training_id: {
    type: Number,
    required: true,
    unique: true,
  },

  modules: [
    {
      title: {
        type: String
      },
      duration: {
        type: Number
      }
    },
  ],

  material_needed: {
    type: Array
  },

  level: {
    type: String,
    required: true
  }
});

export default mongoose.model("Detail", detailSchema);
