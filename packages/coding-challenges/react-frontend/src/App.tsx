import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import ChallengePage from './pages/challenge-view/ChallengePage';
import DashboardPage from './pages/dashboard/DashboardPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/challenge/:id" element={<ChallengePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
