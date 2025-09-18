import CreateRoomForm from '../components/forms/CreateRoomForm';

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Create a Debate Room
                </h1>
                <p className="text-sm text-gray-400 mb-8">
                    Set up your live debate room with the details below.
                </p>

                <CreateRoomForm />
            </div>
        </main>
    );
}