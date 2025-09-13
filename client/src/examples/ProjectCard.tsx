import ProjectCard from '../ProjectCard'

export default function ProjectCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <ProjectCard
        id="1"
        title="The Denver Airport Conspiracy"
        description="Investigating the dark secrets and occult symbolism hidden beneath Denver International Airport."
        status="complete"
        duration="18:47"
        createdAt="2 days ago"
      />
      <ProjectCard
        id="2"
        title="The Backrooms: Level 0 Encounter"
        description="Terrifying first-person account of someone trapped in the endless yellow maze of the Backrooms."
        status="voiceover-done"
        createdAt="1 week ago"
      />
      <ProjectCard
        id="3"
        title="MK-Ultra Mind Control Experiments"
        description="Declassified documents reveal the CIA's illegal human experimentation program from the 1950s-70s."
        status="script-ready"
        createdAt="3 days ago"
      />
      <ProjectCard
        id="4"
        title="The Skinwalker Ranch Phenomena"
        description="Unexplained paranormal activity and UFO sightings at America's most mysterious location."
        status="draft"
        createdAt="5 days ago"
      />
    </div>
  )
}