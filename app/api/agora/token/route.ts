import { NextRequest, NextResponse } from "next/server";
import agoraToken from "agora-access-token";

const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = agoraToken as any;

export async function POST(req: NextRequest) {
    const { channelName, uid, role } = await req.json();

    const appId = process.env.AGORA_APP_ID!;
    const appCert = process.env.AGORA_APP_CERTIFICATE!;

    const expireSeconds = 3600; // 1 hour

    const rtcRole = role === "host" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    const intUid = Number(uid);

    const rtcToken = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCert,
        channelName,
        intUid,
        rtcRole,
        Math.floor(Date.now() / 1000) + expireSeconds
    );

    const rtmToken = RtmTokenBuilder.buildToken(
        appId,
        appCert,
        String(uid),
        RtmRole.Rtm_User,
        Math.floor(Date.now() / 1000) + expireSeconds
    );

    return NextResponse.json({ appId, rtcToken, rtmToken });
}
