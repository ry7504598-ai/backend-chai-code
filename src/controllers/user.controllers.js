import { asyncesHandler } from "../utils/ayncesHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User}  from "../models/user.model.js"
import {uploadInCloundinary } from "../utils/cloudnary.js"
import { ApiResoponse } from "../utils/ApiResponse.js";
const registerUser = asyncesHandler(async (req, res) => {
  // get user details from frontend
  //validation - not empty
  // check if user already exists: username, email
  // check for images , check for avatar
  // upload form coludniary
  // create user object - create entry in db
  // remove password and refresh token filed form response
  // check for user creation
  //return res

  const { fullName, email, username, password } = req.body;
  // if(fullName ===""){
  //   throw new ApiError(400, "fullname is required")
  // }
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required")
  }
  const existedUser = User.findOne({
    $or: [{username},{email}]
  })
  if (existedUser){
    throw new ApiError(409, "user with email or username already exists ")
  }

 const avatarLocalPath =  req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
  throw new ApiError(400, "avatar is required")
 }
 if(!coverImageLocalPath){
  throw new ApiError(400, "cover image is required")
 }

 const avatarImage = await uploadInCloundinary(avatarLocalPath);
 const coverImage = await uploadInCloundinary(coverImageLocalPath);
   
 if(!avatarImage){
  throw new ApiError(400, "avatar image upload failed")
 }

 const user = await User.create({
  fullName,
  avatar: avatarImage.url,
  coverImage: coverImage.url|| "",
  email,
  password,
  username:username.toLowerCase(),
 })
  const createdUser =  await User.findById(user._id,).select(
    "-password -refreshToken"
  )
    if(!createdUser){
      throw new ApiError(500, "something went wrong while registering user")
    }

    return res.status(201).json(new ApiResoponse(201, createdUser, "user registered successfully"))

});

export { registerUser };
