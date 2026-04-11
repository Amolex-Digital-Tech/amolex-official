import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const schema = process.env.SUPABASE_SCHEMA || "public";
  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }
  return createClient(url, key, { db: { schema } });
}

async function sendTelegramMessage(chatId: string, message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const telegram_username = (body.telegram_username || "").replace("@", "").trim();
    const message = (body.message || "").toString();

    if (!telegram_username) {
      return NextResponse.json({ success: false, error: "telegram_username required" }, { status: 400 });
    }
    if (!message.trim()) {
      return NextResponse.json({ success: false, error: "message required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { data: user, error } = await supabase
      .from("clients")
      .select("telegram_chat_id")
      .eq("telegram_username", telegram_username)
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    if (!user.telegram_chat_id) {
      return NextResponse.json({ success: false, error: "User has not started the bot yet" }, { status: 400 });
    }

    await sendTelegramMessage(user.telegram_chat_id, message);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("send-message route error", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
