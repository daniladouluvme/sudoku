import { Router, type Request, type RequestHandler } from "express";
import { isObject } from "lodash";
import { type Model } from "mongoose";
import { verifyToken } from "../../database/utils/verify-token";

export const createCrudRouter = (model: Model<any>, options?: CrudOptions) => {
  const router = Router();

  if (!options || options.get) {
    const methodOptions = options?.get;
    router.get(
      "/:id?",
      ...generateRequestHandlers(methodOptions),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = id ? await model.findById(id) : await model.find();
          if (hasResultHadlers(methodOptions)) {
            methodOptions.resultHadlers.forEach((rh) => rh(req, result));
          }
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.post) {
    const methodOptions = options?.post;
    router.post(
      "/",
      ...generateRequestHandlers(methodOptions),
      async (req, res) => {
        try {
          const result = await model.create(req.body);
          if (hasResultHadlers(methodOptions)) {
            methodOptions.resultHadlers.forEach((rh) => rh(req, result));
          }
          res.status(201).send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.put) {
    const methodOptions = options?.put;
    router.put(
      "/:id",
      ...generateRequestHandlers(methodOptions),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          if (hasResultHadlers(methodOptions)) {
            methodOptions.resultHadlers.forEach((rh) => rh(req, result));
          }
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.patch) {
    const methodOptions = options?.patch;
    router.patch(
      "/:id",
      ...generateRequestHandlers(methodOptions),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          if (hasResultHadlers(methodOptions)) {
            methodOptions.resultHadlers.forEach((rh) => rh(req, result));
          }
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send();
        }
      }
    );
  }

  if (!options || options.delete) {
    const methodOptions = options?.delete;
    router.delete(
      "/:id",
      ...generateRequestHandlers(methodOptions),
      async (req, res) => {
        try {
          const id = req.params.id;
          const result = await model.findByIdAndDelete(id, {
            new: true,
          });
          if (hasResultHadlers(methodOptions)) {
            methodOptions.resultHadlers.forEach((rh) => rh(req, result));
          }
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

const generateRequestHandlers = (options?: CrudPathType): RequestHandler[] => {
  const handlers: RequestHandler[] = [];
  if (isCrudPathOptions(options) && Array.isArray(options.requestHandlers)) {
    handlers.push(...options.requestHandlers);
  } else handlers.push(verifyToken);
  return handlers;
};

interface CrudOptions {
  get?: CrudPathType;
  post?: CrudPathType;
  put?: CrudPathType;
  patch?: CrudPathType;
  delete?: CrudPathType;
}

type CrudPathType = boolean | CrudPathOptions;

interface CrudPathOptions {
  requestHandlers?: RequestHandler[];
  resultHadlers?: ((req: Request, data: any) => void)[];
}

function isCrudPathOptions(options: CrudPathType): options is CrudPathOptions {
  return isObject(options);
}

function hasResultHadlers(options: CrudPathType): options is CrudPathOptions {
  return isCrudPathOptions(options) && Array.isArray(options.resultHadlers);
}
