const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  nombre: { type: String, required: true },
  correctas: { type: Number, required: true },
  incorrectas: { type: Number, required: true },
  nino: {
    type: Schema.Types.ObjectId,
    ref: "Child",
    required: true,
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
