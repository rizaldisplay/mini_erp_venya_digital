import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Bell } from "lucide-react";

export function Topbar({ title }: { title?: string }) {
  const today = new Date();
  
  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div>
        {title ? (
          <h1 className="text-2xl font-bold">{title}</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Selamat pagi, Pak Budi <span className="inline-block animate-wave">👋</span></h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {format(today, "EEEE, d MMMM yyyy", { locale: id })}
            </p>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full ring-2 ring-card"></span>
        </button>
      </div>
    </header>
  );
}
