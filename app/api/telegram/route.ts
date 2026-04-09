import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const schema = process.env.SUPABASE_SCHEMA || "public";
  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }
  return createClient(url, key, { db: { schema } });
}

// Handle incoming Telegram webhook updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle Telegram webhook verification
    if (body.chat_type !== undefined) {
      return NextResponse.json({ status: "ok" });
    }

    // This is a regular update from Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error("Missing TELEGRAM_BOT_TOKEN");
    }

    // Handle incoming messages
    if (body.message) {
      const chatId = body.message.chat.id.toString();
      const text = body.message.text || "";
      const username = body.message.from?.username || "";
      const firstName = body.message.from?.first_name || "";

      // If user has a username, we can map them in our clients table
      if (username) {
        const supabase = getServiceClient();
        
        // Update client's telegram_chat_id if they exist
        const { data: existingClient } = await supabase
          .from("clients")
          .select("id, telegram_username")
          .eq("telegram_username", username.toLowerCase())
          .maybeSingle();

        if (existingClient) {
          // Update the chat_id
          await supabase
            .from("clients")
            .update({ telegram_chat_id: chatId })
            .eq("id", existingClient.id);

          // Send a welcome message
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: `Welcome to Amolex Digital Technologies! 👋\n\nYou can now receive updates and messages from your account. Use the dashboard to send you notifications.`
            })
          });
        } else {
          // If no client found with this username, just acknowledge
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: `Welcome to Amolex Digital Technologies! 👋\n\nTo use our messaging service, please contact the admin to add your Telegram username to your client account.`
            })
          });
        }
      }
    }

    // Handle /start command - same as above but focused on registration
    if (body.message?.text === "/start") {
      const chatId = body.message.chat.id.toString();
      const username = body.message.from?.username || "";

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Welcome to Amolex Bot! 🤖\n\nType /help for available commands.`
        })
      });
    }

    // Handle /help command
    if (body.message?.text === "/help") {
      const chatId = body.message.chat.id.toString();

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Available commands:\n/start - Start the bot\n/help - Show this help message\n\nYou'll receive notifications from the admin when they send messages through the dashboard.`
        })
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET requests (Telegram webhook verification)
export async function GET() {
  return NextResponse.json({ status: "ok", message: "Telegram bot is running" });
}