import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { addComment, listComments, supabaseConfigured, type Comment } from "../lib/supabase";

// Drop this into whatever page the comments belong on. It handles the whole thing:
// asking for the shared password, remembering it for the session, listing what's
// there and taking new ones.
//
// The password is never checked here — it's sent to the database with every call,
// and the database is what says yes or no. A wrong one comes back as an error, so
// there is nothing in the bundle worth reading.
const PASSWORD_KEY = "starchild.comments.password";
const NAME_KEY = "starchild.comments.name";

function timeAgo(iso: string) {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function CommentsPanel({
  topic,
  heading = "Comments",
  intro,
}: {
  /** scopes the thread — leave unset while there is only one of them */
  topic?: string;
  heading?: string;
  intro?: string;
}) {
  const [password, setPassword] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlock(candidate: string, silent = false) {
    setLoading(true);
    setError(null);
    try {
      setComments(await listComments(candidate, topic));
      setPassword(candidate);
      sessionStorage.setItem(PASSWORD_KEY, candidate);
    } catch (e) {
      sessionStorage.removeItem(PASSWORD_KEY);
      if (!silent) setError(readableError(e));
    } finally {
      setLoading(false);
    }
  }

  // a password that already worked once shouldn't be asked for again this session
  useEffect(() => {
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) void unlock(saved, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!supabaseConfigured) {
    return (
      <Frame heading={heading}>
        <p className="text-[13px] text-white/45" style={{ fontFamily: "var(--font-google-sans)" }}>
          Comments are not configured yet — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
        </p>
      </Frame>
    );
  }

  if (!password) {
    return (
      <Frame heading={heading} intro={intro}>
        <PasswordGate loading={loading} error={error} onSubmit={(value) => void unlock(value)} />
      </Frame>
    );
  }

  return (
    <Frame heading={heading} intro={intro}>
      <CommentForm
        password={password}
        topic={topic}
        onAdded={(fresh) => setComments((prev) => [fresh, ...prev])}
      />

      <div className="mt-8 flex flex-col gap-6">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-[13.5px] font-medium text-white/90"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {comment.author}
                </span>
                <span
                  className="text-[11.5px] text-white/30"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {timeAgo(comment.created_at)}
                </span>
              </div>
              <p
                className="mt-1.5 text-[13.5px] leading-relaxed whitespace-pre-wrap text-white/65"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {comment.body}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="text-[13px] text-white/35" style={{ fontFamily: "var(--font-google-sans)" }}>
            Nothing here yet. Yours would be the first.
          </p>
        )}
      </div>
    </Frame>
  );
}

function Frame({
  heading,
  intro,
  children,
}: {
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[620px]">
      <h2 className="text-[18px] font-semibold text-white" style={{ fontFamily: "var(--font-google-sans)" }}>
        {heading}
      </h2>
      {intro && (
        <p
          className="mt-1.5 text-[13px] leading-relaxed text-white/50"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {intro}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PasswordGate({
  loading,
  error,
  onSubmit,
}: {
  loading: boolean;
  error: string | null;
  onSubmit: (password: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
      className="flex flex-col gap-3"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        className="w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="self-start rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        {loading ? "Checking…" : "Continue"}
      </button>
      {error && (
        <p className="text-[12.5px] text-[#ff7a4d]" style={{ fontFamily: "var(--font-google-sans)" }}>
          {error}
        </p>
      )}
    </form>
  );
}

function CommentForm({
  password,
  topic,
  onAdded,
}: {
  password: string;
  topic?: string;
  onAdded: (comment: Comment) => void;
}) {
  const [author, setAuthor] = useState(() => localStorage.getItem(NAME_KEY) ?? "");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = author.trim() !== "" && body.trim() !== "" && !sending;

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setSending(true);
    setError(null);
    try {
      onAdded(await addComment(password, author.trim(), body.trim(), topic));
      localStorage.setItem(NAME_KEY, author.trim());
      setBody("");
    } catch (err) {
      setError(readableError(err));
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={send}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        maxLength={60}
        className="w-full bg-transparent text-[13.5px] font-medium text-white placeholder:text-white/35 focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Leave a comment…"
        rows={3}
        maxLength={4000}
        className="w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-white placeholder:text-white/35 focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
      />
      <div className="flex items-center justify-between gap-3">
        {error ? (
          <p className="text-[12px] text-[#ff7a4d]" style={{ fontFamily: "var(--font-google-sans)" }}>
            {error}
          </p>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-opacity disabled:opacity-40"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {sending ? "Sending…" : "Post"}
        </button>
      </div>
    </form>
  );
}

// the database raises 28000 for a bad password; everything else is a real fault
function readableError(e: unknown) {
  const message = e instanceof Error ? e.message : String(e);
  if (/wrong password/i.test(message)) return "That password doesn't work.";
  return "Something went wrong. Try again in a moment.";
}
