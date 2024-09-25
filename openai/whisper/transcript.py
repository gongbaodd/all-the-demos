#Import the openai Library
from openai import OpenAI

# Create an api client
client = OpenAI(api_key="YOUR_KEY_HERE")

# Load audio file
audio_file= open("AUDIO_FILE_PATH", "rb")

# Transcribe
transcription = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)
# Print the transcribed text
print(transcription.text)