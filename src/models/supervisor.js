const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupervisorSchema = new Schema({
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true },
  ninos: [{
    type: Schema.Types.ObjectId,
    ref: 'Child'
 }]
});

module.exports = mongoose.model("Supervisor", SupervisorSchema);