import ejs from "ejs";
import { Response } from "express";

import path from "path";
import { IActivationInfo, IUser } from "../../types/user";
import { createActivationToken } from "../lib/activationToken";
import { errorMessage } from "../lib/errorHandler";
import { sendMails } from "../lib/sendMail";
import UserModel from "../models/user.model";

export const registerUserService = async (
  activationMailData: IActivationInfo,
  res: Response
) => {
  const { token, activationCode } = createActivationToken(activationMailData);

  const data = {
    user: { name: activationMailData.fullName },
    activationCode: activationCode,
  };

  const html = await ejs.renderFile(
    path.join(__dirname, "/../views/mail.ejs"),
    data
  );
  try {
    await sendMails({
      email: activationMailData.email,
      subject: "Activate your account",
      templete: "mail.ejs",
      data,
    });

    res.status(200).json({
      success: true,
      message: `Please check your email: ${activationMailData.email} to activate your account`,
      activationToken: token,
    });
  } catch (error: any) {
    errorMessage(res, 400, error.message);
  }
};

export const activationUserService = async (
  newUser: IActivationInfo,
  res: Response
): Promise<IUser> => {
  //user data save in database
  const { fullName, email, password, avatar, phone, address, isSocialAuth } =
    newUser;

  const isEmailExist = await UserModel.exists({ email });

  if (isEmailExist) {
    errorMessage(res, 400, "Email Alredy Exist");
  }

  const user = await UserModel.create({
    fullName,
    email,
    password,
    avatar,
    phone,
    address,
    isSocialAuth,
  });

  return user;
};
