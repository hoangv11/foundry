import { cn } from '@/lib/utils'
import { TOOL_PROGRESS_STEPS } from '@/config/tools'

interface ToolProgressBarProps {
  toolName: string
  duration: number
}

export function ToolProgressBar({ toolName, duration }: ToolProgressBarProps) {
  const steps = TOOL_PROGRESS_STEPS[toolName]

  if (!steps) return null

  const currentStep = steps.find(step => duration < step.threshold) || steps[steps.length - 1]
  const stepIndex = steps.findIndex(step => step === currentStep)
  const progress = Math.min((stepIndex + 1) / steps.length * 100, 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-blue-600 font-medium">
          {currentStep.name}
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="flex gap-1">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              duration >= step.threshold
                ? 'bg-blue-600'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
    </div>
  )
}
