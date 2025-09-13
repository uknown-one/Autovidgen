import { useState } from 'react'
import CreateProjectModal from '../CreateProjectModal'
import { Button } from '@/components/ui/button'

export default function CreateProjectModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>
        Open Create Project Modal
      </Button>
      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
        onCreateProject={(project) => console.log('Project created:', project)}
      />
    </div>
  )
}