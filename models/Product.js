const mongoose = require("mongoose");

//Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [3, "Minimum product name length is 3"],
      maxLength: [100, "Maximum product name length is 100"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) return true;
          return false;
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//mongoose middleware for saving date: pre / post
productSchema.pre("save", function (next) {
  // console.log("Before saving data");

  //we can access properties using this
  if (this.quantity === 0) this.status = "out-of-stock";
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

//mongoose instance methods
productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

//Models
const Product = mongoose.model("product", productSchema);

module.exports = Product;
