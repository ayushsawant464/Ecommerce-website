const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true
        }
      },
      
    ],  
    paymentStatus: {
      required:false,
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);