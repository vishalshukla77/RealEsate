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


export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body; // Extract the user's email from the request body
  const { id } = req.params; // Extract the visit ID to cancel from the request params

  try {
    // Find the user and their booked visits
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { bookedVisits: true }, // Select only the booked visits field
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the visit exists in the user's bookedVisits
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

   if(index===-1)
{

  res.status(400).json({message:"Booking not found"});

}else{


  user.bookedVisits.splice(index,1);
  await prisma.user.update({
    where:{email},
    data:{
      bookedVisits:user.bookedVisits,
    },
  });

  res.send("Booking cancelled successfully")
}
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id != rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updatedUser });
    } else {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });

      res.send({ message: "Updated favorites", user: updatedUser });
    }

    res.status(200).json({
      message: "Favorites updated successfully",
      favResidenciesID: updatedUser.favResidenciesID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
