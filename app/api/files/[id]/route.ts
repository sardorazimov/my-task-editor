import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json();

  const updated = await db
    .update(files)
    .set({
      content: body.content,
    })
    .where(eq(files.id, params.id))
    .returning();

  return NextResponse.json(updated[0]);
}
