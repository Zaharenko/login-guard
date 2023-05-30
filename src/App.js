import React, { useState } from 'react';

// Компонент для страницы входа
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Проверка логина и пароля
    // Если авторизация успешна, вызываем функцию onLogin
    // и передаем в нее информацию об авторизованном пользователе
    const user = {
      username,
      role: 'admin' // Здесь можно указать роль пользователя (admin/user)
    };
    onLogin(user);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// Компонент для таблицы клиентов
const ClientTable = ({ clients, onDelete, onOpen }) => (
  <div>
    <h2>Client Table</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>
              <button onClick={() => onDelete(client.id)}>Delete</button>
              <button onClick={() => onOpen(client.id)}>Open</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Компонент для страницы клиента
const ClientPage = ({ client }) => (
  <div>
    <h2>Client Page</h2>
    <p>ID: {client.id}</p>
    <p>Name: {client.name}</p>
    <p>Email: {client.email}</p>
    {/* Дополнительная информация о клиенте */}
  </div>
);

// Компонент приложения
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([
    { id: 1, name: 'Client 1', email: 'client1@example.com' },
    { id: 2, name: 'Client 2', email: 'client2@example.com' },
    { id: 3, name: 'Client 3', email: 'client3@example.com' }
  ]);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const handleDeleteClient = (clientId) => {
    // Удаление клиента из списка
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
  };

  const handleOpenClient = (clientId) => {
    // Открытие страницы клиента
    const client = clients.find((client) => client.id === clientId);
    // Редирект или открытие клиента на другой странице
    console.log('Open client:', client);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <ClientTable
        clients={clients}
        onDelete={handleDeleteClient}
        onOpen={handleOpenClient}
      />
    </div>
  );
};

export default App;
