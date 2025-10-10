import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { roomId } = await req.json();
    const supabase = await createClient();

    const { error } = await supabase
        .from("podcasts")
        .update({ is_live: false })
        .eq("id", roomId);

    if (error) {
        console.error("Failed to end stream:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
