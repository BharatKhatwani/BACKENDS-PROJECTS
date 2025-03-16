const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   dueDate: {  // Fixed typo from dueData to dueDate
      type: Date,
      required: true
   },
   priority: {  // Fixed enum structure
      type: String,
      enum: ["low", "medium", "high"],  // Only allows these values
      required: true
   },
   status: {
      type: Boolean,
      default: false  // false = incomplete, true = completed
   },
   userId: {  // Linking task to a user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
