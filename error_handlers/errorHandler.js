exports.internalErrorHandler = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.genericError = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};

exports.unauthorisedMethod = (req, res, next) => {
  res.status(404).send({ msg: "not found" });
};
