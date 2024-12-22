import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// Create User
export const createUser = asyncHandler(async (req, res) => {
  console.log('Creating a user');

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).send('Email and name are required');
  }

  console.log(`Email: ${email}`);

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  res.status(201).send('User created successfully');
});

// Book Visit
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  if (!email || !date) {
    return res.status(400).send('Email and date are required');
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }, // Assuming the user model has a 'bookedVisits' field
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the residency is already booked by the user
    if (user.bookedVisits.some((visit) => visit.id === id)) {
      return res.status(400).send('This residency is already booked by you.');
    }

    // Update the user's bookedVisits to include the new residency
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: {
          push: { id, date }, // Assuming a relation exists between User and Residency
        },
      },
    });

    res.status(201).send('Residency successfully booked.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking the residency.');
  }
});

// Get All Bookings
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    // Find the user and retrieve their booked visits
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true } // Assuming `bookedVisits` is a relational field
    });

    if (!bookings) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching bookings.');
  }
});
