import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, ExternalLink } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050810]/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#0A0E1A] border border-[rgba(232,237,245,0.1)] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(232,237,245,0.08)] bg-[rgba(5,8,16,0.6)]">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-cyan-400" />
                <span className="font-['Playfair_Display'] font-bold text-white text-base">
                  Abdullah Aljarallah — Executive CV
                </span>
                <span className="text-xs font-['JetBrains_Mono'] text-cyan-400/80 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded">
                  PDF Preview
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/AJ_AlJarallah_CV.pdf"
                  download="AJ_AlJarallah_CV.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-[#050810] font-bold text-xs hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                >
                  <Download size={13} />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-[#7A8FA8] hover:text-white hover:bg-[rgba(232,237,245,0.1)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded PDF Iframe */}
            <div className="flex-1 w-full bg-[#050810]">
              <iframe
                src="/AJ_AlJarallah_CV.pdf#toolbar=0"
                title="Abdullah Aljarallah CV"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
