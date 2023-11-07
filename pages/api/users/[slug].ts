import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUser } from '../../../back/services';

const put = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const id = req.query?.slug as string;
  const body = req.body;

  if (!body) {
    res.status(500).json([]);
    return;
  }

  try {
    if (!id) throw new Error('Id is required');

    const patient = await updateUser(body, id);
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({});
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const id = req.query?.slug as string;

  try {
    if (!id) throw new Error('Id is required');

    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({});
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    return await get(req, res);
  }

  if (req.method === 'PUT') {
    return await put(req, res);
  }

  return res.status(500).json([]);
}
