import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const newFile = await db
    .insert(files)
    .values({
      name: body.name,
      content: "",
      folderId: body.folderId || null,
    })
    .returning();

  return NextResponse.json(newFile[0]);
}
export async function GET() {

  const all = await db.select().from(files);

  return NextResponse.json(all);
}
