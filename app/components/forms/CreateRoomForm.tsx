import { auth } from "@/auth"; // your NextAuth auth helper
import { Button } from "@radix-ui/themes";
import { redirect } from 'next/navigation';

export default async function CreateRoomForm() {
    // Fetch the user session on the server
    const session = await auth();

    if (!session?.user?.id) {
        return <p className="text-red-500">You must be signed in to create a podcast.</p>;
    }

    return (
        <form
            action={async (formData: FormData) => {
                "use server";

                const title = formData.get("title") as string;
                const description = formData.get("description") as string;
                const tags = formData.get("tags") as string;

                const res = await fetch(`https://speakoff.vercel.app/api/podcast`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title,
                        description,
                        tags,
                        host_id: session.user.id, // ✅ get id directly from session
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to create podcast");
                }

                redirect(`/podcast/${data.roomId}/host`);
            }}
            className="space-y-6"
        >
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm"
                    placeholder="Enter podcast title"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm resize-y"
                    placeholder="Describe the podcast"
                    rows={4}
                    required
                />
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-200 mb-2">
                    Tags
                </label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm"
                    placeholder="e.g., tech, education, health"
                />
            </div>
            <div className="flex">
                <Button
                    type="submit"
                    variant="solid"
                    size="3"
                    className="px-6 py-2 mt-5 w-full font-medium text-black bg-theme-lime/80 hover:bg-theme-lime border-2 cursor-pointer rounded-lg transition-all duration-200 hover:shadow-md"
                >
                    Go live
                </Button>
            </div>
        </form>
    );
}
