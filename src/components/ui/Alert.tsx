import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-400'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-400'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-400'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-400'
  }
}

export default function Alert({ 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = icons[type]
  const colorScheme = colors[type]

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full mx-4 ${colorScheme.bg} ${colorScheme.border} border rounded-xl shadow-lg backdrop-blur-sm`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon className={`w-5 h-5 ${colorScheme.icon}`} />
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium ${colorScheme.text}`}>
                  {title}
                </h3>
                {message && (
                  <p className={`mt-1 text-sm ${colorScheme.text} opacity-90`}>
                    {message}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className={`inline-flex ${colorScheme.text} hover:opacity-70 transition-opacity`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useAlert() {
  const [alerts, setAlerts] = useState<Array<AlertProps & { id: string }>>([])

  const showAlert = (alert: Omit<AlertProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newAlert = {
      ...alert,
      id,
      onClose: () => {
        setAlerts(prev => prev.filter(a => a.id !== id))
      }
    }
    setAlerts(prev => [...prev, newAlert])
  }

  const AlertContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map(alert => (
        <Alert key={alert.id} {...alert} />
      ))}
    </div>
  )

  return { showAlert, AlertContainer }
}
