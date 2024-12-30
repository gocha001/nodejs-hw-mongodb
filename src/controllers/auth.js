// src/controllers/auth.js

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  sendResetToken,
  resetPassword,
  loginAfterRegisterUser,
} from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await loginAfterRegisterUser(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged a user!',
    data: user,
    accessToken: session.accessToken,
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);
  console.log(`us${user}`);
  console.log(`ses${session}`);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
    accessToken: session.accessToken,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  console.log(req.body);
  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const sendResetEmailController = async (req, res) => {
  await sendResetToken(req.body.email);
  console.log(res.statusCode);
  res.json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
