import { and, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import express from "express";
import { departments, subjects } from "../db/schema";
import { db } from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    const currentPage =
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.floor(parsedPage)
        : 1;
    const limitPerPage =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(Math.floor(parsedLimit), 100)
        : 10;

    const offset = (currentPage - 1) * limitPerPage;

    const filterConditions = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`),
        ),
      );
    }

    if (department) {
      filterConditions.push(ilike(departments.name, `%${department}%`));
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause);

    const totalount = countResult[0]?.count ?? 0;

    const subjectsList = await db
      .select({
        ...getTableColumns(subjects),
        department: { ...getTableColumns(departments) },
      })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause)
      .limit(limitPerPage)
      .offset(offset);

    res.status(200).json({
      data: subjectsList,
      pagination: {
        total: totalount,
        page: currentPage,
        limit: limitPerPage,
        totalPages: Math.ceil(totalount / limitPerPage),
      },
    });
  } catch (err) {
    console.error(`GET /subjects error: ${err}`);
    res.status(500).json({ error: "Failed to get subjects " });
  }
});

export default router;
