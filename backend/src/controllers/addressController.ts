import { Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';
import { getAddressByValue } from '../services/addressService';
import { AuthRequest } from '../middlewares/authMiddleware';
import { addressSchema } from '../validators/addressValidator';

const addressRepo = AppDataSource.getRepository(Address);

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get all addresses for the authenticated user
 *     tags:
 *       - Address
 *     responses:
 *       200:
 *         description: List of addresses
 *       401:
 *         description: Unauthorized
 */
export const getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;

  try {
    const addresses = await addressRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const result = addresses.map((addr) => ({
      id: addr.id,
      address: addr.address,
      userId: addr.user.id,
      createdAt: addr.createdAt,
      updatedAt: addr.updatedAt,
    }));

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/address/{address}:
 *   get:
 *     summary: Get address detail by address string
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: The address to retrieve details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details
 *       404:
 *         description: Address not found
 */
export const getByAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { address } = req.params;

  try {
    const found = await addressRepo.findOne({
      where: {
        address: address.toLowerCase(),
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!found) {
      return res.status(404).json({ error: 'Address not found' });
    }

    return res.json({
      id: found.id,
      address: found.address,
      userId: found.user.id,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Add new address for authenticated user
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: Address to be added
 *                 example: "0x1234abcd5678efgh"
 *     responses:
 *       201:
 *         description: Address successfully added
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
export const addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;

  const validation = addressSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  try {
    const address = addressRepo.create({
      address: validation.data.address.toLowerCase(),
      user: { id: userId },
    });

    const saved = await addressRepo.save(address);

    return res.status(201).json({
      id: saved.id,
      address: saved.address,
      userId: userId,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Update address by ID for authenticated user
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the address to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: New address
 *                 example: "0x5678abcd1234efgh"
 *     responses:
 *       200:
 *         description: Address successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Address not found or not owned by user
 */
export const updateAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  const validation = addressSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  try {
    const address = await addressRepo.findOne({
      where: { id: parseInt(id), user: { id: userId } },
      relations: ['user'],
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found or not owned by user' });
    }

    address.address = validation.data.address.toLowerCase();
    const saved = await addressRepo.save(address);

    return res.json({
      id: saved.id,
      address: saved.address,
      userId: saved.user.id,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Delete address by ID for authenticated user
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the address to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address successfully deleted
 *       404:
 *         description: Address not found or not owned by user
 */
export const deleteAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  try {
    const address = await addressRepo.findOne({
      where: { id: parseInt(id), user: { id: userId } },
      relations: ['user'],
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found or not owned by user' });
    }

    await addressRepo.remove(address);
    return res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/address/{address}/value:
 *   get:
 *     summary: Get value of address by address string
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: The address to check value for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address value details
 *       404:
 *         description: Address not found or not owned by user
 */
export const getAddressValueController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { address } = req.params;

  try {
    const found = await addressRepo.findOne({
      where: {
        address: address.toLowerCase(),
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!found) {
      return res.status(404).json({ error: 'Address not found or not owned by user' });
    }

    const value = await getAddressByValue(found.address);
    return res.json(value);
  } catch (err) {
    next(err);
  }
};
