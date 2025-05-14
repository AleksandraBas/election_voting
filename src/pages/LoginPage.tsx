import { useState } from "react";

type Props = {
  onLoginSuccess: (userData: { name: string; email: string }) => void;
};

export default function LoginPage({ onLoginSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Prosty regex do walidacji e-maila
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.trim() !== "" && isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onLoginSuccess({ name, email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Wejdź do głosowania!</h1>

        <label className="block mb-2">
          Imię/Nick
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </label>

        <label className="block mb-4">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-bold py-2 px-4 rounded-xl transition-all ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Wejdź do gry
        </button>
      </form>
    </div>
  );
}
