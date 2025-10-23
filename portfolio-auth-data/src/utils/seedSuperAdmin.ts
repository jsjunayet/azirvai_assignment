import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await prisma.user.findFirst({
    where: {
      OR: [{ role: "OWNER" }, { email: "azir@gmail.com" }],
    },
  });
  if (isSuperAdminExits) {
    console.log("Super Admin Already Exists!");
    return;
  }

  if (!isSuperAdminExits) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Azir Uddin",
        email: "azir@gmail.com",
        password: hashedPassword,
        role: "OWNER",
      },
    });
  }
};

export default seedSuperAdmin;
