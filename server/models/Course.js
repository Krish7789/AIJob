import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    category: { type: String, required: true },

    title: { type: String, required: true },
    subtitle: { type: String, default: "" },

    rating: { type: Number, default: 0 },
    durationMonths: { type: Number, default: 1 },
    price: { type: Number, default: 0 },

    imageUrl: { type: String, default: "" },
    viewUrl: { type: String, required: true },

    // For personalization/recommendation
    tags: { type: [String], default: [] }, // ["python","dsa","react"]
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
