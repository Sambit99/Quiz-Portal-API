class HandlerFactory {
  getAll = (Model) => {
    return async (req, res, next) => {
      const doc = await Model.find().select("-__v -password");

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    };
  };

  getOne = (Model) => {
    return async (req, res, next) => {
      const doc = await Model.findById(req.params.id);

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    };
  };

  updateOne = (Model) => {
    return async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    };
  };

  deleteOne = (Model) => {
    return async (req, res, next) => {
      await Model.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        data: null,
      });
    };
  };
}

module.exports = new HandlerFactory();
