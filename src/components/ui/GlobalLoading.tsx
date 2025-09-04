"use client";

import { useLoadingStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': any;
    }
  }
}

export default function GlobalLoading() {
  const { isLoading, loadingMessage } = useLoadingStore()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 backdrop-blur-md z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center border border-white/20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6"
            >
              <dotlottie-wc
                src="https://lottie.host/46958730-920a-4cbf-bef9-d4c409ef1a4f/R4sSn2hvWt.lottie"
                style={{ width: '100%', height: '100%' }}
                speed="1"
                autoplay
                loop
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Carregando...
              </h3>
              {loadingMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-gray-600 font-medium"
                >
                  {loadingMessage}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
