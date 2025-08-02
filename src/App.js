import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://chatapp-ai-wegj.vercel.app/getResponse', {
      question: question
    }).then(res => {
      setResponse(res.data.response);
    }).catch(err => {
      console.log(err, "error hai frontend");
    });
  };

  const speakHandler = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  };

  const stopHandler = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="App">
      <div className="box">
        <div className='profile-pic'>
          <img src={require('../src/assets/boy.webp')} alt="profile-pic" className='pic' />
        </div>
        <p className='lebel'>Question</p>
        <textarea onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={submitHandler}>Send</button>
      </div>

      <div className="box">
        <div className='profile-pic'>
          <img src={require('../src/assets/gemini.webp')} alt="profile-pic" className='pic' />
        </div>
        <p className='lebel'>Answer</p>
        <textarea value={response} readOnly />
        <div style={{ display: 'flex', gap: '10px', width: '80%', justifyContent: 'center' }}>
          <button onClick={speakHandler}>Speak</button>
          <button onClick={stopHandler}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default App;
