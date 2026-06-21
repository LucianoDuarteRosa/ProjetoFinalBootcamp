import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

const readStorage = (): SimulationRecord[] => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storage ? (JSON.parse(storage) as SimulationRecord[]) : []
}

const writeStorage = (data: SimulationRecord[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    }

    writeStorage([...readStorage(), record])

    return id
  }

  const getFormData = (id: string) => {
    return readStorage().find((record) => record.id === id) || null
  }

  const getAllSimulations = (): SimulationRecord[] => {
    return readStorage().sort((a, b) => {
      if (!a.createdAt && !b.createdAt) return 0
      if (!a.createdAt) return 1
      if (!b.createdAt) return -1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const updated = readStorage().map((record) =>
      record.id === id ? { ...data } : record,
    )
    writeStorage(updated)
  }

  const deleteSimulation = (id: string) => {
    writeStorage(readStorage().filter((record) => record.id !== id))
  }

  return {
    saveFormData,
    getFormData,
    getAllSimulations,
    updateSimulation,
    deleteSimulation,
  }
}
