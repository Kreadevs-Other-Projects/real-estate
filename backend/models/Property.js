const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    location: { type: String },
    images: [{ type: String }],
    category: { type: String },
    areaSqft: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    featured: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
