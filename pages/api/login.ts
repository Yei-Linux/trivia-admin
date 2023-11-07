import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminsByEmail } from '../../back/services/admins.service';
import { comparePass } from '../../back/helpers/hashing';
import { Config } from '../../back/config/constants';
import { sign } from '../../back/helpers/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;

  if (!body) {
    return res.status(500).json({
      message: 'Empty Request',
      error: true,
    });
  }

  const email = body.email;
  const password = body.password;

  if (!email || !password) {
    return res.status(500).json({
      message: 'Empty email or password',
      error: true,
    });
  }

  try {
    const admin = await getAdminsByEmail(email);
    if (!admin) {
      return res.status(500).json({
        message: 'admin not found',
        error: true,
      });
    }

    const isEqualPass = comparePass(password, admin.password);
    if (!isEqualPass) {
      return res.status(500).json({
        message: 'Incorrect Password',
        error: true,
      });
    }

    const token = await sign(
      {
        email: admin.email,
        fullName: admin.fullName,
      },
      Config.JWT_SECRET
    );

    return res.status(200).json({
      token,
      personalInfo: {
        email: admin.email,
        fullName: admin.fullName,
      },
      message: 'Login Succesful',
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error in process',
    });
  }
}
