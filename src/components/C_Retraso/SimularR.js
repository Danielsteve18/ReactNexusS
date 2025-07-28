import React from 'react';

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Usando React.lazy con un retraso simulado
const Index = React.lazy(async () => {
  await simulateDelay(2000); // Simula un retraso de 2 segundos
  return import('./Index');
});

const Auth = React.lazy(async () => {
  await simulateDelay(3000); // Simula un retraso de 3 segundos
  return import('./Auth');
});