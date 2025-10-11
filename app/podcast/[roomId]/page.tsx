import { auth } from '@/auth'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import PodcastRoomClient from '../PodcastRoomClient'

export default async function Podcast({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params; // ✅ await params before using it

    const session = await auth();

    if (!session) {
        // Redirect must use notFound or redirect() (NextResponse is not valid here)
        return notFound();
    }

    const uid = session.user.id;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('podcasts')
        .select('host_id')
        .eq('id', roomId)
        .eq('is_live', true)
        .single();


    if (error || !data?.host_id) {
        notFound();
    }

    const isHost = uid === data.host_id;

    return <PodcastRoomClient roomId={roomId} uid={uid!} isHost={isHost} />;
}
