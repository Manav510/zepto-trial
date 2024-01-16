
import  { useState, useEffect } from 'react';
import { getNames } from '../Utilities/getNames';

const Input = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [highlightedChip, setHighlightedChip] = useState(null);

  useEffect(() => {
    getNames().then(res => {
      setAvailableItems(res);
    });
  }, []);

  const handleSelectItem = item => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter(i => i.id !== item.id));
    setInputValue('');
    setHighlightedChip(null);
  };

  const handleRemoveItem = item => {
    setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    setAvailableItems([...availableItems, item]);
    setHighlightedChip(null);
  };

  const handleKeyDown = e => {
    if (e.key === 'Backspace' && inputValue === '') {
      if (highlightedChip !== null) {
        const itemToBeRemoved = selectedItems.find(item => item.id === highlightedChip);
        if (itemToBeRemoved) {
          handleRemoveItem(itemToBeRemoved);
        }
      } else if (selectedItems.length > 0) {
        setHighlightedChip(selectedItems[selectedItems.length - 1].id);
      }
    }
  };

  const filteredItems = inputValue ? availableItems.filter(item =>
    item.names.toLowerCase().includes(inputValue.toLowerCase())
  ) : availableItems;

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedItems.map(item => (
          <div 
            key={item.id} 
            className={`flex items-center px-3 py-1 rounded-full text-white ${highlightedChip === item.id ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {item.names}
            <span className="ml-2 cursor-pointer" onClick={() => handleRemoveItem(item)}>&times;</span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={e => {setInputValue(e.target.value); setHighlightedChip(null);}}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="border border-gray-300 rounded-md p-2">
        {filteredItems.map(item => (
          <div key={item.id} onClick={() => handleSelectItem(item)} className="cursor-pointer p-2 hover:bg-gray-200">
            {item.names}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;