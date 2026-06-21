import { SendHorizonal } from 'lucide-react'
import { type KeyboardEvent, useRef } from 'react'

import { Button } from '@/components/shared/Button'

interface ChatInputProps {
  onSend: (text: string) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    const value = textareaRef.current?.value.trim()
    if (!value || isLoading) return
    onSend(value)
    if (textareaRef.current) {
      textareaRef.current.value = ''
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div className="bg-input flex items-end gap-3 rounded-2xl p-3 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="Faça uma pergunta ao educador financeiro..."
        disabled={isLoading}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className="text-foreground placeholder:text-muted-foreground max-h-32 flex-1 resize-none bg-transparent text-sm outline-none"
      />
      <Button
        variant="primary"
        icon={SendHorizonal}
        onClick={handleSubmit}
        disabled={isLoading}
        aria-label="Enviar mensagem"
        className="shrink-0 rounded-xl px-3 py-2"
      />
    </div>
  )
}
