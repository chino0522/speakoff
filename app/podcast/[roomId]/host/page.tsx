import HostClient from "./HostClient";

export default async function HostPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    return <HostClient roomId={roomId} />;
}
