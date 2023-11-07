import prisma from '../config/prisma';

export const countUsers = async () => {
  try {
    const total = await prisma.users.count();
    return total;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export interface IUser {
  phone: string;
  fullName: string;
  documentNumber: string;
}
export const createUser = async (user: IUser) => {
  try {
    return await prisma.users.create({
      data: user,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateUser = async (user: IUser, id: string) => {
  try {
    return await prisma.users.update({
      where: {
        id,
      },
      data: user,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUsers = async (
  skip: number,
  sizeByPage: number,
  search?: string
) => {
  try {
    let pipeline: any = [{ $skip: skip }, { $limit: sizeByPage }];

    if (search) {
      pipeline = [
        {
          $match: {
            $or: [
              { fullName: { $regex: search, $options: 'i' } },
              {
                phone: { $regex: search, $options: 'i' },
              },
              {
                documentNumber: { $regex: search, $options: 'i' },
              },
            ],
          },
        },
        ...pipeline,
      ];
    }

    const userssResultSet: any = await prisma.users.aggregateRaw({
      pipeline,
    });

    return userssResultSet?.map(({ _id, ...item }: any) => ({
      ...item,
      id: _id['$oid'],
    }));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const userResultSet = await prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        phone: true,
        fullName: true,
        email: true,
        isInactive: true,
        notes: true,
      },
    });

    if (!userResultSet) throw new Error('Patient not found');

    return userResultSet;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
