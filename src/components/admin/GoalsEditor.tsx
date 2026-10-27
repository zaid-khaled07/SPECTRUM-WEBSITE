import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import type { SiteContent } from '../../types'
import { GOAL_ICON_OPTIONS } from '../../lib/content'
import { createId } from '../../lib/arabic'
import { GoalGlyph } from '../GoalGlyph'
import { AdminAddButton, AdminField, AdminSection, type SetDraft } from './AdminFields'

interface GoalsEditorProps {
  draft: SiteContent
  setDraft: SetDraft
}

const iconButton =
  'inline-flex h-8 w-8 items-center justify-center rounded-full border border-espresso/10 bg-white/40 text-ink/45 transition hover:border-espresso/20 hover:bg-white hover:text-espresso disabled:cursor-not-allowed disabled:opacity-25'

export function GoalsEditor({ draft, setDraft }: GoalsEditorProps) {
  const setSection = (patch: Partial<SiteContent['goalsSection']>) =>
    setDraft((current) => ({
      ...current,
      goalsSection: { ...current.goalsSection, ...patch },
    }))

  const updateGoal = (id: string, patch: Partial<SiteContent['goals'][number]>) =>
    setDraft((current) => ({
      ...current,
      goals: current.goals.map((goal) => (goal.id === id ? { ...goal, ...patch } : goal)),
    }))

  const addGoal = () =>
    setDraft((current) => ({
      ...current,
      goals: [
        ...current.goals,
        {
          id: createId(),
          label: 'New Goal',
          text: 'Write the goal text here.',
          icon: 'rocket',
        },
      ],
    }))

  const removeGoal = (id: string) =>
    setDraft((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id),
    }))

  const moveGoal = (index: number, direction: -1 | 1) =>
    setDraft((current) => {
      const target = index + direction
      if (target < 0 || target >= current.goals.length) return current
      const goals = [...current.goals]
      ;[goals[index], goals[target]] = [goals[target], goals[index]]
      return { ...current, goals }
    })

  return (
    <div className="space-y-5">
      <AdminSection
        title="Goals Section Text"
        description="The title, description, and quote shown in the middle of the home page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Eyebrow"
            value={draft.goalsSection.eyebrow}
            onChange={(eyebrow) => setSection({ eyebrow })}
          />
          <AdminField
            label="Title"
            value={draft.goalsSection.title}
            onChange={(title) => setSection({ title })}
          />
          <AdminField
            label="Description"
            value={draft.goalsSection.description}
            onChange={(description) => setSection({ description })}
            textarea
            rows={3}
            className="sm:col-span-2"
          />
          <AdminField
            label="Quote"
            value={draft.goalsSection.quote}
            onChange={(quote) => setSection({ quote })}
            textarea
            rows={2}
            className="sm:col-span-2"
            hint="Shown in large type between the goals grid and the closing section."
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Goal Cards"
        description={`${draft.goals.length} goals currently. The order here matches the order on the site.`}
        action={<AdminAddButton onClick={addGoal} label="Add Goal" />}
      >
        {draft.goals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-espresso/20 bg-cream/40 p-8 text-center">
            <p className="text-sm text-ink/55">No goals yet. Add the first one with the button above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {draft.goals.map((goal, index) => (
              <div
                key={goal.id}
                className="rounded-2xl border border-espresso/10 bg-cream/35 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-espresso/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-caramel/20 bg-caramel/10 text-caramel-dark">
                      <GoalGlyph icon={goal.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-espresso">
                        Goal {`0${index + 1}`}
                      </p>
                      <p className="text-[10px] text-ink/40">{goal.label || 'Untitled'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => moveGoal(index, -1)}
                      disabled={index === 0}
                      className={iconButton}
                      aria-label="Move goal up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveGoal(index, 1)}
                      disabled={index === draft.goals.length - 1}
                      className={iconButton}
                      aria-label="Move goal down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGoal(goal.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-900/10 bg-white/40 text-red-900/40 transition hover:border-red-900/20 hover:bg-red-50 hover:text-red-900/70"
                      aria-label="Delete goal"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <AdminField
                    label="Short label"
                    value={goal.label}
                    onChange={(label) => updateGoal(goal.id, { label })}
                  />
                  <label className="block">
                    <span className="field-label">Icon</span>
                    <select
                      value={goal.icon}
                      onChange={(event) =>
                        updateGoal(goal.id, {
                          icon: event.target.value as SiteContent['goals'][number]['icon'],
                        })
                      }
                      className="field"
                    >
                      {GOAL_ICON_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <AdminField
                    label="Goal text"
                    value={goal.text}
                    onChange={(text) => updateGoal(goal.id, { text })}
                    textarea
                    rows={3}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addGoal}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-espresso/20 py-3 text-xs font-medium text-ink/50 transition hover:border-caramel/50 hover:bg-cream/50 hover:text-espresso"
        >
          <Plus className="h-4 w-4" />
          Add Another Goal
        </button>
      </AdminSection>
    </div>
  )
}
