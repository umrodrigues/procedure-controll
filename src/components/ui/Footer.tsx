import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              © 2025 Controle de Procedimentos Médicos. Todos os direitos reservados.
            </div>
          </div>
          <a
            href="https://www.lunaristech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <span>Development by</span>
            <span className="font-semibold text-blue-600 group-hover:text-blue-700">
              Lunaris Tech
            </span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}
