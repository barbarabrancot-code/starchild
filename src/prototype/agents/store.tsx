import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AGENTS, type Agent } from "./agentsData";
import { INITIAL_CONNECTIONS, type Connection, type ConnectorId } from "./connectors";

/**
 * One place for both halves of the domain, because they only mean anything
 * together: what the account has connected, and which agents are allowed to use
 * it. "Used by" is derived from the roster rather than stored on the connection —
 * two lists that have to agree with each other is how they stop agreeing.
 */

type Store = {
  roster: Agent[];
  connections: Connection[];

  isConnected: (id: ConnectorId) => boolean;
  connectionFor: (id: ConnectorId) => Connection | undefined;
  /** which agents currently have this one enabled */
  usedBy: (id: ConnectorId) => Agent[];

  /** authenticate for the account — once, ever */
  connect: (id: ConnectorId) => void;
  /** and drop it everywhere, because a connection nobody can use is a lie */
  disconnect: (id: ConnectorId) => void;

  /** grant or revoke for one agent. Never touches the account connection. */
  setAgentTools: (agentId: string, tools: ConnectorId[]) => void;

  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, change: (a: Agent) => Agent) => void;
};

const Ctx = createContext<Store | null>(null);

export function AgentsProvider({
  /** the prototype's "brand new account" switch — see AgentsWorkspace */
  empty = false,
  children,
}: {
  empty?: boolean;
  children: ReactNode;
}) {
  const [roster, setRoster] = useState<Agent[]>(empty ? [] : AGENTS);
  const [connections, setConnections] = useState<Connection[]>(empty ? [] : INITIAL_CONNECTIONS);

  const isConnected = useCallback(
    (id: ConnectorId) => connections.some((c) => c.id === id),
    [connections],
  );

  const connectionFor = useCallback(
    (id: ConnectorId) => connections.find((c) => c.id === id),
    [connections],
  );

  const usedBy = useCallback(
    (id: ConnectorId) => roster.filter((a) => a.tools.includes(id)),
    [roster],
  );

  const connect = useCallback((id: ConnectorId) => {
    setConnections((prev) =>
      prev.some((c) => c.id === id)
        ? prev
        : [...prev, { id, account: "barbara@starchild.ai", since: "connected just now" }],
    );
  }, []);

  // Disconnecting has to reach into every agent that was using it. Leaving a
  // revoked connector ticked on an agent would show a permission that no longer
  // exists, which is worse than the disruption of removing it.
  const disconnect = useCallback((id: ConnectorId) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
    setRoster((prev) => prev.map((a) => ({ ...a, tools: a.tools.filter((t) => t !== id) })));
  }, []);

  const setAgentTools = useCallback((agentId: string, tools: ConnectorId[]) => {
    setRoster((prev) => prev.map((a) => (a.id === agentId ? { ...a, tools } : a)));
  }, []);

  const addAgent = useCallback((agent: Agent) => setRoster((prev) => [agent, ...prev]), []);

  const updateAgent = useCallback(
    (id: string, change: (a: Agent) => Agent) =>
      setRoster((prev) => prev.map((a) => (a.id === id ? change(a) : a))),
    [],
  );

  const value = useMemo(
    () => ({
      roster, connections, isConnected, connectionFor, usedBy,
      connect, disconnect, setAgentTools, addAgent, updateAgent,
    }),
    [roster, connections, isConnected, connectionFor, usedBy, connect, disconnect, setAgentTools, addAgent, updateAgent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAgents() {
  const store = useContext(Ctx);
  if (!store) throw new Error("useAgents must be used inside <AgentsProvider>");
  return store;
}
