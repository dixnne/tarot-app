// Using a single audio element to prevent creating new ones on each play.
const audio = new Audio();

// Add a persistent error handler to the audio element.
// This will catch network errors (like 404s) if an audio file URL is invalid.
audio.addEventListener('error', () => {
  console.error(`Error: No se pudo cargar el archivo de audio desde la URL: ${audio.currentSrc}`);
  // For a user-facing app, you might want to disable sound or show a notification.
});

export const playSound = (soundUrl: string) => {
  // Set the source for the audio element.
  audio.src = soundUrl;
  
  // play() returns a promise which can be used to catch playback errors.
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // This typically catches errors related to autoplay policies, not loading errors.
      // Since sounds are triggered by user interaction, this is less likely to fail.
      console.error(`Error al reproducir el sonido: ${error.name} - ${error.message}`);
    });
  }
};

export const SOUNDS = {
  CARD_FLIP: 'https://cdn.pixabay.com/audio/2022/03/15/audio_51c62f2324.mp3', // Magical shimmer
  TRANSITION: 'https://cdn.pixabay.com/audio/2022/02/08/audio_3c3b52994f.mp3', // Soft whoosh
  TEXT_APPEAR: 'https://cdn.pixabay.com/audio/2022/11/17/audio_821727c2f6.mp3', // Sparkle
  NEXT_CLICK: 'https://cdn.pixabay.com/audio/2021/08/04/audio_573219f863.mp3', // Soft UI click
};