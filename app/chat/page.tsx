'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquare, Loader2, Send } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import type { Message, User } from '@/src/db/schemas'
import { ChatBubble } from '@/components/chat-bubble'
import { ChatInput } from '@/components/chat-input'
import { Navigation } from '@/components/navigation'

interface MessageWithSender {
  message: Message
  sender: User
}

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const farmerId = searchParams.get('farmerId')

  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<User | null>(null)
  const [messages, setMessages] = useState<MessageWithSender[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true)
        // Get current user profile
        const profile = await trpc.user.getProfile.query()
        setCurrentUser(profile)

        // Get all conversations
        const convs = await trpc.message.getConversations.query()
        setConversations(convs)

        // If farmerId is in URL, start chat with that farmer
        if (farmerId) {
          const farmerInfo = await trpc.message.getOrCreateConversation.query({
            otherUserId: farmerId,
          })
          if (farmerInfo?.otherUser) {
            setSelectedConversation(farmerInfo.otherUser)
          }
        }
      } catch (error) {
        console.error('[v0] Error loading chat:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [farmerId])

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return

      try {
        const msgs = await trpc.message.getConversation.query({
          otherUserId: selectedConversation.id,
        })
        setMessages(msgs)

        // Mark messages as read
        await trpc.message.markAsRead.mutate({
          senderId: selectedConversation.id,
        })
      } catch (error) {
        console.error('[v0] Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [selectedConversation])

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !currentUser) return

    try {
      setSendingMessage(true)
      const newMessage = await trpc.message.sendMessage.mutate({
        receiverId: selectedConversation.id,
        content,
      })

      setMessages([
        ...messages,
        {
          message: newMessage,
          sender: currentUser,
        },
      ])
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setSendingMessage(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-card border-b border-border sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversations
              </h2>
            </div>
            <div className="overflow-y-auto flex-1">
              {conversations.length > 0 ? (
                conversations.map((conv) => (
                  <button
                    key={conv.otherUser.id}
                    onClick={() => setSelectedConversation(conv.otherUser)}
                    className={`w-full p-4 border-b border-border text-left hover:bg-secondary transition ${
                      selectedConversation?.id === conv.otherUser.id
                        ? 'bg-primary/10 border-l-4 border-l-primary'
                        : ''
                    }`}
                  >
                    <p className="font-medium text-foreground truncate">
                      {conv.otherUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(conv.lastMessageTime).toLocaleDateString()}
                    </p>
                  </button>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No conversations yet</p>
                </div>
              )}
            </div>
          </Card>

          {/* Chat Area */}
          {selectedConversation ? (
            <Card className="lg:col-span-2 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border bg-card">
                <h3 className="font-semibold text-foreground">
                  {selectedConversation.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedConversation.role === 'farmer' ? '🌾 Farmer' : '💵 Buyer'} • {selectedConversation.location || 'Uganda'}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <ChatBubble
                      key={idx}
                      message={msg.message}
                      sender={msg.sender}
                      isCurrentUser={msg.sender.id === currentUser?.id}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Start a conversation</p>
                  </div>
                )}
              </div>

              <ChatInput
                onSend={handleSendMessage}
                disabled={sendingMessage}
              />
            </Card>
          ) : (
            <Card className="lg:col-span-2 flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
