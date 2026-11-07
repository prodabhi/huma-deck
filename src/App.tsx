import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import ChartSlide, { AsideStat } from './components/ChartSlide';
import Process, { CreateFigure, SignFigure, ShareFigure, VerifyFigure } from './components/Process';
import ResearchLine from './components/ResearchLine';
import HBars from './components/HBars';
import Showdown from './components/Showdown';
import Audience from './components/Audience';
import Compare from './components/Compare';
import { pewAllPages, pewNewPages, platforms, turing, sources, delves, showcasing } from './data/research';

/* Huma: why online writing needs a paper trail. Every figure is cited on its
   slide and listed on the final sources slide (see src/data/research.ts). */

const year = (date: string) => {
  const [y, m, d] = date.split('-').map(Number);
  return y + (m - 1) / 12 + (d - 1) / 365;
};
const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const monthLabel = (v: number) => {
  const y = Math.floor(v);
  return `${months[Math.min(11, Math.round((v - y) * 12))]} ${y}`;
};
const cite = (n: number) => {
  const s = sources.find((x) => x.n === n)!;
  return (
    <a className="cite" href={s.url} target="_blank" rel="noopener" title={s.label}>
      [{n}]
    </a>
  );
};

export default function App() {
  return (
    <Deck>
      <Cover
        nav="Huma"
        notes="One slide on what Huma is, in the words from the app's onboarding. Then the problem."
        title="Prove you wrote it."
        subtitle={
          <>
            <span className="byline" style={{ display: 'block' }}>Huma · November 2026</span>
            <span className="abstract" style={{ display: 'block' }}>
              <b>Huma</b> is a Mac writing app. You write in it and it records how you typed, not what. When
              you're done it makes a zero-knowledge proof on your own computer and gives you a link. Anyone can
              open that link and check that a real person typed it.
            </span>
          </>
        }
      />

      <ChartSlide
        nav="Spot the AI"
        notes="Click once. Left: 57 words about Huma, pasted into Pangram, one of the better AI detectors. It says 100% human. Click: the same 57 words, written by Claude a minute earlier when asked to 'explain Huma in 2 sentences like a human'. Detectors guess. The guess is getting worse as models get better."
        title="1. Detector: 100% human. Author: an AI."
        source={<><b>Figure 1.</b> The same 57 words. Left: an AI detector (Pangram 4.1, 6 November 2026) rates them “100% possibly human”. Right: Claude, an AI, had written them a minute earlier.</>}
      >
        <Showdown
          left={{
            src: '/img/pangram-human.png',
            alt: 'Pangram dashboard: the paragraph about Huma rated 100% possibly human',
            label: <><b>The detector’s verdict.</b> “100% of this text is possibly human.”</>,
          }}
          right={{
            src: '/img/claude-wrote-it.png',
            alt: 'A Claude chat producing the same paragraph when asked to explain Huma like a human',
            label: <><b>Where the words came from.</b> “Explain Huma in 2 sentences like a human.”</>,
            stamp: 'Written by AI',
          }}
        />
      </ChartSlide>

      <ChartSlide
        nav="The web"
        notes="Pew sampled about 490,000 English webpages. A third of pages published since ChatGPT show signs of AI writing."
        title="2. The web is filling up with AI."
        source={<><b>Figure 2.</b> English webpages showing signs of AI authorship, 2021 to 2026. Source: Pew Research Center {cite(1)}.</>}
      >
        <ResearchLine
          series={[
            { name: 'AI-generated new pages', tone: 'primary', points: pewNewPages.map(([d, v]) => [year(d), v]) },
            { name: 'AI-generated, all pages', tone: 'ink', points: pewAllPages.map(([d, v]) => [year(d), v]) },
          ]}
          x={{ min: 2021, max: 2026.6, ticks: [2021, 2022, 2023, 2024, 2025, 2026].map((y) => ({ at: y, label: String(y) })) }}
          y={{ max: 40, ticks: [0, 10, 20, 30, 40] }}
          marker={{ at: year('2022-11-30'), label: 'ChatGPT released' }}
          labelOf={monthLabel}
        />
      </ChartSlide>

      <ChartSlide
        nav="Papers"
        notes="Kobak et al. counted words in 15 million PubMed abstracts. 'Delves' was 28 times more common in 2024 than its 2021–22 trend predicted. One idea (The Guardian) is that AI picked it up from raters in Nigeria, where it's common in business English; an early corpus test (Juzek & Ward) didn't support it."
        title="3. Research papers changed their words."
        source={<><b>Figure 3.</b> PubMed abstracts using the word, per million, 2010 to 2024. Source: Kobak et al. {cite(2)}. Why “delve”? One idea {cite(3)}, not supported by an early test {cite(4)}.</>}
        aside={
          <>
            <AsideStat value="28×" label="more “delves” in 2024 than the trend predicted" />
            <AsideStat value="≥13.5%" label="of 2024 abstracts were written with AI help" />
          </>
        }
      >
        <ResearchLine
          series={[
            { name: '“delves”', tone: 'primary', points: delves },
            { name: '“showcasing”', tone: 'ink', points: showcasing },
          ]}
          x={{ min: 2010, max: 2024.4, ticks: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map((y) => ({ at: y, label: String(y) })) }}
          y={{ max: 4000, ticks: [0, 1000, 2000, 3000, 4000] }}
          unit=""
          marker={{ at: year('2022-11-30'), label: 'ChatGPT released' }}
          labelOf={(v) => String(Math.round(v))}
        />
      </ChartSlide>

      <ChartSlide
        nav="Social"
        notes="Originality.ai flags long posts as likely AI when it is at least 50% confident that 15% or more was AI-written. Hover a bar for its sample size."
        title="4. Social feeds are worse."
        source={<><b>Figure 4.</b> Long posts likely written with AI, July 2026 (Reddit: June) {cite(5)}. Fully AI-generated long posts {cite(6)}. YouTube Shorts {cite(7)}.</>}
        aside={
          <>
            <AsideStat value="1 in 4" label="long posts are fully AI-generated" />
            <AsideStat value="21%" label="of Shorts shown to a new YouTube account were AI-generated" />
          </>
        }
      >
        <HBars rows={platforms} />
      </ChartSlide>

      <ChartSlide
        nav="Turing test"
        notes="Five-minute, three-party Turing tests. LLaMa-3.1 and GPT-4.5 were prompted to act human. Spotted = 100% minus the share judged human."
        title="5. Smarter AI is harder to spot."
        source={<><b>Figure 5.</b> Five-minute Turing tests. LLaMa-3.1 and GPT-4.5 were told to act human. Source: Jones &amp; Bergen {cite(8)}.</>}
      >
        <ResearchLine
          series={[
            { name: 'AI passed as human', tone: 'primary', points: turing.map((t, i) => [i, t.judgedHuman]) },
            { name: 'People spotted the AI', tone: 'ink', points: turing.map((t, i) => [i, 100 - t.judgedHuman]) },
          ]}
          x={{ min: 0, max: 3, ticks: turing.map((t, i) => ({ at: i, label: t.model })) }}
          y={{ max: 100, ticks: [0, 25, 50, 75, 100] }}
          reference={{ at: 50, label: 'Coin flip' }}
          labelOf={(i) => turing[i].model}
        />
      </ChartSlide>

      <ChartSlide
        nav="Who needs it"
        notes="Anyone whose name goes on writing. Professors are on both sides: they write, and they read students' work. The 61% is Liang et al. (Stanford, Patterns 2023): seven detectors, 91 TOEFL essays by non-native English writers, average false-positive rate 61.22%. The same detectors were near perfect on US 8th-grade essays."
        title="6. Who needs proof, and why."
        source={<><b>Table 1.</b> Who needs to show they wrote it. Sources: Authors Guild {cite(9)}; Liang et al., Stanford, in <i>Patterns</i> {cite(10)}.</>}
      >
        <Audience
          people={[
            { who: 'Authors', why: <>Show readers a book is yours. The Authors Guild started a “Human Authored” mark in 2025 because “readers have the right to know” {cite(9)}.</> },
            { who: 'Professors', why: 'Grade the writing, not a detector’s guess. Ask for a Huma link with every essay.' },
            { who: 'Technical writers', why: 'Show clients and employers that the docs, specs and reports you bill for are your own.' },
            { who: 'Founders', why: 'Essays, launch posts and investor updates carry your name. Show you wrote them.' },
            { who: 'Anyone who writes', why: 'Students, journalists, freelancers and job seekers. Anyone who could be wrongly flagged.' },
          ]}
          stat={{
            value: '61%',
            label: <>of essays by non-native English writers were flagged as AI by seven detectors, on average {cite(10)}.</>,
          }}
        />
      </ChartSlide>

      <ChartSlide
        nav="How Huma works"
        notes="Steps 1 and 2 never leave the device. The proof is a self-contained file anyone can verify offline; Base holds a public, independently checkable record of it, with gas sponsored so users never touch crypto. Huma records text today; images, audio and video are planned."
        title="7. How Huma works."
        source={<><b>Figure 6.</b> How a Huma proof is made. Huma records text today; images, audio and video are planned.</>}
      >
        <Process
          privateLabel={<><b>Only you</b> see your drafts and edits.</>}
          sharedLabel={<><b>Anyone</b> can see the final piece and its proof.</>}
          steps={[
            { figure: CreateFigure, title: 'Create', body: 'Write, draw or record in Huma.' },
            { figure: SignFigure, title: 'Sign', body: <>Your device signs each action with a key kept in its <a href="https://support.apple.com/guide/security/secure-enclave-sec59b0b31ff/web" target="_blank" rel="noopener">Secure Enclave</a>.</> },
            { figure: ShareFigure, title: 'Share the proof', body: <>Huma makes a <a href="https://en.wikipedia.org/wiki/Zero-knowledge_proof" target="_blank" rel="noopener">zero-knowledge proof</a>: a small file you can post anywhere, with a public record on <a href="https://base.org" target="_blank" rel="noopener">Base</a>.</> },
            { figure: VerifyFigure, title: 'Verify', body: 'Anyone can verify the proof in a browser.' },
          ]}
        />
      </ChartSlide>

      <ChartSlide
        nav="Why Huma"
        notes="Turnitin scores the finished text and guesses. Vanderbilt turned it off in August 2023: at its 75,000 papers a year, Turnitin's own claimed 1% false-positive rate means about 750 students wrongly flagged. Grammarly Authorship watches you write, which is the right idea, but Plagiarism Today ran a Gemini essay through Grammarly's own Humanize tool and Authorship called it 75% typed by a human. Huma refuses text that doesn't come from a key press and keys sent by software, and anyone can check the proof. Be honest: Huma shows how a page was typed, not who composed the words."
        title="8. Turnitin guesses. Grammarly can be fooled."
        source={<><b>Table 2.</b> Turnitin AI detection, Grammarly Authorship and Huma. Sources: Vanderbilt University {cite(11)}; Plagiarism Today’s test {cite(12)}. Huma shows how a page was typed, not who composed the words.</>}
      >
        <Compare
          cols={[
            { name: 'Turnitin', sub: 'AI detection' },
            { name: 'Grammarly', sub: 'Authorship' },
            { name: 'Huma', sub: 'Proof of typing', hero: true },
          ]}
          rows={[
            {
              label: 'How it decides',
              cells: [
                <><b>It guesses.</b> It scores the finished text for signs of AI.</>,
                <><b>It watches.</b> It labels text as typed, pasted or AI while you write.</>,
                <><b>It proves.</b> It records how every key was typed and makes a proof on your Mac.</>,
              ],
            },
            {
              label: 'Where it failed',
              cells: [
                <><b>Wrong flags.</b> Vanderbilt switched it off: about 750 of its 75,000 papers a year could be wrongly flagged {cite(11)}.</>,
                <><b>Fooled.</b> An AI essay passed through Grammarly’s own Humanize tool came back “75% typed by a human” {cite(12)}.</>,
                <><b>Closed door.</b> Pasted text counts zero. Keys sent by scripts and AI agents are refused.</>,
              ],
            },
            {
              label: 'Who you trust',
              cells: [
                <><b>Turnitin.</b> It gives “no detailed information” on how it decides {cite(11)}.</>,
                <><b>Grammarly.</b> The same company whose AI rewrote the text {cite(12)}.</>,
                <><b>Nobody.</b> Anyone can check the proof in a browser.</>,
              ],
            },
          ]}
        />
      </ChartSlide>

      <Slide center nav="Conclusion" notes="Close on the call to action.">
        <Reveal>
          <h2 className="display">
            Create with Huma.
            <br />
            <span className="accent-text">Verify with Huma.</span>
          </h2>
          <p className="tagline">A verified human track record, built from everyday creation.</p>
        </Reveal>
      </Slide>

      <Slide nav="References" notes="Every number in this deck links here.">
        <Reveal>
          <div className="kicker" style={{ marginBottom: 18, textAlign: 'center' }}>References</div>
          <ol className="src-list">
            {sources.map((s) => (
              <li key={s.n}>
                <a href={s.url} target="_blank" rel="noopener">[{s.n}] {s.label}</a>
              </li>
            ))}
          </ol>
        </Reveal>
      </Slide>
    </Deck>
  );
}
