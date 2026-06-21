import { PiggyBank } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SimulationHistoryCard } from '@/components/features/History/SimulationHistoryCard'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function HistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(() => getAllSimulations())

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations(getAllSimulations())
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Veja todas as suas simulações anteriores e acompanhe seu progresso."
      />

      {simulations.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="bg-muted-primary flex h-16 w-16 items-center justify-center rounded-full">
            <PiggyBank size={32} className="text-primary" />
          </div>
          <p className="text-foreground font-semibold">
            Nenhuma simulação encontrada
          </p>
          <p className="text-muted-foreground max-w-xs text-sm">
            Você ainda não criou nenhuma simulação. Comece agora mesmo!
          </p>
          <Button
            variant="primary"
            onClick={() => void navigate('/')}
            className="mt-2"
          >
            Criar nova simulação
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <SimulationHistoryCard
              key={simulation.id}
              record={simulation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  )
}
