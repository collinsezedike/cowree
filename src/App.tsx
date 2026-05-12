import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "@/lib/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Send } from "@/pages/Send";
import { Receive } from "@/pages/Receive";
import { History } from "@/pages/History";
import { Status } from "@/pages/Status";
import { Demo } from "@/pages/Demo";

export function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <div className="min-h-screen bg-cream flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
              <Route path="/history" element={<History />} />
              <Route path="/status" element={<Status />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProviders>
    </BrowserRouter>
  );
}
