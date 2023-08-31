// client.tsx

import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://your-deployed-app-url');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDishes(newData);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Implement UI components and CRUD logic for dishes
  // Example: display dishes in a table, allow adding/editing/deleting

  return (
    <div>
      <h1>Backoffice</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>${dish.price.toFixed(2)}</td>
              <td>
                {/* Add buttons for editing and deleting */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add form or buttons for adding/editing dishes */}
    </div>
  );
};

render(<App />, document.getElementById('app'));
