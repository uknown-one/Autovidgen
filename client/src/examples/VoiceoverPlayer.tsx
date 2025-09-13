import VoiceoverPlayer from '../VoiceoverPlayer'

export default function VoiceoverPlayerExample() {
  return (
    <div className="p-6 max-w-2xl">
      <VoiceoverPlayer
        audioUrl="https://example.com/sample-audio.mp3"
        title="MK-Ultra Mind Control Voiceover"
        duration={754}
        voice="Dark Narrator Voice"
      />
    </div>
  )
}
