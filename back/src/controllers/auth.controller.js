const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const asyncHandler = require("../middlewares/asyncHandler");
const { AdminAccount } = require("../models");

// Create a function to sign tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m", // Access token valid for 15 mins
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Refresh token valid for 7 days
  });
};

const hashValue = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const normalizeEmail = (email) => (email || "").trim().toLowerCase();

const ensureAdminAccount = async () => {
  const masterEmail = normalizeEmail(process.env.MASTER_ADMIN_EMAIL);
  const masterPasswordStr = (process.env.MASTER_ADMIN_PASSWORD || "").replace(
    /'/g,
    "",
  );

  if (!masterEmail || !masterPasswordStr) {
    return null;
  }

  const passwordHash = hashValue(masterPasswordStr);
  let account = await AdminAccount.findOne({ email: masterEmail });

  if (!account) {
    account = await AdminAccount.create({
      name: "Admin",
      email: masterEmail,
      passwordHash,
    });
  }

  return { account, masterEmail, masterPasswordStr, passwordHash };
};

const getAdminProfile = (account, fallbackEmail) => ({
  id: account?._id?.toString?.() || fallbackEmail,
  name: account?.name || "Admin",
  email: account?.email || fallbackEmail,
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide an email and password",
      });
  }

  const normalizedEmail = normalizeEmail(email);
  const adminState = await ensureAdminAccount();
  const masterEmail =
    adminState?.masterEmail || normalizeEmail(process.env.MASTER_ADMIN_EMAIL);
  const envPassword = (process.env.MASTER_ADMIN_PASSWORD || "").replace(
    /'/g,
    "",
  );
  const expectedPasswordHash =
    adminState?.passwordHash || hashValue(envPassword);

  const account = await AdminAccount.findOne({ email: normalizedEmail });
  const dbPasswordMatch =
    account &&
    account.passwordHash &&
    (password === account.passwordHash || password === envPassword);
  const isEnvMatch =
    normalizedEmail === masterEmail &&
    (password === expectedPasswordHash || password === envPassword);
  const isMatch = Boolean(dbPasswordMatch || isEnvMatch);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const resolvedAccount =
    account || (normalizedEmail === masterEmail ? adminState?.account : null);

  const accessToken = generateToken(resolvedAccount?.email || normalizedEmail);
  const refreshToken = generateRefreshToken(
    resolvedAccount?.email || normalizedEmail,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    data: {
      user: getAdminProfile(resolvedAccount, normalizedEmail),
      accessToken,
    },
  });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = generateToken(decoded.id);

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token is invalid or expired" });
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("refreshToken", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  const account = await AdminAccount.findOne({
    email: normalizeEmail(req.user.id),
  });

  res.status(200).json({
    success: true,
    data: { user: getAdminProfile(account, normalizeEmail(req.user.id)) },
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const currentEmail = normalizeEmail(req.user.id);
  const account = await AdminAccount.findOne({ email: currentEmail });

  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Admin profile not found" });
  }

  const nextName =
    typeof req.body.name === "string" ? req.body.name.trim() : account.name;
  const nextEmail =
    typeof req.body.email === "string" && req.body.email.trim()
      ? normalizeEmail(req.body.email)
      : account.email;

  if (nextEmail !== account.email) {
    const emailExists = await AdminAccount.findOne({ email: nextEmail });
    if (emailExists) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
  }

  account.name = nextName || account.name;
  account.email = nextEmail;
  await account.save();

  res.status(200).json({
    success: true,
    data: { user: getAdminProfile(account, nextEmail) },
  });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const currentEmail = normalizeEmail(req.user.id);
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide current and new password",
      });
  }

  const account = await AdminAccount.findOne({ email: currentEmail });
  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Admin profile not found" });
  }

  if (account.passwordHash !== hashValue(currentPassword)) {
    return res
      .status(401)
      .json({ success: false, message: "Current password is invalid" });
  }

  account.passwordHash = hashValue(newPassword);
  account.resetPasswordTokenHash = undefined;
  account.resetPasswordExpire = undefined;
  await account.save();

  res.status(200).json({ success: true, data: {} });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide an email address" });
  }

  const masterEmail = normalizeEmail(process.env.MASTER_ADMIN_EMAIL);
  const account = await AdminAccount.findOne({ email: normalizedEmail });

  if (!account && normalizedEmail !== masterEmail) {
    return res.status(200).json({
      success: true,
      data: {
        message: "If the email exists, a reset link has been generated.",
      },
    });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashValue(token);
  const resetPasswordExpire = new Date(Date.now() + 1000 * 60 * 30);

  if (account) {
    account.resetPasswordTokenHash = tokenHash;
    account.resetPasswordExpire = resetPasswordExpire;
    await account.save();
  }

  const resetUrl = `${process.env.ADMIN_APP_URL || "http://localhost:5174"}/reset-password/${token}`;

  res.status(200).json({
    success: true,
    data: {
      message: "Reset link generated successfully.",
      resetUrl,
      token,
    },
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide token and password" });
  }

  const tokenHash = hashValue(token);
  const account = await AdminAccount.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpire: { $gt: new Date() },
  });

  if (!account) {
    return res
      .status(400)
      .json({ success: false, message: "Reset token is invalid or expired" });
  }

  account.passwordHash = hashValue(password);
  account.resetPasswordTokenHash = undefined;
  account.resetPasswordExpire = undefined;
  await account.save();

  res.status(200).json({ success: true, data: {} });
});
