import { MessageCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { useChat } from '@/hooks/useChat'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'

interface ChatSectionProps {
  simulationId: string
}

export function ChatSection({ simulationId }: ChatSectionProps) {
  const { getFormData } = useSimulationStorage()
  const simulation = getFormData(simulationId)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, isLoading, error, sendMessage, clearError } = useChat(
    simulation!,
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!simulation) return null

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-4 flex items-center gap-1.5">
        <MessageCircle size={14} className="text-primary" />
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Converse com seu Educador Financeiro
        </span>
      </div>

      <div className="mb-4 flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
        {messages.length === 0 && !isLoading && (
          <p className="text-muted-foreground py-8 text-center text-sm">
            Faça uma pergunta sobre sua situação financeira 💬
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-900/20">
            <p className="text-sm text-red-500">⚠️ {error}</p>
            <button
              onClick={clearError}
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Fechar
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}
