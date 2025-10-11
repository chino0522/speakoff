"use client";
import { createClient } from "@supabase/supabase-js";

export const createClientBrowser = () =>
    createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! // this one is safe for browser
    );
