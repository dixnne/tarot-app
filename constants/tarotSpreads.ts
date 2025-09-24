import { TarotSpread } from '../types';

export const SPREADS: TarotSpread[] = [
  {
    key: 'one-card',
    name: 'Una Carta',
    description: 'Para una respuesta rápida y un consejo claro sobre una situación específica. Ideal para una guía diaria.',
    cards: [
      { position: 'El Mensaje', description: 'El corazón del asunto.' }
    ]
  },
  {
    key: 'three-cards',
    name: 'Pasado, Presente, Futuro',
    description: 'Explora la evolución de una situación, mostrando de dónde vienes, dónde estás y hacia dónde te diriges.',
    cards: [
      { position: 'El Pasado', description: 'Las raíces de la situación.' },
      { position: 'El Presente', description: 'Tu estado actual y tus desafíos.' },
      { position: 'El Futuro', description: 'El resultado probable si todo sigue igual.' }
    ]
  },
  {
      key: 'celtic-cross',
      name: 'Cruz Celta',
      description: 'Una lectura profunda de 10 cartas que ofrece un análisis detallado de una situación compleja y sus influencias.',
      cards: [
          { position: '1. El Presente', description: 'Tu situación actual.' },
          { position: '2. El Desafío', description: 'El obstáculo inmediato que te cruza.' },
          { position: '3. La Base', description: 'El pasado lejano, la raíz del asunto.' },
          { position: '4. El Pasado Reciente', description: 'Eventos que acaban de ocurrir.' },
          { position: '5. La Corona', description: 'El mejor resultado posible o tus metas conscientes.' },
          { position: '6. El Futuro Inmediato', description: 'Lo que está por venir.' },
          { position: '7. Tú', description: 'Tu actitud y tus recursos actuales.' },
          { position: '8. El Entorno', description: 'Influencias externas, como personas o el ambiente.' },
          { position: '9. Esperanzas y Miedos', description: 'Tus anhelos y temores sobre el tema.' },
          { position: '10. El Resultado Final', description: 'El desenlace probable de la situación.' }
      ]
  }
];