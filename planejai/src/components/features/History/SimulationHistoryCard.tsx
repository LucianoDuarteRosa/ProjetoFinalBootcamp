import { CalendarDays, PiggyBank, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { statusStyles } from '@/components/features/Insights/Content'
import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'

interface SimulationHistoryCardProps {
  record: SimulationRecord
  onDelete: (id: string) => void
}

export function SimulationHistoryCard({
  record,
  onDelete,
}: SimulationHistoryCardProps) {
  const navigate = useNavigate()

  const monthlySavings =
    parseCurrency(record.income) -
    parseCurrency(record.expenses) -
    parseCurrency(record.debts)

  const formattedDate = record.createdAt
    ? new Date(record.createdAt).toLocaleDateString('pt-BR')
    : 'Data não disponível'

  const feasibilityStatus = record.insight?.feasibility.status
  const badge = feasibilityStatus ? statusStyles[feasibilityStatus] : null

  const handleCardClick = () => {
    void navigate(`/resultado/${record.id}`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(record.id)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      className="bg-card group relative cursor-pointer rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] transition-opacity hover:opacity-90"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <PiggyBank size={16} className="text-primary shrink-0" />
            <span className="text-foreground font-semibold leading-tight">
              {record.goalName}
            </span>
          </div>
          {badge && (
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
            >
              {badge.label}
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          icon={Trash2}
          onClick={handleDelete}
          aria-label="Excluir simulação"
          className="text-muted-foreground hover:text-red-500 shrink-0 rounded-lg px-2 py-2 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Renda mensal</span>
          <span className="text-foreground text-xs font-medium">
            R$ {record.income}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Economia disponível
          </span>
          <span
            className={`text-xs font-medium ${monthlySavings >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}
          >
            R${' '}
            {monthlySavings.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Custo da meta</span>
          <span className="text-foreground text-xs font-medium">
            R$ {record.goalAmount}
          </span>
        </div>
      </div>

      <div className="border-border mt-4 flex items-center gap-1.5 border-t pt-3">
        <CalendarDays size={12} className="text-muted-foreground" />
        <span className="text-muted-foreground text-xs">{formattedDate}</span>
      </div>
    </div>
  )
}
