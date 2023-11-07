import prisma from '../config/prisma';

export const getAdminsByEmail = async (email: string) => {
  try {
    const admin = await prisma.admins.findFirst({
      where: {
        email,
      },
    });

    return admin;
  } catch (error) {
    throw new Error('Error searching a doctor');
  }
};

export interface ICreateAdmin {
  email: string;
  password: string;
  fullName: string;
}
export const createAdmin = async (adminReq: ICreateAdmin) => {
  try {
    const admin = await prisma.admins.create({
      data: adminReq,
    });

    return admin;
  } catch (error) {
    throw new Error('Error creating a doctor');
  }
};
