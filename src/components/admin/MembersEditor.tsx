import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import type { SiteContent } from '../../types'
import { TIER_OPTIONS } from '../../lib/content'
import { createId, getInitials } from '../../lib/arabic'
import { AdminAddButton, AdminField, AdminSection, type SetDraft } from './AdminFields'

interface MembersEditorProps {
  draft: SiteContent
  setDraft: SetDraft
}

const iconButton =
  'inline-flex h-8 w-8 items-center justify-center rounded-full border border-espresso/10 bg-white/40 text-ink/45 transition hover:border-espresso/20 hover:bg-white hover:text-espresso disabled:cursor-not-allowed disabled:opacity-25'

export function MembersEditor({ draft, setDraft }: MembersEditorProps) {
  const setTeamPage = (patch: Partial<SiteContent['teamPage']>) =>
    setDraft((current) => ({
      ...current,
      teamPage: { ...current.teamPage, ...patch },
    }))

  const updateMember = (id: string, patch: Partial<SiteContent['members'][number]>) =>
    setDraft((current) => ({
      ...current,
      members: current.members.map((member) =>
        member.id === id ? { ...member, ...patch } : member,
      ),
    }))

  const addMember = () =>
    setDraft((current) => ({
      ...current,
      members: [
        ...current.members,
        {
          id: createId(),
          name: 'New Member',
          latinName: 'New Member',
          major: 'Major',
          role: 'Member',
          team: 'Logic Team',
          tier: 'member',
        },
      ],
    }))

  const removeMember = (id: string) =>
    setDraft((current) => ({
      ...current,
      members: current.members.filter((member) => member.id !== id),
    }))

  const moveMember = (index: number, direction: -1 | 1) =>
    setDraft((current) => {
      const target = index + direction
      if (target < 0 || target >= current.members.length) return current
      const members = [...current.members]
      ;[members[index], members[target]] = [members[target], members[index]]
      return { ...current, members }
    })

  const teamOptions = Array.from(
    new Set([
      ...draft.members.map((member) => member.team).filter(Boolean),
      'Logic Team',
      'Research Team',
      'Relations Team',
      'Media Team',
      'Meetings',
    ]),
  )

  return (
    <div className="space-y-5">
      <AdminSection
        title="Team Page Text"
        description="The page title and description shown above the team structure."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Eyebrow"
            value={draft.teamPage.eyebrow}
            onChange={(eyebrow) => setTeamPage({ eyebrow })}
          />
          <AdminField
            label="Title"
            value={draft.teamPage.title}
            onChange={(title) => setTeamPage({ title })}
          />
          <AdminField
            label="Description"
            value={draft.teamPage.description}
            onChange={(description) => setTeamPage({ description })}
            textarea
            rows={3}
            className="sm:col-span-2"
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Team Members"
        description={`${draft.members.length} members saved. The tier controls placement: president and vice president come first, then team leads. Regular members stay in the dashboard but are not shown on the public team page.`}
        action={<AdminAddButton onClick={addMember} label="Add Member" />}
      >
        {draft.members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-espresso/20 bg-cream/40 p-8 text-center">
            <p className="text-sm text-ink/55">No members yet. Add the first one with the button above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {draft.members.map((member, index) => (
              <div
                key={member.id}
                className="rounded-2xl border border-espresso/10 bg-cream/35 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-espresso/10 pb-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-caramel via-bark to-espresso font-latin text-[11px] font-semibold text-cream">
                      {getInitials(member.latinName || member.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-espresso">
                        {member.name || 'Unnamed member'}
                      </p>
                      <p className="text-[10px] text-ink/40">
                        {`0${index + 1}`} · {member.role || 'No role'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => moveMember(index, -1)}
                      disabled={index === 0}
                      className={iconButton}
                      aria-label="Move member up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMember(index, 1)}
                      disabled={index === draft.members.length - 1}
                      className={iconButton}
                      aria-label="Move member down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-900/10 bg-white/40 text-red-900/40 transition hover:border-red-900/20 hover:bg-red-50 hover:text-red-900/70"
                      aria-label="Delete member"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <AdminField
                    label="Display name"
                    value={member.name}
                    onChange={(name) => updateMember(member.id, { name })}
                  />
                  <AdminField
                    label="Latin name"
                    value={member.latinName}
                    onChange={(latinName) => updateMember(member.id, { latinName })}
                    dir="ltr"
                  />
                  <AdminField
                    label="Major"
                    value={member.major}
                    onChange={(major) => updateMember(member.id, { major })}
                  />
                  <label className="block">
                    <span className="field-label">Team</span>
                    <input
                      type="text"
                      list="admin-team-options"
                      value={member.team}
                      onChange={(event) => updateMember(member.id, { team: event.target.value })}
                      className="field"
                    />
                  </label>
                  <AdminField
                    label="Role"
                    value={member.role}
                    onChange={(role) => updateMember(member.id, { role })}
                    className="sm:col-span-2"
                  />
                  <label className="block sm:col-span-2">
                    <span className="field-label">Tier / Level</span>
                    <select
                      value={member.tier}
                      onChange={(event) =>
                        updateMember(member.id, {
                          tier: event.target.value as SiteContent['members'][number]['tier'],
                        })
                      }
                      className="field"
                    >
                      {TIER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addMember}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-espresso/20 py-3 text-xs font-medium text-ink/50 transition hover:border-caramel/50 hover:bg-cream/50 hover:text-espresso"
        >
          <Plus className="h-4 w-4" />
          Add Another Member
        </button>

        <datalist id="admin-team-options">
          {teamOptions.map((team) => (
            <option key={team} value={team} />
          ))}
        </datalist>
      </AdminSection>
    </div>
  )
}
