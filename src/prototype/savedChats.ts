import type { ConnectorId } from "./agents/connectors";

/**
 * Conversations this account already had, kept as transcripts.
 *
 * These are recordings, not scripts to be re-run. The signed-in user of this
 * prototype has been using Starchild for a while — the agent roster arrives seeded
 * for the same reason — and the thing that is only visible in a history is a
 * pattern: the same favour asked twice, weeks apart, in a conversation nobody
 * would sit and re-type to see.
 *
 * The suggestion at the end of one is written rather than derived, because a
 * recorded conversation is data. Live typing still goes through readRequest, which
 * spots the same pattern on its own.
 */

export type SavedTurn =
  /** the person */
  | { who: "you"; text: string }
  /** Starchild */
  | { who: "ai"; text: string }
  /** a tool being connected mid-task, kept in the transcript because it happened */
  | { who: "connected"; app: ConnectorId; note: string }
  /** time passing between one ask and the next — the whole point of the second one */
  | { who: "gap"; text: string };

export type SavedChat = {
  id: string;
  /** what the sidebar calls it */
  title: string;
  when: string;
  turns: SavedTurn[];
  /**
   * What Starchild noticed, and what it would make. `because` is the sentence that
   * has to be checkable — the person remembers doing the thing it names.
   */
  offer?: {
    because: string;
    name: string;
    role: string;
    tools: ConnectorId[];
    cadence?: string;
  };
};

export const SAVED: SavedChat[] = [
  {
    id: "joao",
    title: "Emails to João",
    when: "Today",
    turns: [
      { who: "you", text: "Send an email to João asking if he can review the deck before Friday." },
      {
        who: "ai",
        text: "Happy to. I'll need your mail for that — connect Gmail and I'll write it and show you before it goes.",
      },
      { who: "connected", app: "gmail", note: "Connected as barbara@starchild.ai" },
      {
        who: "ai",
        text: "Sent. I asked him to look at the deck before Friday and to flag anything he'd change.",
      },

      { who: "gap", text: "Two days later" },

      { who: "you", text: "Send João another email — ask whether he's had a chance to look at the deck yet." },
      { who: "ai", text: "Sent. I kept it short and asked if he's had a look." },
    ],
    offer: {
      because:
        "That's twice now you've asked me to chase João about the deck. I can keep following up on my own until he answers, and stop bothering you about it.",
      name: "João follow-up",
      role: "Keeps checking in until he replies.",
      tools: ["gmail"],
      cadence: "every couple of days",
    },
  },

  // Two one-offs, kept deliberately. A history where every conversation turns into
  // an agent would make the suggestion look like something that happens to
  // everything, and the whole point is that it does not.
  {
    id: "poster",
    title: "Poster for the launch",
    when: "Yesterday",
    turns: [
      { who: "you", text: "Make me a poster for the launch night — something bold and simple." },
      { who: "ai", text: "Here's where I landed. Big type, one image, nothing else competing for it." },
    ],
  },
  {
    id: "build",
    title: "Why the build keeps failing",
    when: "Monday",
    turns: [
      { who: "you", text: "Read through this build log and work out why it keeps failing." },
      {
        who: "ai",
        text: "It's the same step every time — the install runs before the cache is restored, so it never finds the lockfile it expects.",
      },
    ],
  },
];
