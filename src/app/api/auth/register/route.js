
import { connectDb } from '@/helper/db';
import Joi from 'joi';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

// Validation schema using Joi
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required(),
  phone: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

// Export the post function for handling HTTP POST requests
export async function POST(req) {
  connectDb();
  const { username, email, password, phone } = await req.json();
 
  // Validate the schema
  const { error } = schema.validate({ username, email, password, phone });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  // Save user in the database
  try {
    // Check if the user already exists
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: 'User is Already Exists. Please try with another Email',
      });
    } else {
      const hashPassword = await hash(password, 12);
      const newlyCreatedUser = await User.create({
        username,
        email,
        password: hashPassword,
        phone,
      });
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: 'Account is Created successfully',
        });
      }
    }
  } catch (error) {
    console.error('Error in new user registration:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later',
    });
  }
}
