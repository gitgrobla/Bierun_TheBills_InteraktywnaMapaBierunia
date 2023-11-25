

const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({ error: "Błąd serwera" });
};

export {
    errorHandler
}
