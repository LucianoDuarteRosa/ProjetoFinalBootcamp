import { useState } from 'react'

import { buildChatSystemInstruction } from '@/data/chatPrompt'
import type { ChatMessage, SimulationRecord } from '@/data/simulation'
import { sendChatMessage, type ChatTurn } from '@/services/aiService'

import { useSimulationStorage } from './useSimulationStorage'

export const useChat = (simulation: SimulationRecord) => {
  const { updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(
    simulation.chatHistory ?? [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toISOString(),
    }

    const updatedWithUser = [...messages, userMessage]
    setMessages(updatedWithUser)
    setIsLoading(true)
    setError(null)

    try {
      const systemInstruction = buildChatSystemInstruction(simulation)
      const history: ChatTurn[] = updatedWithUser.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }))

      const responseText = await sendChatMessage(systemInstruction, history)

      const modelMessage: ChatMessage = {
        role: 'model',
        content: responseText,
        timestamp: new Date().toISOString(),
      }

      const finalMessages = [...updatedWithUser, modelMessage]
      setMessages(finalMessages)

      updateSimulation(simulation.id, {
        ...simulation,
        chatHistory: finalMessages,
      } as SimulationRecord)
    } catch {
      setError('Não foi possível obter a resposta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return { messages, isLoading, error, sendMessage, clearError }
}
