import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// Create Residency
export const createResidency = asyncHandler(async (req, res) => {
    const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data;

    console.log(req.body.data);

    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: { connect: { email: userEmail } },  // Ensure the user exists first before creating a residency
            },
        });

        res.status(201).json({
            message: "Residency created successfully",
            residency,
        });
    } catch (err) {
        if (err.code === "P2002") {
            // Handle the scenario when a residency with the same address exists
            throw new Error("A residency with this address already exists.");
        }
        // Log the error and throw a generic error message
        console.error(err);
        throw new Error("An error occurred while creating the residency.");
    }
});

// Get All Residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc",  // Fix: changed `createAt` to `createdAt`
            },
        });

        res.status(200).json(residencies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching residencies." });
    }
});

// Get Residency by ID
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: {
               id}  // Make sure to parse the ID as an integer if it's a number
            ,
        });

        if (!residency) {
            return res.status(404).json({ message: "Residency not found." });
        }

        res.status(200).json(residency);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching the residency." });
    }
});
