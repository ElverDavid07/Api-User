import { Request, Response } from "express";
import { errorHttp } from "../errors/error.handle";
import {
  getAllUsers,
  getOneUser,
  LoginUser,
  registerNewUser,
  updateUser,
} from "../services/user.services";

const getUsers = async ({ query }: Request, res: Response) => {
  const { page = 1, limit = 10 } = query;
  try {
    const option = {
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
      sort: { createdAt: "desc" },
    };
    const response = await getAllUsers(option);
    if (option.page > response.totalPages) {
      throw new Error("Page not found");
    } else {
      res.json(response);
    }
  } catch (error) {
    errorHttp(res, "ERROR_GET_USERS", error);
  }
};

const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getOneUser(id);
    if (response) {
      res.json(response);
    } else {
      res.status(500);
      res.json("ERROR_USER_NOT_FONT");
    }
  } catch (error) {
    errorHttp(res, "ERROR_GET_USER", error);
  }
};
//register new user
const registerUser = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerNewUser(body);
    res.json(response);
  } catch (error) {
    errorHttp(res, "ERROR_REGISTER_NEW_USER", error);
  }
};
//login user
const userLogin = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await LoginUser({ email, password });
    if (response === "PASSWORD_INCORRECT") {
      res.status(403);
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    errorHttp(res, "ERROR_REGISTER_NEW_USER", error);
  }
};
//update user
const putUser = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateUser(id, body);
    if (response === "THE_USER_DOES_NOT_EXIST") {
      res.status(403);
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    errorHttp(res, "ERROR_UPDATE_USER", error);
  }
};

export { getUsers, getUser, registerUser, userLogin, putUser };
