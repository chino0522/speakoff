import { NextRequest, NextResponse } from "next/server";
import agoraToken from "agora-access-token";

const { RtcTokenBuilder, RtcRole } = agoraToken as any;

export async function POST(req: NextRequest) {
    const { channelName, uid, isHost } = await req.json();

    const appId = process.env.AGORA_APP_ID!;
    const appCert = process.env.AGORA_APP_CERTIFICATE!;

    const now = Math.floor(Date.now() / 1000);
    const expire = now + 300; // 1 hour

    const role = isHost ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const rtcToken = RtcTokenBuilder.buildTokenWithAccount(
        appId,
        appCert,
        channelName,
        uid,
        role,
        expire
    );

    return NextResponse.json({ appId, rtcToken });
}
