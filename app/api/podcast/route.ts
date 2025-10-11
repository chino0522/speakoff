import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only
);

export async function PATCH(req: NextRequest) {
    try {
        const { roomId } = await req.json();

        const { error } = await supabase
            .from("podcasts")
            .update({ is_live: false, end_time: new Date().toISOString() })
            .eq("id", roomId);

        if (error) throw error;

        return NextResponse.json({ message: "Podcast ended successfully" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    const { data, error } = await supabase.from("podcasts").select("*").eq("is_live", true);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    try {
        const { title, description, tags, host_id } = await req.json();

        // Insert without an id → Supabase will auto-generate UUID
        const { data, error } = await supabase
            .from("podcasts")
            .insert({
                host_id,
                title,
                description,
                tags,
                start_time: new Date().toISOString(),
                is_live: true,
            })
            .select("id") // fetch generated podcast id
            .single();

        if (error) throw error;

        console.log(data)

        return NextResponse.json({ roomId: data.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
