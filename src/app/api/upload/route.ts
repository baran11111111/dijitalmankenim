import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPresignedUploadUrl } from "@/lib/s3";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await request.json();
  const { filename, contentType } = body as {
    filename?: string;
    contentType?: string;
  };

  if (!filename || !contentType) {
    return NextResponse.json({ error: "Eksik alanlar" }, { status: 400 });
  }

  const key = `uploads/${session.user.id}/${Date.now()}-${filename}`;
  const uploadUrl = await getPresignedUploadUrl(key, contentType);
  return NextResponse.json({
    uploadUrl,
    key,
    publicUrl: `${process.env.S3_PUBLIC_URL}/${key}`,
  });
}
