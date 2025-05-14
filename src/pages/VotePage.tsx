import { useState } from "react";

type Props = {
  user: {
    name: string;
    email: string;
  };
};

type Candidate = {
  fullName: string;
  photoFile: string;
};

const candidates: Candidate[] = [
  { fullName: "Biejat Magdalena", photoFile: "Biejat.jpg" },
  { fullName: "Braun Grzegorz", photoFile: "Braun.jpg" },
  { fullName: "Hołownia Szymon", photoFile: "Holownia.jpg" },
  { fullName: "Mentzen Sławomir", photoFile: "Mentzen.jpg" },
  { fullName: "Nawrocki Karol", photoFile: "Nawrocki.jpg" },
  { fullName: "Trzaskowski Rafał", photoFile: "Trzaskowski.jpg" },
  { fullName: "Zandberg Adrian", photoFile: "Zandberg.jpg" },
  { fullName: "Inni kandydaci", photoFile: "Inni.jpg" },
];

export default function VotePage({ user }: Props) {
  const [votes, setVotes] = useState<number[]>(Array(candidates.length).fill(0));

  const total = votes.reduce((sum, val) => sum + val, 0);
  const isTotalValid = Math.abs(total - 100) < 0.001;

  const handleChange = (index: number, value: string) => {
    const newVotes = [...votes];
    newVotes[index] = parseFloat(value) || 0;
    setVotes(newVotes);
  };

  const handleSubmit = () => {
    const payload = {
      name: user.name,
      email: user.email,
      votes: candidates.map((c, i) => ({
        candidate: c.fullName,
        percentage: votes[i],
      })),
    };

    // Przykładowe wysłanie — zmień na prawdziwy endpoint
    fetch("https://example.com/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Wyniki przesłane!");
        } else {
          alert("Błąd podczas przesyłania wyników.");
        }
      })
      .catch(() => {
        alert("Nie udało się połączyć z serwerem.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Formularz głosowania</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
        {candidates.map((c, i) => (
          <div key={i} className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4">
            <img
              src={`./photo/${c.photoFile}`}
              alt={c.fullName}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="font-semibold">{c.fullName}</div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={votes[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="mt-1 w-full border p-1 rounded-md"
              />
            </div>
            <span className="ml-2">%</span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div
          className={`text-xl font-bold py-2 px-4 rounded-xl inline-block ${
            isTotalValid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          Suma: {total.toFixed(1)}%
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={!isTotalValid}
          className={`mt-4 px-6 py-3 font-semibold rounded-xl transition ${
            isTotalValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Prześlij wyniki
        </button>
      </div>
    </div>
  );
}
