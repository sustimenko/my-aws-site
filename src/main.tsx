import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Добавляем импорты для AWS Amplify
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// Конфигурируем проект (связываем фронтенд с облаком)
Amplify.configure(outputs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
