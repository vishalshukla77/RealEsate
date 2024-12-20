import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// Controller function to create a user
export const createUser = asyncHandler(async (req, res) => {
  console.log('Creating a user');

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }

  console.log(`Email: ${email}`);

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  res.status(201).json({
    message: 'User created successfully',
    user,
  });
});
