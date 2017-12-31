import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  download: { type: String },
  whereBuy: { type: String },
  readIn: { type: String },
  name: { type: String, required: true },
  author: { type: String },
  ganre: { type: String },
  description: { type: String },
  picture: { type: String },
});

mongoose.model('Books', BookSchema);
