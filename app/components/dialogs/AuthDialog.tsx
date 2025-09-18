// 'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// import { useState } from 'react';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import OAuthButton from '../OAuthButton';

export default function AuthDialog() {
    // const [isSignIn, setIsSignIn] = useState(true);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    variant="solid"
                    size="3"
                    className="px-6 py-3 font-medium text-theme-black bg-theme-lime hover:bg-[#d4e89b] hover:cursor-pointer rounded-lg transition-all duration-200 min-w-[100px] shadow-lg"
                >
                    Sign In
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-xl p-8 shadow-2xl max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]">
                    <Dialog.Title className="text-2xl font-bold text-white mb-2">
                        {/* {isSignIn ? 'Sign In' : 'Create an Account'} */}
                        Continue with OAuth
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-400 mb-6">
                        {/* {isSignIn
                            ? 'Enter your credentials or use OAuth to access your account.'
                            : 'Create a new account to get started.'} */}
                        Please choose from the following options to continue.
                    </Dialog.Description>

                    {/* {isSignIn ? <SignInForm /> : <SignUpForm />} */}

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-900 px-2 text-gray-400">
                                {/* {isSignIn ? 'Or continue with' : 'Or sign up with'} */}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                        <OAuthButton provider='google' />
                        <OAuthButton provider='github' />
                    </div>

                    {/* <div className="mt-6 text-center">
                        <button
                            type="button"
                            className="text-sm text-theme-lime hover:underline hover:cursor-pointer"
                            onClick={() => setIsSignIn(!isSignIn)}
                        >
                            {isSignIn
                                ? 'Need an account? Create one'
                                : 'Already have an account? Sign in'}
                        </button>
                    </div> */}

                    <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <Cross2Icon className="h-5 w-5" />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}