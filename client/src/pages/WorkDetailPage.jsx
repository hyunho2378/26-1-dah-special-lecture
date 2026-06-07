import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { projects } from '../data/projects.js'
import { type, color, layout } from '../tokens.js'
import Button from '../components/ui/Button.jsx'
import NotFoundPage from './NotFoundPage.jsx'

function BackLink() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-150 hover:text-paper"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M10 3L5 8L10 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      BACK
    </a>
  )
}

function ProjectThumbnail({ project }) {
  const [imgErr, setImgErr] = useState(false)
  const showImg = project.thumbnail && !imgErr
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderRadius: layout.radius.card,
        aspectRatio: '16 / 10',
        backgroundColor: color.ink,
      }}
    >
      {showImg ? (
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={() => setImgErr(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="font-display text-lg font-bold"
            style={{ color: color.muted }}
          >
            {project.title}
          </span>
        </div>
      )}
    </div>
  )
}

export default function WorkDetailPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) return <NotFoundPage />

  return (
    <div className="min-h-screen px-4 py-16 md:px-10 xl:px-16">
      <div className="mx-auto max-w-[1680px]">
        <BackLink />

        <div className="mt-8">
          <ProjectThumbnail project={project} />
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: project.accent || color.accent }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.14em]"
              style={{ color: color.muted }}
            >
              {project.role}
            </span>
          </div>
          <h1
            className="mt-3 font-display text-paper"
            style={{
              fontSize: type.h1.size,
              fontWeight: type.h1.weight,
              lineHeight: type.h1.lh,
              letterSpacing: type.h1.ls,
            }}
          >
            {project.title}
          </h1>
        </div>

        {project.liveUrl && (
          <div className="mt-8">
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              라이브 사이트 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
