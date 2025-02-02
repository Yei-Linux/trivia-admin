import type { NextApiRequest, NextApiResponse } from "next";
import { createAdmin } from "../../back/services/admins.service";
import { crypt } from "../../back/helpers/hashing";
import { Config } from "../../back/config/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!Config.IS_API_CREATE_ADMINS_ENABLE) {
    return res.status(500).json({
      message: "You are not available to create a user",
    });
  }

  const body = req.body;

  if (!body) {
    return res.status(500).json({
      message: "Empty Request",
    });
  }

  const email = body.email;
  const password = crypt(body.password);
  const fullName = body.fullName;

  const isValidBody = email && password && fullName;
  if (!isValidBody) {
    return res.status(500).json({
      message: "Invalid Request",
      error: true,
    });
  }

  try {
    const admin = await createAdmin({
      email,
      password,
      fullName,
    });

    return res.status(200).json({
      data: admin,
      message: "Admin created succesful",
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in process",
    });
  }
}
