import ScriptEditor from '../ScriptEditor'

export default function ScriptEditorExample() {
  const sampleScript = `Welcome to another deep dive into the unknown...

Today, we're exploring one of the most disturbing government experiments ever conducted on American soil - the MK-Ultra mind control program. For over two decades, the CIA secretly drugged, tortured, and experimented on thousands of unsuspecting victims.

[Scene 1: The Beginning]
It all started in 1953, when CIA Director Allen Dulles authorized a top-secret program designed to develop mind control techniques. What they created was a nightmare that would span 20 years and destroy countless lives...

[Scene 2: The Experiments]
Dr. Donald Ewen Cameron's work at Allan Memorial Institute was particularly horrifying. Patients were subjected to electroshock therapy, sensory deprivation, and massive doses of LSD without their knowledge or consent...

[Scene 3: The Cover-Up]
When the program was exposed in the 1970s, most documents were destroyed. But what survived reveals the true scope of these illegal human experiments...

[Scene 4: The Survivors]
Many victims never recovered from what was done to them. Their stories of psychological torture and permanent trauma paint a picture of systematic abuse by their own government...

[Conclusion]
The MK-Ultra program stands as one of the darkest chapters in CIA history. While officially discontinued, many believe similar programs continue in secret to this day.

What do you think? Could these experiments still be happening? Let me know in the comments below, and don't forget to subscribe for more hidden truths.`;

  return (
    <div className="h-screen p-6">
      <ScriptEditor 
        initialScript={sampleScript}
        title="MK-Ultra Mind Control Script"
      />
    </div>
  )
}