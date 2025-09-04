"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Eye, EyeOff, User, Lock, CheckCircle, Sparkles } from "lucide-react";
import { usuarioService } from "@/lib/services";
import { useAlert } from "@/components/ui/Alert";
import { useLoadingStore } from "@/lib/store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { showAlert, AlertContainer } = useAlert();
  const { setLoading } = useLoadingStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true, 'Fazendo login...');

    try {
      const usuario = await usuarioService.autenticar(username, password);
      
      if (usuario) {
        setLoading(false);
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        }, 1000);
      } else {
        showAlert({
          type: 'error',
          title: 'Login Inválido',
          message: 'Usuário ou senha incorretos!'
        });
        setIsLoading(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('💥 Erro na autenticação:', error);
      showAlert({
        type: 'error',
        title: 'Erro de Conexão',
        message: 'Erro ao fazer login. Tente novamente.'
      });
      setIsLoading(false);
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
            "linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10 px-2 sm:px-4"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 sm:mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Procedimentos Médicos
          </motion.h1>
          <p className="text-slate-300 text-base sm:text-lg px-2">Faça login para acessar o sistema</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20"
        >
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40">
              <iframe
                src="https://lottie.host/embed/91fff782-8075-4324-930c-899db11d2c75/mL8EY31VUt.lottie"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Login Animation"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleLogin}
                className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-white mb-2">
                    Email ou Usuário
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-4 border border-white/20 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="admin@sistema.com ou admin"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-white mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-3 sm:py-4 border border-white/20 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Digite sua senha"
                      required
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                    />
                  ) : (
                    "Entrar"
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3">Login realizado com sucesso!</h3>
                <p className="text-slate-300 text-sm sm:text-base">Redirecionando para o dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>


        </motion.div>
      </motion.div>
      <AlertContainer />
    </div>
  );
}
