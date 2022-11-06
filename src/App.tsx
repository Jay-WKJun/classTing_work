import { Router } from './Router';

function App() {
  return (
    <div className="flex justify-center w-full h-full overflow-y-scroll scrollbar-hide">
      <main className="max-w-[600px] w-full">
        <Router />
      </main>
    </div>
  );
}

export default App;
