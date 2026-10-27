import type { SiteContent } from '../../types'
import { AdminField, AdminSection, type SetDraft } from './AdminFields'

interface HomeEditorProps {
  draft: SiteContent
  setDraft: SetDraft
}

export function HomeEditor({ draft, setDraft }: HomeEditorProps) {
  const setHero = (patch: Partial<SiteContent['hero']>) =>
    setDraft((current) => ({ ...current, hero: { ...current.hero, ...patch } }))

  const setPhilosophy = (patch: Partial<SiteContent['hero']['philosophy']>) =>
    setDraft((current) => ({
      ...current,
      hero: {
        ...current.hero,
        philosophy: { ...current.hero.philosophy, ...patch },
      },
    }))

  const setCta = (patch: Partial<SiteContent['cta']>) =>
    setDraft((current) => ({ ...current, cta: { ...current.cta, ...patch } }))

  return (
    <div className="space-y-5">
      <AdminSection
        title="Hero Section"
        description="The headline, intro text, and call-to-action buttons on the first screen."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Top badge"
            value={draft.hero.badge}
            onChange={(badge) => setHero({ badge })}
            className="sm:col-span-2"
          />
          <AdminField
            label="Main title"
            value={draft.hero.title}
            onChange={(title) => setHero({ title })}
          />
          <AdminField
            label="Title accent"
            value={draft.hero.titleAccent}
            onChange={(titleAccent) => setHero({ titleAccent })}
            dir="ltr"
          />
          <AdminField
            label="Subtitle"
            value={draft.hero.subtitle}
            onChange={(subtitle) => setHero({ subtitle })}
            textarea
            rows={3}
            className="sm:col-span-2"
          />
          <AdminField
            label="Primary button text"
            value={draft.hero.primaryCta}
            onChange={(primaryCta) => setHero({ primaryCta })}
          />
          <AdminField
            label="Secondary button text"
            value={draft.hero.secondaryCta}
            onChange={(secondaryCta) => setHero({ secondaryCta })}
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Philosophy"
        description="The three blocks below the hero: Our Philosophy, What We Offer, and Our Strength."
      >
        <div className="space-y-5">
          {[
            {
              title: 'Our Philosophy',
              labelKey: 'ideaLabel' as const,
              textKey: 'idea' as const,
            },
            {
              title: 'What We Offer',
              labelKey: 'offerLabel' as const,
              textKey: 'offer' as const,
            },
            {
              title: 'Our Strength',
              labelKey: 'strengthLabel' as const,
              textKey: 'strength' as const,
            },
          ].map((block) => (
            <div key={block.title} className="rounded-2xl border border-espresso/10 bg-cream/40 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-[0.8fr_2.2fr]">
                <AdminField
                  label="Block heading"
                  value={draft.hero.philosophy[block.labelKey]}
                  onChange={(value) => setPhilosophy({ [block.labelKey]: value })}
                />
                <AdminField
                  label="Text"
                  value={draft.hero.philosophy[block.textKey]}
                  onChange={(value) => setPhilosophy({ [block.textKey]: value })}
                  textarea
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title="Closing Call-to-Action"
        description="The large card at the end of the home page. Its button opens the join form."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Eyebrow"
            value={draft.cta.eyebrow}
            onChange={(eyebrow) => setCta({ eyebrow })}
          />
          <AdminField
            label="Button text"
            value={draft.cta.button}
            onChange={(button) => setCta({ button })}
          />
          <AdminField
            label="Title"
            value={draft.cta.title}
            onChange={(title) => setCta({ title })}
            className="sm:col-span-2"
          />
          <AdminField
            label="Description"
            value={draft.cta.description}
            onChange={(description) => setCta({ description })}
            textarea
            rows={3}
            className="sm:col-span-2"
          />
        </div>
      </AdminSection>
    </div>
  )
}
