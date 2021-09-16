const mongoose = require("mongoose");
const { Schema } = mongoose;

const NinoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: String, required: true },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: true
 },
 actividades: [{
  type: Schema.Types.ObjectId,
  ref: 'Activity'
}]
});

module.exports = mongoose.model("Child", NinoSchema);
