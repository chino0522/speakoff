import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type ProfileProps = {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
}

export default function Profile({ name, email, image }: ProfileProps) {
    const initials = name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff] hover:bg-[#e6e6e6] transition-colors cursor-pointer">
                    <Avatar.Fallback className="text-[#7C3BED] font-semibold text-lg">
                        {initials}
                    </Avatar.Fallback>
                    {image && (
                        <Avatar.Image
                            src={image}
                            alt="User avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    )}
                </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[200px] bg-[#1D2530] rounded-lg shadow-lg p-4 border "
                    sideOffset={8}
                >
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-white">
                            {name || 'Unknown User'}
                        </div>
                        <div className="text-xs text-gray-300 truncate">
                            {email || 'No email provided'}
                        </div>
                        <DropdownMenu.Separator className="h-px bg-gray-600 my-2" />
                        <DropdownMenu.Item className='outline-none'>
                            <button
                                className="w-full text-left p-1 text-sm text-white hover:bg-theme-purple/30 rounded cursor-pointer transition-colors"
                            >
                                Settings
                            </button>
                        </DropdownMenu.Item>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}