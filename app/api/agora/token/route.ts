import { NextRequest, NextResponse } from "next/server";
import agoraToken from "agora-access-token";

const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = agoraToken as any;

export async function POST(req: NextRequest) {
    const { channelName, uid, isHost } = await req.json();

    const appId = process.env.AGORA_APP_ID!;
    const appCert = process.env.AGORA_APP_CERTIFICATE!;

    const currentTime = Math.floor(Date.now() / 1000);
    const privillegeExpireTime = currentTime + 3600 // 1 hour

    const rtcRole = isHost ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const rtcToken = RtcTokenBuilder.buildTokenWithAccount(
        appId,
        appCert,
        channelName,
        uid,
        rtcRole,
        privillegeExpireTime
    );

    return NextResponse.json({ appId, rtcToken });
}
