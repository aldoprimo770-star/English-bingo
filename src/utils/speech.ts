let cachedVoice: SpeechSynthesisVoice | null = null;

function getSynthesis(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

function findEnglishVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;

  const synth = getSynthesis();
  if (!synth) return null;

  const voices = synth.getVoices();
  if (voices.length === 0) return null;

  const preferred: Array<(v: SpeechSynthesisVoice) => boolean> = [
    (v) => v.lang === "en-US" && v.name.includes("Google"),
    (v) => v.lang === "en-US" && v.name.includes("Microsoft") && v.name.includes("Online"),
    (v) => v.lang === "en-US" && !v.localService,
    (v) => v.lang === "en-GB" && !v.localService,
    (v) => v.lang === "en-US",
    (v) => v.lang === "en-GB",
    (v) => v.lang.startsWith("en-"),
    (v) => v.lang.startsWith("en"),
  ];

  for (const pred of preferred) {
    const match = voices.find(pred);
    if (match) {
      cachedVoice = match;
      return match;
    }
  }

  return null;
}

export function speakWord(word: string): void {
  try {
    const synth = getSynthesis();
    if (!synth) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    const voice = findEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    synth.speak(utterance);
  } catch {
    // Speech synthesis not available
  }
}

export function preloadVoices(): void {
  try {
    const synth = getSynthesis();
    if (!synth) return;

    const voices = synth.getVoices();
    if (voices.length > 0) {
      findEnglishVoice();
      return;
    }

    synth.onvoiceschanged = () => {
      cachedVoice = null;
      findEnglishVoice();
    };
  } catch {
    // Speech synthesis not available
  }
}
