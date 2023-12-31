


import { connectDb } from '@/helper/db';
import User from '@/models/user';
import { compare } from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
  await connectDb();

  const { email, password } = await req.json(); // Change this line

  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // check user exists or not
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: 'Account not found with this email',
      });
    }

    // check password with database
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect Password',
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
      },
      'default_secret_key',
      { expiresIn: '1d' }
    );

    const finalResult = {
      token,
      user: {
        _id: checkUser._id,
        email: checkUser.email,
        username: checkUser.username,
      },
    };
    //console.log(token);

    return NextResponse.json({
      success: true,
      message: 'Login Successful',
      finalResult,
    });
  } catch (error) {
    console.error('Error while login. Please try again:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later',
    });
  }
}













