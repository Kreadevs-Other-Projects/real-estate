const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { transporter } = require("../services/mail");
const generateVerificationCode = require("../services/otp");
const { validateEmail } = require("../services/validateEmail");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 12));
    const hashed = await bcrypt.hash(password, salt);

    const verificationCode = generateVerificationCode();
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const mailOptions = {
      from: `"Real-Estate" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify Your Account",
      html: `
        <h3>Hello ${name},</h3>
        <p>Your verification code is:</p>
        <h2>${verificationCode}</h2>
        <p>Enter this code in the app to verify your account.</p>
      `,
    };

    console.log(`📧 Sending verification email to: ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    user = new User({
      name,
      email,
      password: hashed,
      role: role || "user",
      profilePic,
      verificationCode,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered, check your email for verification code",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.verificationCode !== code)
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to our platform!",
      html: `<h2>Hi ${user.name}!</h2><p>Your account has been verified successfully 🎉</p>`,
    });

    res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(400)
        .json({ success: false, message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const resetToken = generateVerificationCode();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Code",
      html: `<p>Your password reset code is: <b>${resetToken}</b></p>`,
    });

    res.json({ success: true, message: "Reset code sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};
