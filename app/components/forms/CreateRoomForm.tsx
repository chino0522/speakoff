import { Button } from '@radix-ui/themes';

export default function CreateRoomForm() {
    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm"
                    placeholder="Enter debate title"
                    required
                    aria-required="true"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm resize-y"
                    placeholder="Describe the debate topic"
                    rows={4}
                    required
                    aria-required="true"
                />
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-200 mb-2">
                    Tags
                </label>
                <input
                    type="text"
                    id="tags"
                    className="w-full px-4 py-3 bg-theme-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-lime focus:border-transparent transition-all duration-200 hover:shadow-sm"
                    placeholder="e.g., politics, technology, education"
                    aria-describedby="tags-help"
                />
                <p id="tags-help" className="text-xs text-gray-400 mt-1">
                    Enter tags separated by commas
                </p>
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