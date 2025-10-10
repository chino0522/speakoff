import { auth } from '@/auth'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import PodcastRoomClientWrapper from '../PodcastRoomClientWrapper'

export default async function Podcast({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params
    const session = await auth()
    if (!session) return notFound()

    const uid = session.user.id
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('podcasts')
        .select('host_id')
        .eq('id', roomId)
        .eq('is_live', true)
        .single()

    if (error || !data?.host_id) notFound()

    const isHost = uid === data.host_id

    return <PodcastRoomClientWrapper roomId={roomId} uid={uid!} isHost={isHost} />
}
