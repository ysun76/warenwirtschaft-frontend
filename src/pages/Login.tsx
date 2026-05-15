// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface LoginForm {
  username: string;
  password: string;
}
interface TokenResponse {
  access_token: string;
  token_type: string;
}
function Login() {
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [fehler, setFehler] = useState<string | null>(null);
  const navigate = useNavigate();
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFehler(null);
// FastAPI OAuth2 erwartet form-encoded Daten, nicht JSON:
    const formData = new URLSearchParams();
    formData.append('username', form.username);
    formData.append('password', form.password);
try {
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
if (!response.ok) throw new Error('Login fehlgeschlagen');
const daten: TokenResponse = await response.json();
      localStorage.setItem('access_token', daten.access_token);
      navigate('/products');
    } catch {
      setFehler('Benutzername oder Passwort falsch');
    }
  };
return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {fehler && <p style={{ color: 'red' }}>{fehler}</p>}
      <input
        type="text"
        placeholder="Benutzername"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Anmelden</button>
    </form>
  );
}
export default Login;
