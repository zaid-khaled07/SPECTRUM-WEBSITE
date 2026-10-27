import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  AlertTriangle,
  Database,
  Download,
  FileJson,
  History,
  RotateCcw,
  Upload,
} from 'lucide-react'
import type { SiteContent } from '../../types'
import { parseImportedContent } from '../../lib/content'
import { formatDate } from '../../lib/arabic'
import {
  AdminField,
  AdminSection,
  type SetDraft,
  type ToastTone,
} from './AdminFields'

interface SettingsEditorProps {
  draft: SiteContent
  setDraft: SetDraft
  onNotify: (message: string, tone?: ToastTone) => void
  onReset: () => void
  lastUpdated: string
}

export function SettingsEditor({
  draft,
  setDraft,
  onNotify,
  onReset,
  lastUpdated,
}: SettingsEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmingReset, setConfirmingReset] = useState(false)

  const setSite = (patch: Partial<SiteContent['site']>) =>
    setDraft((current) => ({ ...current, site: { ...current.site, ...patch } }))

  const exportContent = () => {
    const payload = JSON.stringify(draft, null, 2)
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `spectrum-content-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    onNotify('A copy of the content was exported.')
  }

  const importContent = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > 1_500_000) {
      onNotify('The file is larger than the allowed limit (1.5MB).', 'error')
      return
    }
    try {
      const text = await file.text()
      const imported = parseImportedContent(text)
      setDraft(imported)
      onNotify('File loaded. Review the changes, then press Save.', 'warning')
    } catch (error) {
      onNotify(
        error instanceof Error ? error.message : 'Could not read the file.',
        'error',
      )
    }
  }

  return (
    <div className="space-y-5">
      <AdminSection
        title="University Details"
        description="These details appear in the header, footer, and team page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="University name"
            value={draft.site.university}
            onChange={(university) => setSite({ university })}
          />
          <AdminField
            label="University name (English)"
            value={draft.site.universityEn}
            onChange={(universityEn) => setSite({ universityEn })}
            dir="ltr"
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Backup"
        description="Export the content as a JSON file, or import a previously exported copy. Importing does not save automatically."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={exportContent}
            className="group flex items-start gap-3 rounded-2xl border border-espresso/10 bg-cream/40 p-4 text-left transition hover:border-caramel/40 hover:bg-cream/70"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-espresso text-cream">
              <Download className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-espresso">Export Content</span>
              <span className="mt-0.5 block text-[10px] leading-5 text-ink/45">
                Save a full copy of the texts, goals, and members.
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group flex items-start gap-3 rounded-2xl border border-espresso/10 bg-cream/40 p-4 text-left transition hover:border-caramel/40 hover:bg-cream/70"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-espresso/10 bg-white/60 text-espresso">
              <Upload className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-espresso">Import a Copy</span>
              <span className="mt-0.5 block text-[10px] leading-5 text-ink/45">
                Choose a JSON file previously exported from Spectrum.
              </span>
            </span>
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={importContent}
          className="sr-only"
          aria-label="Choose a backup file"
        />

        <div className="mt-4 grid gap-3 rounded-2xl border border-espresso/10 bg-white/40 p-4 text-[11px] text-ink/55 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <FileJson className="h-4 w-4 text-caramel-dark" />
            {draft.goals.length} goals
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-caramel-dark" />
            {draft.members.length} members
          </div>
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-caramel-dark" />
            Last saved: {formatDate(lastUpdated)}
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Storage & Security"
        description="How the admin dashboard works in this version."
      >
        <div className="rounded-2xl border border-caramel/20 bg-caramel/[0.06] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-caramel/15 text-caramel-dark">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div className="text-[11px] leading-6 text-ink/60">
              <p className="font-semibold text-espresso">Local admin dashboard</p>
              <p className="mt-1">
                Content is saved to <span className="font-latin text-[10px]">localStorage</span>{' '}
                in this browser only and is not synced with a server. To publish changes to all
                visitors, export a JSON copy and add it to the project content, or connect the
                site to a database later.
              </p>
            </div>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Danger Zone"
        description="Restoring the default content permanently deletes all local edits."
      >
        {confirmingReset ? (
          <div className="rounded-2xl border border-red-900/20 bg-red-50/60 p-4">
            <p className="text-[12px] font-semibold text-red-950/80">
              Are you sure you want to restore the default content?
            </p>
            <p className="mt-1 text-[10px] leading-5 text-red-950/50">
              All texts, edits, and added members will be removed and the original version restored.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  onReset()
                  setConfirmingReset(false)
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-900 px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-red-950"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Confirm Restore
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="rounded-full border border-espresso/15 bg-white/50 px-4 py-2 text-[11px] font-medium text-ink/60 transition hover:bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingReset(true)}
            className="inline-flex items-center gap-2 rounded-full border border-red-900/15 px-4 py-2.5 text-[11px] font-semibold text-red-900/60 transition hover:border-red-900/30 hover:bg-red-50 hover:text-red-900"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restore Default Content
          </button>
        )}
      </AdminSection>
    </div>
  )
}
