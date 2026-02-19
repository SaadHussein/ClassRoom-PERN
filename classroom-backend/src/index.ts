// import { eq } from "drizzle-orm";
// import * as dbModule from "./db";
// import { demoUsers } from "./db/schema";

// const { db } = dbModule;
// const pool = (dbModule as { pool?: { end: () => Promise<void> } }).pool;

// async function main() {
//   try {
//     console.log("Performing CRUD operations...");

//     const [newUser] = await db
//       .insert(demoUsers)
//       .values({ name: "Admin User", email: "admin@example.com" })
//       .returning();

//     if (!newUser) {
//       throw new Error("Failed to create user");
//     }

//     console.log("CREATE: New user created:", newUser);

//     const foundUser = await db
//       .select()
//       .from(demoUsers)
//       .where(eq(demoUsers.id, newUser.id));
//     console.log("READ: Found user:", foundUser[0]);

//     const [updatedUser] = await db
//       .update(demoUsers)
//       .set({ name: "Super Admin" })
//       .where(eq(demoUsers.id, newUser.id))
//       .returning();

//     if (!updatedUser) {
//       throw new Error("Failed to update user");
//     }

//     console.log("UPDATE: User updated:", updatedUser);

//     await db.delete(demoUsers).where(eq(demoUsers.id, newUser.id));
//     console.log("DELETE: User deleted.");

//     console.log("\nCRUD operations completed successfully.");
//   } catch (error) {
//     console.error("Error performing CRUD operations:", error);
//     process.exit(1);
//   } finally {
//     if (pool) {
//       await pool.end();
//       console.log("Database pool closed.");
//     }
//   }
// }

// main();
import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Classroom backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Root URL: http://localhost:${PORT}/`);
});
