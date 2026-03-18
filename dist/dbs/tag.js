"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;
const TagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    createdAt: { type: Date, Default: Date.now }
});
const Tag = mongoose.model("tag", TagSchema);
module.exports = Tag;
