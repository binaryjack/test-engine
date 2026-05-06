import { MarkdownContent } from '../../../shared/components/UI/MarkdownContent.js'
import type { Question } from '../../../shared/types/index.js'

interface Props {
  questions: Question[]
  onEdit: (q: Question) => void
  onDelete: (id: string) => void
  loading: boolean
}

export function QuestionTable({ questions, onEdit, onDelete, loading }: Props) {
  return (
    <div className="card flex flex-col h-[calc(100vh-320px)] min-h-[400px]">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <p className="text-slate-400 text-sm">{questions.length} questions</p>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-slate-900 z-10">
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="pb-2 pr-4 bg-slate-900">Prompt</th>
              <th className="pb-2 pr-4 bg-slate-900">Topic</th>
              <th className="pb-2 pr-4 bg-slate-900">Level</th>
              <th className="pb-2 pr-4 bg-slate-900">Type</th>
              <th className="pb-2 pr-4 bg-slate-900">Difficulty</th>
              <th className="pb-2 bg-slate-900"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="py-2 pr-4 max-w-md">
                  <MarkdownContent content={q.prompt} className="text-white line-clamp-2 text-xs" />
                </td>
                <td className="py-2 pr-4 text-slate-400 whitespace-nowrap">{q.topic}</td>
                <td className="py-2 pr-4">
                  <span className="badge badge-mid">{q.level}</span>
                </td>
                <td className="py-2 pr-4 text-slate-400">{q.type}</td>
                <td className="py-2 pr-4 text-slate-400">{q.difficulty}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => onEdit(q)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger text-xs"
                      onClick={() => onDelete(q.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No questions found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
