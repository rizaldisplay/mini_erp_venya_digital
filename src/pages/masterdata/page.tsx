import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Topbar } from "../../components/layout/topbar";
import ListMaster from "../../dummy/master";

export default function MasterDataPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = useMemo(() => {
    return ListMaster.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-muted/20">
      <Topbar title="Master Data" />

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Search */}
        <div className="p-4 bg-card border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Cari menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredMenus.map((menu) => (
              <motion.div
                key={menu.id}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(menu.path)}
                className="bg-card rounded-xl border border-border shadow-sm hover:border-primary cursor-pointer transition-all"
              >
                <div className="h-36 flex items-center justify-center bg-muted rounded-t-xl">
                  {menu.icon && (
                    <menu.icon className="w-14 h-14 text-primary" />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-base">
                    {menu.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {menu.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {filteredMenus.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Tidak ada menu yang ditemukan.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}