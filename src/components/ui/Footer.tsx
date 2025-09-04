import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-600">
            © 2025 Controle de Procedimentos Médicos. Todos os direitos reservados.
          </div>
          <a
            href="https://www.lunaristech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <span>Development by</span>
            <span className="font-semibold text-blue-600 group-hover:text-blue-700">
              Lunaris Tech
            </span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}
