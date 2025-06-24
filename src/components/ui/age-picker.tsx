'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface AgePickerProps {
  years: number
  months: number
  onAgeChange: (years: number, months: number) => void
  className?: string
}

export function AgePicker({ years, months, onAgeChange, className }: AgePickerProps) {
  const [isDialMode, setIsDialMode] = useState(true)

  const adjustYears = (direction: 'up' | 'down') => {
    const newYears = direction === 'up' 
      ? Math.min(years + 1, 18) 
      : Math.max(years - 1, 1)
    onAgeChange(newYears, months)
  }

  const adjustMonths = (direction: 'up' | 'down') => {
    let newMonths = direction === 'up' ? months + 1 : months - 1
    let newYears = years

    if (newMonths > 11) {
      newMonths = 0
      newYears = Math.min(newYears + 1, 18)
    } else if (newMonths < 0) {
      newMonths = 11
      newYears = Math.max(newYears - 1, 1)
    }

    onAgeChange(newYears, newMonths)
  }

  const handleYearsInput = (value: string) => {
    const parsed = parseInt(value)
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 18) {
      onAgeChange(parsed, months)
    }
  }

  const handleMonthsInput = (value: string) => {
    const parsed = parseInt(value)
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 11) {
      onAgeChange(years, parsed)
    }
  }

  const formatAge = () => {
    if (years < 2) {
      return `${years * 12 + months} Monate`
    }
    return months === 0 
      ? `${years} Jahre` 
      : `${years} Jahre, ${months} Monate`
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600 mb-1">
          {formatAge()}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialMode(!isDialMode)}
          className="text-sm text-gray-500"
        >
          {isDialMode ? 'Tastatur verwenden' : 'Auswahl verwenden'}
        </Button>
      </div>

      {isDialMode ? (
        <div className="flex items-center justify-center space-x-8">
          {/* Years Dial */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustYears('up')}
              className="h-8 w-8 p-0"
              disabled={years >= 18}
              data-testid="years-up"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 w-16">
                {years}
              </div>
              <div className="text-sm text-gray-500">
                {years === 1 ? 'Jahr' : 'Jahre'}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustYears('down')}
              className="h-8 w-8 p-0"
              disabled={years <= 1}
              data-testid="years-down"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Months Dial */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustMonths('up')}
              className="h-8 w-8 p-0"
              data-testid="months-up"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 w-16">
                {months}
              </div>
              <div className="text-sm text-gray-500">
                {months === 1 ? 'Monat' : 'Monate'}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustMonths('down')}
              className="h-8 w-8 p-0"
              data-testid="months-down"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-gray-700">Jahre</label>
            <Input
              type="number"
              value={years}
              onChange={(e) => handleYearsInput(e.target.value)}
              min={1}
              max={18}
              className="w-20 text-center"
              data-testid="years-input"
            />
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-gray-700">Monate</label>
            <Input
              type="number"
              value={months}
              onChange={(e) => handleMonthsInput(e.target.value)}
              min={0}
              max={11}
              className="w-20 text-center"
              data-testid="months-input"
            />
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-500">
        {years < 2 
          ? 'Für Babys und Kleinkinder unter 2 Jahren'
          : 'Genaue Altersangabe hilft bei passenderen Tipps'
        }
      </div>
    </div>
  )
} 