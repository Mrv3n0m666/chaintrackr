// src/services/addressService.ts
import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';
import { User } from '../entities/User';

const addressRepo = AppDataSource.getRepository(Address);
const userRepo = AppDataSource.getRepository(User);

export const getAllAddressesByUserId = async (userId: number) => {
  const addresses = await addressRepo.find({
    where: { user: { id: userId } },
    relations: ['user'],
  });
  return addresses;
};

export const getAddressByValue = async (value: string) => {
  return await addressRepo.findOne({
    where: { address: value.toLowerCase() },
    relations: ['user'],
  });
};

export const addNewAddress = async (userId: number, addressValue: string) => {
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const existing = await addressRepo.findOne({
    where: { address: addressValue.toLowerCase(), user: { id: userId } },
  });
  if (existing) throw new Error('Address already added');

  const newAddress = addressRepo.create({
    address: addressValue.toLowerCase(),
    user,
  });

  return await addressRepo.save(newAddress);
};
