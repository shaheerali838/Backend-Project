import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  const { fullName, username, email, password } = req.body;
  console.log(`fullname: ${fullName}`);

  // validation : not empty

  if (
    [fullName, username, email, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "FullName is Required");
  }

  // check if user already exist: username , email

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with Email or Username already exist");
  }
  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImgLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Required");
  }
  // upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImgLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is Required");
  }
  // create user object - create db entry
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshTokens"
  );
  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user Registered Successfully"));
});

export { registerUser };
