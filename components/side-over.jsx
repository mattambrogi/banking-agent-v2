'use client'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ChatComponent from './chat'

const SideOver = ({ showSide, setShowSide }) => {

    useEffect(() => {
        if (showSide) {
            // Disable any inline styles setting overflow to hidden
            document.body.style.overflow = 'visible';
            document.documentElement.style.overflow = 'visible';
        } else {
            // Reset inline styles
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }, [showSide]);

    return (
        <Transition.Root show={showSide} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowSide}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                    AI Banking Assistant
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setShowSide(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <p className="text-sm text-indigo-300">
                                                    Use this chat to get more info about your spending
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative flex-1 px-4 py-6 sm:px-6">
                                            {/* Your content */}
                                            <ChatComponent />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}


export default SideOver;
