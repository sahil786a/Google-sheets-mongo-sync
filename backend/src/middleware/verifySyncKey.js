const verifySyncKey = (req, res, next) => {
  const expectedSecret = process.env.SYNC_SECRET;
  const providedSecret = req.get('x-sync-secret');

  if (!expectedSecret) {
    return res.status(500).json({
      success: false,
      message: 'Server sync secret is not configured',
    });
  }

  if (!providedSecret || providedSecret !== expectedSecret) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized sync request',
    });
  }

  next();
};

module.exports = verifySyncKey;
