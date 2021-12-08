const OBJECT_CHANGE = "OBJECT_CHANGE";
const MODEL_NAME_OBJECT = "objects";

module.exports.createObjectResolver = function (
  database,
  Operation,
  withFilter,
  pubsub
) {
  return {
    Subscription: {
      object: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(OBJECT_CHANGE),
          (payload, args) => {
            if (args.objectId) {
              return payload.object.objectId === args.objectId;
            }
            return true;
          }
        ),
      },
    },
    Query: {
      objects: async (root, args) => {
        return await database.models[MODEL_NAME_OBJECT].findAll();
      },
    },
    Mutation: {
      createObject: async (root, args, context, info) => {
        const object = await database.models[MODEL_NAME_OBJECT].create(args);
        pubsub.publish(OBJECT_CHANGE, {
          object: object.dataValues,
        });
        return object.dataValues;
      },
      updateObject: async (root, args, context, info) => {
        const filter = {
          where: { objectId: args.objectId },
          returning: true,
        };
        const object = (
          await database.models[MODEL_NAME_OBJECT].update(args, filter)
        )[1][0];
        pubsub.publish(OBJECT_CHANGE, {
          object: object.dataValues,
        });
        return object.dataValues;
      },
    },
  };
};
