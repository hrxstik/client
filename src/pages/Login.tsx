import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<{ token: string }>('http://localhost:5000/api/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/admin');
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="admin page flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Вход для администратора</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-yaring-blue text-white rounded py-2 px-4 w-full">
          Войти
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
};

export default Login;
