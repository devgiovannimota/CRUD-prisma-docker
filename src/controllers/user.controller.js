import bcrypt from "bcrypt";
import * as userRepository from "../repository/user.repository";
import { userValidation } from "../validations/user.validation";
import { response } from "express";

export const create = async (request, response) => {
  try {
    await userValidation.validate(request.body);

    const hashPassword = await bcrypt.hash(request.body.password, 10);
    request.body.password = hashPassword;

    const user = await userRepository.createUser(request.body);
    response.status(200).json({
      error: false,
      message: "User created",
      user: user,
    });
  } catch (error) {
    response.status(400).send(error);
  }
};

export const getAll = async (request, response) => {
  try {
    const users = await userRepository.getAll();
    response.status(200).send(users);
  } catch (error) {
    response.status(400).send(error);
  }
};

export const getId = async (request, response) => {
  try {
    const id = Number(request.params.id);
    const showUser = await userRepository.getById(id);
    if (showUser == null) {
      return response.status(400).json({ message: "User not founded" });
    }
    response.status(200).json({ message: showUser });
  } catch (error) {
    response.status(400).send(error);
  }
};

export const updateUser = async (request, response) => {
  try {
    const user = await userRepository.updatedUser(
      Number(request.params.id),
      request.body
    );
    return response.status(200).send(user);
  } catch (error) {
    response.status(400).send(error);
  }
};

export const deleteUser = async (request, response) => {
  try {
    await userRepository.deletedUser(Number(request.params.id));
    response.status(200).send();
  } catch (error) {
    response.status(400).send(error);
  }
};
