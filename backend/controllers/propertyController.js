const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const data = req.body;
    data.owner = req.user._id;
 if (typeof data.images === "string") {
      data.images = data.images.split(",").map(img => img.trim());
    } else if (Array.isArray(data.images)) {
      data.images = data.images.map(img => img.trim());
    } else {
      data.images = []; // default empty
    }    const prop = new Property(data);
    await prop.save();
    res.status(201).json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
if (typeof req.body.images === "string") {
      req.body.images = req.body.images.split(",").map(img => img.trim());
    } else if (Array.isArray(req.body.images)) {
      req.body.images = req.body.images.map(img => img.trim());
    }
    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findByIdAndDelete(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!prop) return res.status(404).json({ message: "Property not found" });
    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listProperties = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q)
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { location: new RegExp(q, "i") },
      ];
    if (category) filter.category = category;
    if (minPrice)
      filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
    if (maxPrice)
      filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };

    const props = await Property.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(props);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
