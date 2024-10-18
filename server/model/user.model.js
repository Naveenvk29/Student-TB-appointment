import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const validSubjectsByDepartment = {
  Math: ["Mathematics"],
  Science: ["Science", "Health Science"],
  English: ["English"],
  "Social Studies": ["Social Studies"],
  "Physical Education": ["Physical Education"],
  Music: ["Music"],
  Arts: ["Arts", "Digital Art"],
  "Home Economics": ["Home Economics"],
  "Computer Science": [
    "Computer Science",
    "Web Development",
    "AL/ML",
    "Data Science",
    "Cybersecurity",
  ],
  "Business Administration": [
    "Business Administration",
    "Economics",
    "Digital Marketing",
  ],
};

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "teacher"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    department: {
      type: String,
      enum: Object.keys(validSubjectsByDepartment),
      required: true,
    },
    subject: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validSubjectsByDepartment[this.department].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid subject for the ${props.instance.department} department.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
