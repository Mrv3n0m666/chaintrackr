import { Router } from 'express';
import {
  getAll,
  getByAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressValueController,
} from '../controllers/addressController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get all addresses of the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/address/{address}:
 *   get:
 *     summary: Get a specific address detail
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address found
 *       404:
 *         description: Address not found
 */
router.get('/:address', getByAddress);

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Add a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added
 */
router.post('/', addAddress);

/**
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Update an address by ID
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *     responses:
 *       200:
 *         description: Address updated
 *       404:
 *         description: Address not found
 */
router.put('/:id', updateAddress);

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address deleted
 *       404:
 *         description: Address not found
 */
router.delete('/:id', deleteAddress);

/**
 * @swagger
 * /api/address/value/{address}:
 *   get:
 *     summary: Get value of an address (native & tokens)
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Value of address
 *       404:
 *         description: Address not found
 */
router.get('/value/:address', getAddressValueController);

export default router;
