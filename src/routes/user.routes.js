import * as userController from "../controllers/user.controller";

const userRoutes = (app) => {
  app.post("/user", userController.create);
  app.get("/users", userController.getAll);
  app.get("/user/:id", userController.getId);
  app.put("/user/:id", userController.updateUser);
  app.delete("/user/:id", userController.deleteUser);
};

export default userRoutes;
