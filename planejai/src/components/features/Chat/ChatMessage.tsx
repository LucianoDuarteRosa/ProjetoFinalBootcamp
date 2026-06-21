import type { ChatMessage as ChatMessageType } from '@/data/simulation'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const time = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={
          isUser
            ? 'bg-primary text-primary-foreground max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 text-sm'
            : 'bg-card text-foreground max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm shadow-[2px_2px_10px_0px_rgba(0,0,0,0.15)]'
        }
      >
        {message.content}
      </div>
      <span className="text-muted-foreground px-1 text-xs">{time}</span>
    </div>
  )
}
