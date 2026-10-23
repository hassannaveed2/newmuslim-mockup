# UX audit: blog and storytelling landing pages

Audit for the **New Muslim Stories** redesign, run on 2026-10-23. The site is a blog-style home for first-person stories from people who embraced Islam from other faiths. Signed-up storytellers can submit their own story, optionally with a YouTube video, and editors review each one before it's published.

## Sites audited

I visited ten benchmark sites and two Muslim/convert competitors. Medium, The Moth, Atlas Obscura and The Verge blocked automated access, so they were replaced with equally relevant sites and **are not part of this audit**.

| # | Site | Why it's relevant | Pattern worth stealing | Weak spot |
|---|------|-------------------|------------------------|-----------|
| 1 | **Aeon** (aeon.co) | Editorial essays + video in one feed | **One card system for essays and videos.** Only the format label and runtime differ. A "Save" button on every card. | Duplicate items in "Popular" weaken the curation |
| 2 | **Longreads** (longreads.com) | Long-form story curation | **One lead story, then an even grid.** Themed **reading lists**. Word count shown as a time commitment. | Sign-up prompts repeated in several places; visible error states |
| 3 | **StoryCorps** (storycorps.org) | The world's largest first-person story archive | Quote-led titles ("I'm gonna make it the worst date ever"). Duration on every item. Warm contribution framing: *"Press record on what matters."* | Opens without a value proposition; cards have no names or tags |
| 4 | **Humans of New York** (brandonstanton.com) | Portrait + first-person quote format | Strong, specific proof: books, people photographed, countries, funds raised | Stories sit off-site on Instagram/Facebook; no on-site feed; no contribution path |
| 5 | **Humans of Bombay** (humansofbombay.in) | First-person stories **with public submissions** | Inline "Share your story" form: *"Your journey, in your words"* plus a **consent checkbox** | Two competing submit CTAs, one sending to an external Google Form; vague impact counters |
| 6 | **Yaqeen Institute** (yaqeeninstitute.org) | High-quality Muslim editorial site | Islamic identity shown through reverent conventions (ﷺ, honorifics), not ornament. **Question-led** titles and series. Credentials shown on authors. | No search or filters for a big library |
| 7 | **Substack** (substack.com) | Platform where readers become writers | Clear read-vs-write split; mixes short notes and long posts | Weak entry point for first-time readers; unlabelled engagement numbers |
| 8 | **Ghost** (ghost.org) | Blog/membership platform landing page | Showcase cards carry **one headline metric each**. Concrete social proof. | The free-trial CTA is repeated many times |
| 9 | **Kinfolk** (kinfolk.com) | Calm, premium editorial design | A consistent module rhythm: Latest, In Conversation, Worth Revisiting | The taxonomy doesn't match between nav and footer; the subscribe block is repeated |
| 10 | **Narratively** (narratively.com) | First-person true-story publication | Specific social proof on the sign-up ("Over 66,000 subscribers") | The homepage hides the stories behind a newsletter gate |
| C1 | **IslamReligion.com: Stories of New Muslims** | Direct competitor (283 stories) | **"Name, Ex-Catholic, Canada"** titles tell you the journey at a glance. A large parallel video library. | Same generic book icon on every story; no filters or sorting; no submit CTA; typos; stories split into parts |
| C2 | **AboutIslam: My Journey to Islam** | Direct competitor | Warm first-person headlines; "next step" links to counselling | Ads, an unrelated poll and a cluttered sidebar; no dates, read times or filters; no submit CTA; video kept separate from the stories |

## What this site needs most

### Homepage
1. **Lead with a story, and say what the site is in one line.** Aeon and Longreads open on one lead story. StoryCorps and HONY open on a player or a bio, which is weaker. The hero should combine the featured story's quote, the storyteller's journey line, and two CTAs: *Read stories* and *Share your story*.
2. **First-person quote titles.** StoryCorps and AboutIslam both show quotes beat topic titles for emotional pull.
3. **Journey details on every card:** *Raised Catholic · Philippines · Muslim since 2019*, plus read time. This is IslamReligion's best idea, upgraded from a text title to chips.
4. **One card system for text and video**, as Aeon does: a video badge and runtime, never a separate visual language.
5. **"Find a story like yours" filtering on the homepage.** No competitor has it, and the data model already supports 8 filters.
6. **Browse by previous background, with counts.** This is the most meaningful entry point for a seeker ("people like me").
7. **Curated collections / reading lists**, like Longreads and Kinfolk, including question-led ones like Yaqeen's: *The question that started it*, *Telling my family*, *My first Ramadan*.
8. **Honest, defined numbers:** stories, countries, backgrounds, *every story reviewed*. Humans of Bombay shows vague counters hurt trust.
9. **One newsletter, in one place:** *"One story, every Friday."* Longreads, Kinfolk and Ghost all over-repeat theirs.
10. **A support path for new Muslims**, like AboutIslam's counselling link: learn to pray, find a mosque, talk to a mentor.

### Stories listing page
11. **Sticky filter bar** (Country, Gender, Age at conversion, Year, Previous background, Profession, Education, Category), with result counts and the filters kept in the URL.
12. **Read-time filters** ("Quick read", "Deep dive") and a **Has video** toggle, following Longreads.

### Single story page
13. **A storyteller profile card** next to the story, built from the structured fields, plus an **in-page YouTube embed**. Never send readers off-site; HONY and Humans of Bombay lose readers that way.
14. **After each story, invite the reader to share theirs**, StoryCorps' and Humans of Bombay's standout idea: *"Did a moment like this happen to you?"* Follow it with related stories from the same background.
15. **Save and share** on the story (Aeon), plus a gentle "This story moved me" instead of open comments, which need heavy moderation.

### Share-your-story flow
16. **Warm framing and three clear steps:** *Create an account → Write your story (add a YouTube link if you have one) → Our editors review it within 7 days.*
17. **Privacy choices up front:** a pen name or first name only, keeping the photo private, editing or removing the story at any time, and **explicit consent** (Humans of Bombay's checkbox). Many storytellers have families who don't know yet.

## Anti-patterns to avoid
- **A generic icon on every story.** IslamReligion's identical icons make 283 stories look the same.
- **No visible way to submit.** Both competitors lack one, which is the biggest missed opportunity in this niche.
- **Ads, polls and sidebar clutter** competing with the story (AboutIslam).
- **Sending readers off-site** to Instagram/Facebook/YouTube to finish a story (HONY, Humans of Bombay).
- **Multi-part stories, typos, stale "last modified" dates.** Publish each story once, edited.
- **Repeated subscribe/donate blocks** (Longreads, Kinfolk, Ghost).
- **Sensational framing** ("SHOCKING conversion!") or putting down the storyteller's former faith.

## Tone guidance
- **Dignity over spectacle.** Use "Raised Catholic" rather than "Ex-Catholic". Each story is about finding, not leaving.
- **Islamic identity through reverence, not cliché.** Use proper honorifics (ﷺ) and a restrained geometric motif, not neon crescents or stock calligraphy.
- **Safety first.** Pen names, optional photos, and consent recorded with the date (the codebase already stamps `acceptedTerms`).
- **Real people, real photos in production.** The mockup uses AI-generated placeholder imagery. The live site should only show storytellers' own photos, with consent, or neutral imagery.
