'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AgePicker } from '@/components/ui/age-picker'
import { usePacifyStore } from '@/lib/store'
import { PERSONALITY_TRAITS, type PersonalityTrait, type ChildProfile } from '@/lib/types'
import { Heart, ArrowRight } from 'lucide-react'

interface ProfileSetupProps {
  onComplete: () => void
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [ageYears, setAgeYears] = useState(4)
  const [ageMonths, setAgeMonths] = useState(0)
  const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([])
  
  const { setChildProfile, completeOnboarding } = usePacifyStore()
  
  const handleTraitToggle = (trait: PersonalityTrait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait))
    } else if (selectedTraits.length < 3) {
      setSelectedTraits([...selectedTraits, trait])
    }
  }
  
  const handleComplete = () => {
    const profile: ChildProfile = {
      name,
      ageYears,
      ageMonths,
      traits: selectedTraits,
      createdAt: new Date().toISOString()
    }
    
    setChildProfile(profile)
    completeOnboarding()
    onComplete()
  }
  
  const canProceedStep1 = name.trim().length > 0
  const canComplete = selectedTraits.length >= 1
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 1 && "Hallo! 👋"}
              {step === 2 && "Wie alt ist dein Kind?"}
              {step === 3 && "Was macht dein Kind besonders?"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {step === 1 && "Lass uns dein Kind kennenlernen, damit ich dir besser helfen kann."}
              {step === 2 && "Das hilft mir, altersgerechte Tipps zu geben."}
              {step === 3 && "Wähle 1-3 Eigenschaften aus, die am besten passen."}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wie heißt dein Kind?
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z.B. Lisa"
                    className="text-lg"
                    data-testid="child-name-input"
                  />
                </div>
                
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full h-12 text-lg"
                  data-testid="step1-continue"
                >
                  Weiter <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <AgePicker
                  years={ageYears}
                  months={ageMonths}
                  onAgeChange={(years, months) => {
                    setAgeYears(years)
                    setAgeMonths(months)
                  }}
                  data-testid="age-picker"
                />
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Zurück
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1"
                    data-testid="step2-continue"
                  >
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(PERSONALITY_TRAITS).map(([trait, label]) => {
                    const isSelected = selectedTraits.includes(trait as PersonalityTrait)
                    const isDisabled = !isSelected && selectedTraits.length >= 3
                    
                    return (
                      <button
                        key={trait}
                        onClick={() => handleTraitToggle(trait as PersonalityTrait)}
                        disabled={isDisabled}
                        className={`
                          p-4 rounded-lg border-2 text-left transition-all
                          ${isSelected 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        data-testid={`trait-${trait}`}
                      >
                        <div className="font-medium">{label}</div>
                      </button>
                    )
                  })}
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  {selectedTraits.length}/3 ausgewählt
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Zurück
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!canComplete}
                    className="flex-1"
                    data-testid="complete-setup"
                  >
                    Fertig! 🎉
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-2 h-2 rounded-full transition-colors ${
                stepNumber <= step ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
} 