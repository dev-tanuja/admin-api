const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./src/models/Admin"); // adjust path as needed

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@gmail.com";
  const plainPassword = "Admin123";

  await Admin.deleteMany({ email }); // clean up old admin

  console.log("Creating admin with password:", plainPassword);

  const admin = await Admin.create({
    email,
    password: plainPassword, // Let pre-save hook hash it
  });

  console.log("✅ Admin created:", admin);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
