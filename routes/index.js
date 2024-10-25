import { errHandler, requestNotFound } from "../middleWare/handleRequest.js";
import productsRoutes from "./productsRoutes.js";

const initRouter = (app) => {
  // app.use("/api", authRoutes);
  app.use("/api/products", productsRoutes);
  app.use(requestNotFound);
  app.use(errHandler);
};

export default initRouter;
