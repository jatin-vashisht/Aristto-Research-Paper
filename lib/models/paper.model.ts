import { model, models, Schema } from "mongoose";

const paperSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  authors: {
    type: [String],
    required: true,
    minlength: 1,
    maxlength: 10
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  publicationYear: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear() + 1
  },
  citationsCount: {
    type: Number,
    min: 0,
    default: 0
  }
})

const Paper = models.Paper || model('Paper', paperSchema);

export default Paper;