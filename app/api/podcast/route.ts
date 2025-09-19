import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only
);

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
            })
            .select("id") // fetch generated id
            .single();

        if (error) throw error;

        console.log(data)

        return NextResponse.json({ roomId: data.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
