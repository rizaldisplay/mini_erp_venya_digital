import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";
// import { useSendAiMessage } from "@workspace/api-client-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function useSendAiMessage() {
  const [isPending, setIsPending] = useState(false);

  const mutate = (
    { data }: { data: { message: string } },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: (response: { reply: string }) => void;
      onError?: () => void;
    }
  ) => {
    setIsPending(true);

    setTimeout(() => {
      try {
        const text = data.message.toLowerCase();

        let reply =
          "Saya siap membantu Anda mengenai penjualan, stok, produk, dan laporan.";

        if (text.includes("halo")) {
          reply = "Halo 👋 Ada yang bisa saya bantu hari ini?";
        } else if (text.includes("penjualan")) {
          reply =
            "Penjualan hari ini mencapai Rp2.350.000 dengan 37 transaksi.";
        } else if (text.includes("stok")) {
          reply =
            "Saat ini terdapat 5 produk yang stoknya di bawah batas minimum.";
        } else if (text.includes("produk")) {
          reply =
            "Produk terlaris minggu ini adalah Indomie Goreng dan Aqua 600ml.";
        } else if (text.includes("laporan")) {
          reply =
            "Laporan penjualan dapat dilihat pada menu Laporan. Omzet bulan ini naik sekitar 12%.";
        } else if (text.includes("promo")) {
          reply =
            "Saya menyarankan promo diskon 10% untuk produk dengan perputaran lambat.";
        } else if (text.includes("terima kasih")) {
          reply = "Sama-sama 😊 Semoga usaha Anda semakin sukses.";
        }

        setIsPending(false);
        onSuccess?.({ reply });
      } catch {
        setIsPending(false);
        onError?.();
      }
    }, 1200);
  };

  return {
    mutate,
    isPending,
  };
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: 'Halo Pak Budi! Saya asisten AI Lemix POS Anda. Ada yang bisa saya bantu terkait data penjualan atau rekomendasi bisnis hari ini?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const sendMessageMutation = useSendAiMessage();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const userMessage = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    sendMessageMutation.mutate({ data: { message: userMessage } }, {
      onSuccess: (response) => {
        setChatHistory(prev => [...prev, { role: 'ai', content: response.reply }]);
      },
      onError: () => {
        setChatHistory(prev => [...prev, { role: 'ai', content: 'Maaf, saya sedang mengalami kendala jaringan. Mohon coba lagi nanti.' }]);
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform z-50"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50 overflow-hidden"
            style={{ height: "500px", maxHeight: "calc(100vh - 48px)" }}
          >
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Bot className="w-5 h-5" />
                <span className="font-medium">Lemix AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {chatHistory.map((chat, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    chat.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm",
                      chat.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-br-sm" 
                        : "bg-card border border-border text-card-foreground rounded-bl-sm"
                    )}
                  >
                    {chat.role === 'ai' && i > 0 && <Sparkles className="w-3 h-3 text-primary mb-1 inline-block mr-1" />}
                    {chat.content}
                  </div>
                </div>
              ))}
              {sendMessageMutation.isPending && (
                <div className="mr-auto max-w-[85%]">
                  <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-bl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-border bg-card">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tanya tentang penjualan..."
                  className="w-full bg-muted border border-border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={sendMessageMutation.isPending}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
