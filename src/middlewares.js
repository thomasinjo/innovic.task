function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const validationForProducts = (req, res, next) => {
  const body = req.body;
  const arraySeasons = ["winter", "spring", "summer", "autumn"];
  const arraySizes = ["XS", "S", "M", "L", "XL"];
  const arrayStatus = ["available", "unavailable", "pending"];

  if (!body.productName) {
    return next(new Error("Name required for product"));
  }
  if (!body.collection || !arraySeasons.includes(body.collection?.toLocaleLowerCase())) {
    return next(new Error("Collection must be one of 4 seasons"));
  }
  if (!body.sizesAvailable) {
    return next(new Error("Sizes are reuqired field"));
  }
  if (!body.status || !arrayStatus.includes(body.status?.toLocaleLowerCase())) {
    return next(new Error("Status can be available, unavailable or pending"));
  }
  if (!isNaN(String.fromCharCode(body.price))) {
    return next(new Error("Price must be number"));
  }
  return next();
}

module.exports = {
  notFound,
  errorHandler,
  validationForProducts
};
