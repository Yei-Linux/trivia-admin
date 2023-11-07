import type { NextApiRequest, NextApiResponse } from 'next';
import { countUsers, createUser, getUsers } from '../../../back/services';

const post = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const body = req.body;

  if (!body) {
    return res.status(500).json([]);
  }

  try {
    const patientCreated = await createUser(body);
    return res.status(201).json(patientCreated);
  } catch (error) {
    return res.status(500).json([]);
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const range = req.query?.range as string;
  const sort = req.query?.sort as string;
  const filter = req.query?.filter as string;

  try {
    const rangeObj = JSON.parse(range);
    if (!rangeObj) throw new Error('Range is required');

    const filterObj = JSON.parse(filter);
    if (!filterObj) throw new Error('Filter is required');

    const [start, end] = rangeObj;
    const sizeByPage = end - start + 1;

    const search = filterObj?.q;

    const total = await countUsers();
    const users = await getUsers(start, sizeByPage, search);
    return res.status(200).setHeader('Content-Range', total).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json([]);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    return await post(req, res);
  }

  if (req.method === 'GET') {
    return await get(req, res);
  }

  return res.status(500).json([]);
}
