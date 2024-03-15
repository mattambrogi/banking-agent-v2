"use client"
import './global.css'
import { ChatProvider } from '@/components/chat-context'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ChatProvider>
        <body>{children}</body>
      </ChatProvider>
    </html>
  )
}
