import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('Raw JSON input:', jsonInput); // Log raw JSON input
  
      const parsedData = JSON.parse(jsonInput);
      console.log('Parsed JSON data:', parsedData); // Log parsed data
  
      if (!parsedData || !Array.isArray(parsedData.data)) {
        console.error('Invalid JSON format:', parsedData);
        setError('Invalid JSON format');
        return;
      }
  
      const res = await axios.post('https://bajaj-backend-seven.vercel.app/bfhl', parsedData);
      console.log('API response:', res.data); // Log API response
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error('Error during submission:', err); // Log detailed error
      setError('Invalid JSON format or API error');
    }
  };
  

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}:</h3>
        <p>{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>{'21BCE2013'}</h1> 
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here'
        rows={10}
        style={{ width: '100%' }}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
