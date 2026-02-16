import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  // 1. Adım: params'ın tipini Promise olarak tanımlıyoruz
  { params }: { params: Promise<{ id: string }> } 
) {
  // 2. Adım: params'ın içindeki id'yi await ederek çıkartıyoruz
  const { id } = await params; 
  
  const body = await req.json();

  const updated = await db
    .update(files)
    .set({
      content: body.content,
    })
    // 3. Adım: Artık params.id değil, await ettiğimiz temiz id'yi kullanıyoruz
    .where(eq(files.id, id)) 
    .returning();

  if (!updated[0]) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.json(updated[0]);
}