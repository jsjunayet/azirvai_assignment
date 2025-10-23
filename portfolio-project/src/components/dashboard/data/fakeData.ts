import { TRole } from "@/type";

type FakeUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};

// Hardcoded users
export const fakeUsers: FakeUser[] = [
  {
    id: "1",
    name: "Azir Uddin (Admin)",
    email: "admin@example.com",
    role: "ADMIN",
  },
  {
    id: "2",
    name: "John Doe (User)",
    email: "user@example.com",
    role: "USER",
  },
];

// Simulate a login (you can switch user here)
export const getCurrentUser = (): FakeUser => {
  // 🔹 Change this line to "fakeUsers[1]" to simulate a normal user
  return fakeUsers[0]; // Admin by default
};
