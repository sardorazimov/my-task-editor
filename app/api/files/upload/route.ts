import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const formData = await req.formData();

  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "no file" });

  const content = await file.text();

  const saved = await db
    .insert(files)
    .values({
      name: file.name,
      content,
    })
    .returning();

  return NextResponse.json(saved[0]);
}
