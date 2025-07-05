// Your script here.
<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Populate voices and update the dropdown
  function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (!voices.length) {
      voicesDropdown.innerHTML = '<option>No voices available</option>';
      return;
    }

    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set selected voice
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === voicesDropdown.value);
    restart();
  }

  // Speak the text
  function speak() {
    if (!msg.text.trim()) return alert("Please enter some text to speak!");
    window.speechSynthesis.speak(msg);
  }

  // Stop speaking
  function stop() {
    window.speechSynthesis.cancel();
  }

  // Restart speaking
  function restart() {
    stop();
    speak();
  }

  // Set message options (rate, pitch, text)
  function setOption() {
    msg[this.name] = this.value;
  }

  // Initialize
  window.speechSynthesis.onvoiceschanged = populateVoices;
  populateVoices();

  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);
</script>
