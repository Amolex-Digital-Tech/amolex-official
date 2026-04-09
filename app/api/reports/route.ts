import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireUserSession } from "@/lib/auth";

const DEFAULT_PAGE_SIZE = 20;

export async function GET(request: Request) {
  const context = await requireUserSession();
  const { searchParams } = new URL(request.url);
  
  // Pagination params
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Math.min(
    parseInt(searchParams.get("limit") ?? String(DEFAULT_PAGE_SIZE), 10),
    100 // Max 100 items per page
  );
  const offset = (page - 1) * limit;

  if (!context.tenantId) {
    return NextResponse.json({ error: "No tenant assigned to this user." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  
  // Fetch total count for pagination info
  const { count } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", context.tenantId);

  // Fetch paginated data
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("tenant_id", context.tenantId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data ?? [],
    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / limit)
    }
  });
}
