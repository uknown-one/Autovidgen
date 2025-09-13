# YouTube Video Content Creation App - Design Guidelines

## Design Approach Documentation
**Selected Approach**: Design System (Material Design) + Reference-based inspiration from YouTube Studio and Notion
**Justification**: This is a productivity-focused application that needs to handle complex workflows and data-dense interfaces. Users will spend extended time in the app, requiring excellent usability and learnability over pure visual appeal.

## Core Design Elements

### A. Color Palette
**Dark Mode (Primary)**:
- Primary: 255 85% 60% (YouTube-inspired red)
- Background: 220 13% 9% (deep dark)
- Surface: 220 13% 16% (elevated surfaces)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

**Light Mode**:
- Primary: 355 85% 55%
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 220 13% 18%
- Text Secondary: 220 9% 46%

### B. Typography
- **Primary**: Inter (Google Fonts) - clean, highly legible
- **Monospace**: JetBrains Mono - for script editing
- **Hierarchy**: 
  - H1: 2.5rem, semibold
  - H2: 2rem, semibold  
  - H3: 1.5rem, medium
  - Body: 1rem, regular
  - Small: 0.875rem, regular

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, and 16
- Consistent 8px grid system
- Component padding: p-4 or p-6
- Section spacing: mb-8 or mb-12
- Card gaps: gap-6

### D. Component Library

**Navigation**:
- Sidebar navigation (collapsible) with project tree
- Top header with user profile, notifications, export actions
- Breadcrumb navigation for deep workflows

**Core Components**:
- **Script Editor**: Monaco-style editor with syntax highlighting
- **Project Cards**: Video thumbnails, progress bars, status badges
- **Template Gallery**: Grid layout with preview overlays
- **Audio Waveform**: Visual representation of generated voiceovers
- **Progress Indicators**: Multi-step workflow visualization

**Data Displays**:
- **Project Dashboard**: Kanban-style boards (To-Do, In Progress, Complete)
- **Analytics Cards**: Video performance metrics
- **Content Library**: Filterable grid of templates and assets
- **Export Queue**: List view with progress indicators

**Forms & Inputs**:
- **Script Generator**: Multi-step wizard with topic input, style selection
- **Video Settings**: Tabbed interface for audio, timing, export options
- **Template Creator**: Drag-and-drop interface for custom templates

**Overlays**:
- **Preview Modal**: Full-screen script and audio preview
- **Export Dialog**: Progress tracking with download options
- **Settings Panel**: Slide-out configuration panel

### E. Key Design Principles
1. **Workflow-First**: Design follows the natural video creation process
2. **Content Hierarchy**: Clear distinction between projects, scripts, and assets
3. **Progressive Disclosure**: Complex features revealed as needed
4. **Status Transparency**: Always show progress, processing states, and completion status
5. **Efficiency Focus**: Quick actions, keyboard shortcuts, and bulk operations

## Images
No large hero images needed. Focus on:
- **Project Thumbnails**: Auto-generated or uploaded video previews
- **Template Previews**: Screenshot-style previews of script layouts
- **Empty States**: Simple illustrations for empty project lists
- **User Avatars**: Profile pictures in navigation and collaboration features

This design balances YouTube's familiar visual language with productivity-focused functionality, ensuring users can efficiently manage complex video creation workflows while maintaining visual consistency with their target platform.