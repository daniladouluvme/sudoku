import { Router, type RequestHandler } from "express";
import { isObject } from "lodash";
import type { Model } from "mongoose";
import { verifyToken } from "../../database/utils/verify-token";

export const createRestApiRouter = (
  model: Model<any>,
  options?: RestApiOptions
) => {
  const router = Router();

  if (!options || options.get) {
    router.get(
      "/:id?",
      ...generateRequestHandlers(options?.get),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = id ? await model.findById(id) : await model.find();
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.post) {
    router.post(
      "/",
      ...generateRequestHandlers(options?.get),
      async (req, res) => {
        try {
          const result = await model.create(req.body);
          res.status(201).send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.put) {
    router.put(
      "/:id",
      ...generateRequestHandlers(options?.get),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.patch) {
    router.put(
      "/:id",
      ...generateRequestHandlers(options?.get),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.delete) {
    router.delete(
      "/:id",
      ...generateRequestHandlers(options?.get),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndDelete(id, {
            new: true,
          });
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  return router;
};

const generateRequestHandlers = (
  options?: RestApiPathType
): RequestHandler[] => {
  const handlers: RequestHandler[] = [];
  if (isObject(options)) handlers.push(...options.requestHandlers);
  else handlers.push(verifyToken);
  return handlers;
};

interface RestApiOptions {
  get?: RestApiPathType;
  post?: RestApiPathType;
  put?: RestApiPathType;
  patch?: RestApiPathType;
  delete?: RestApiPathType;
}

type RestApiPathType = boolean | RestApiPathOptions;

interface RestApiPathOptions {
  requestHandlers: RequestHandler[];
}
