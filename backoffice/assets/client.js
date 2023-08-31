"use strict";
// client.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var App = function () {
    var _a = (0, hooks_1.useState)([]), dishes = _a[0], setDishes = _a[1];
    (0, hooks_1.useEffect)(function () {
        var socket = new WebSocket('wss://your-deployed-app-url');
        socket.onmessage = function (event) {
            var newData = JSON.parse(event.data);
            setDishes(newData);
        };
        return function () {
            socket.close();
        };
    }, []);
    // Implement UI components and CRUD logic for dishes
    // Example: display dishes in a table, allow adding/editing/deleting
    return (<div>
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
          {dishes.map(function (dish) { return (<tr key={dish.id}>
              <td>{dish.name}</td>
              <td>${dish.price.toFixed(2)}</td>
              <td>
                {/* Add buttons for editing and deleting */}
              </td>
            </tr>); })}
        </tbody>
      </table>
      {/* Add form or buttons for adding/editing dishes */}
    </div>);
};
(0, preact_1.render)(<App />, document.getElementById('app'));
