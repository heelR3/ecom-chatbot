import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatProvider } from './context/ChatContext'
import ChatWindow from './components/ChatWindow'

function App() {


  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  )
}

export default App
