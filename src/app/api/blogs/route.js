import { asyncResolver, connectDB } from "@/Database/connectDB";
import Description from "@/Database/Models/Description";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const [descriptions, err] = await asyncResolver(Description.find({}));
  if (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  console.log(descriptions);

  return NextResponse.json({ data: descriptions }, { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);

  const [description, err] = await asyncResolver(
    Description.findOneAndUpdate(
      { _id: body._id },
      { content: body.content },
      { new: true }
    )
  );
  if (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  return NextResponse.json(
    { blog: description, message: "blog updated successfully" },
    { status: 200 }
  );
}
