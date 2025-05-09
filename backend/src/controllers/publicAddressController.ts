import { Request, Response } from 'express';
import { isAddress } from 'ethers';
import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';

const addressRepo = AppDataSource.getRepository(Address);

export const getPublicAddress = async (req: Request, res: Response) => {
  const addressParam = req.params.address;

  if (!isAddress(addressParam)) {
    return res.status(400).json({ error: 'Invalid Ethereum address format' });
  }

  try {
    const address = await addressRepo.findOne({
      where: { address: addressParam.toLowerCase() },
      relations: ['user'],
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const sanitized = {
      id: address.id,
      address: address.address,
      userId: address.user.id,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };

    return res.json(sanitized);
  } catch (error) {
    console.error('Error in getPublicAddress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
