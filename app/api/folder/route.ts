import { db } from "@/lib/db";
import { folders } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const folder = await db
    .insert(folders)
    .values({
      name: body.name,
      parentId: body.parentId || null,
    })
    .returning();

  return NextResponse.json(folder[0]);
}
