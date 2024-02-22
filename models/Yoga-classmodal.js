// yogaClassSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;
const invitedUserSchema = new Schema({
  name: String,
  email: String,
});
const videoSchema = new Schema({
  type: {
    type: String,
    enum: ["image", "video"],
  },
  file: {
    type: String,
  },
});

const feeSchema = new Schema({
  currency: String,
  fee: Number,
  fee_inr: Number,
});

const experiencesSchema = new Schema({
  title: String,
  institution: String,
});

const teacherSchema = new Schema({
  id: Number,
  profile_picture: String,
  first_name: String,
  full_name: String,
  tags: [String],
  practicing_years: Number,
  teaching_years: Number,
  style: [String],
  description: String,
  experiences: [experiencesSchema],
  invited_users: [Number],
  location: String,
  school_description: String,
  school_name: String,
  school_images: [videoSchema],
  profile_videos: [videoSchema],
  domain: String,
});

const yogaClassSchema = new Schema({
  id: Number,
  type: String,
  images: [videoSchema],
  videos: String,
  title: String,
  slug: String,
  description: String,
  tags: String,
  level: String,
  style: String,
  start_time: String,
  utc_start_time: String,
  duration: Number,
  streamed_count: Number,
  repeat_type: String,
  repeat_value: String,
  no_drop_in: Boolean,
  recurring_class: Boolean,
  join_after_start: Boolean,
  start_date: String,
  end_date: String,
  single_currency_fee: feeSchema,
  period_currency_fee: feeSchema,
  video_platform: String,
  video_link: String,
  video_password: String,
  meeting_id: String,
  zoom_link: String,
  utc_start_at: Number,
  utc_end_at: Number,
  teacher: teacherSchema,
  invited_users: {
    type: Array,
    default: [],
  },
  location: String,
  school_description: String,
  school_name: String,
  school_images: {
    type: [String], // Assuming it's an array of image file URLs
    default: [],
  },
  profile_videos: {
    type: [String], // Assuming it's an array of video file URLs
    default: [],
  },
  domain: String,
});

const YogaClass = mongoose.model("YogaClass", yogaClassSchema);

export default YogaClass;
