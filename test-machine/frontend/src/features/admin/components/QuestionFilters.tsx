import type { Technology } from '../../../shared/types/index.js'

interface Props {
  technologies: Technology[]
  filterTech: string
  setFilterTech: (val: string) => void
  filterLevel: string
  setFilterLevel: (val: string) => void
  onFilter: () => void
}

export function QuestionFilters({
  technologies,
  filterTech,
  setFilterTech,
  filterLevel,
  setFilterLevel,
  onFilter
}: Props) {
  return (
    <div className="flex gap-3">
      <select 
        className="input w-48" 
        value={filterTech} 
        onChange={e => setFilterTech(e.target.value)}
        aria-label="Filter by technology"
      >
        <option value="">All technologies</option>
        {technologies.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <input 
        className="input w-32" 
        placeholder="Level" 
        value={filterLevel} 
        onChange={e => setFilterLevel(e.target.value)}
        aria-label="Filter by level"
      />
      <button className="btn-secondary text-sm" onClick={onFilter}>Filter</button>
    </div>
  )
}
