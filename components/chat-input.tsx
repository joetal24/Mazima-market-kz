'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => Promise<void>
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || loading) return

    setLoading(true)
    try {
      await onSend(message)
      setMessage('')
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2 p-4 border-t border-input bg-white rounded-b-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        disabled={loading || disabled}
        className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground disabled:opacity-50"
      />
      <Button
        onClick={handleSend}
        disabled={loading || !message.trim() || disabled}
        className="bg-orange-600 hover:bg-orange-700 text-white"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
