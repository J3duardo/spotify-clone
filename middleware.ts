import { NextRequest,  NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({req, res});

  const {data, error} = await supabase.auth.getSession();

  return res;
};