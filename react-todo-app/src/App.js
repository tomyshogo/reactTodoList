import React, { useState } from 'react';
import './App.css';

function App() {

  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      const updatedList = [...list, inputText];
      setList(updatedList);
      setInputText(""); // Clear input after adding to the list
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedList = list.filter((item, i) => i !== index);
      setList(updatedList);
    }
  };

  const handleUpdate = (index, newValue) => {
    if (newValue.trim() !== "") {
      const updatedList = list.map((item, i) => (i === index ? newValue : item));
      setList(updatedList);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation(); // Prevent event bubbling to the <li> element
    // Add logic here to handle cancel button action
  };


  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th className='item'>Item</th>
            <th className='author'>Author</th>
            

          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td onClick={(e) => {
                const newValue = prompt("Enter new value:");
                if (newValue !== null) {
                  handleUpdate(index, newValue);
                } else {
                  handleCancel(e);
                }
              }}>
                {item}
              </td>
              <td>
                author
              </td>
              <td>
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to the <td> element
                  handleDelete(index);
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input type="text" maxLength="20" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleAdd} disabled={inputText.trim() === ""}>Add</button>
    </div>
  );
}

export default App;
