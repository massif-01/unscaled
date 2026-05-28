/*
 * Admin — Unscaled Control Panel
 * Owner-only. Manage nav nodes and content items.
 * Access: /admin
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { getLoginUrl } from "@/const";

// ── Shared styles ─────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "oklch(0.98 0.008 85)",
    fontFamily: "var(--font-mono)",
    padding: "clamp(2rem, 5vw, 4rem)",
    color: "oklch(0.15 0.008 60)",
  } as React.CSSProperties,
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    letterSpacing: "0.04em",
    margin: "0 0 0.25rem",
    color: "oklch(0.12 0.008 60)",
  } as React.CSSProperties,
  sub: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    letterSpacing: "0.18em",
    color: "oklch(0.55 0.008 65)",
    textTransform: "uppercase" as const,
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "1.4rem",
    letterSpacing: "0.03em",
    marginBottom: "1rem",
    marginTop: "2.5rem",
    borderBottom: "1px solid oklch(0.88 0.006 65)",
    paddingBottom: "0.4rem",
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "11px",
    letterSpacing: "0.05em",
  },
  th: {
    textAlign: "left" as const,
    padding: "6px 10px",
    borderBottom: "1px solid oklch(0.88 0.006 65)",
    color: "oklch(0.50 0.008 65)",
    textTransform: "uppercase" as const,
    fontSize: "9px",
    letterSpacing: "0.15em",
  },
  td: {
    padding: "8px 10px",
    borderBottom: "1px solid oklch(0.93 0.004 65)",
    verticalAlign: "top" as const,
  },
  btn: (variant: "primary" | "danger" | "ghost" = "ghost") =>
    ({
      fontFamily: "var(--font-mono)",
      fontSize: "9px",
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
      padding: "5px 12px",
      border:
        variant === "primary"
          ? "1px solid var(--signal)"
          : variant === "danger"
            ? "1px solid oklch(0.55 0.18 25)"
            : "1px solid oklch(0.80 0.006 65)",
      background:
        variant === "primary"
          ? "var(--signal)"
          : variant === "danger"
            ? "oklch(0.55 0.18 25)"
            : "transparent",
      color:
        variant === "primary" || variant === "danger"
          ? "white"
          : "oklch(0.40 0.008 65)",
      cursor: "pointer",
      borderRadius: "2px",
      marginRight: "6px",
    }) as React.CSSProperties,
  input: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    padding: "6px 10px",
    border: "1px solid oklch(0.82 0.006 65)",
    background: "white",
    color: "oklch(0.15 0.008 60)",
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  formRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "10px",
    marginBottom: "12px",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "oklch(0.50 0.008 65)",
    marginBottom: "4px",
  } as React.CSSProperties,
};

// ── Nav Nodes Panel ───────────────────────────────────────────────────────────
function NodesPanel() {
  const utils = trpc.useUtils();
  const { data: nodes = [], isLoading } = trpc.nodes.listAll.useQuery();

  const createMut = trpc.nodes.create.useMutation({
    onSuccess: () => utils.nodes.listAll.invalidate(),
  });
  const updateMut = trpc.nodes.update.useMutation({
    onSuccess: () => utils.nodes.listAll.invalidate(),
  });
  const deleteMut = trpc.nodes.delete.useMutation({
    onSuccess: () => utils.nodes.listAll.invalidate(),
  });

  const [form, setForm] = useState({
    label: "",
    url: "",
    icon: "",
    sortOrder: "0",
    visible: true,
    posX: "",
    posY: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const resetForm = () => {
    setForm({
      label: "",
      url: "",
      icon: "",
      sortOrder: "0",
      visible: true,
      posX: "",
      posY: "",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.label || !form.url) {
      setMsg("Label and URL are required.");
      return;
    }
    const payload = {
      label: form.label,
      url: form.url,
      icon: form.icon || undefined,
      sortOrder: parseInt(form.sortOrder) || 0,
      visible: form.visible,
      posX: form.posX || undefined,
      posY: form.posY || undefined,
    };
    try {
      if (editId !== null) {
        await updateMut.mutateAsync({ id: editId, ...payload });
        setMsg("Node updated.");
      } else {
        await createMut.mutateAsync(payload);
        setMsg("Node created.");
      }
      resetForm();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Error");
    }
  };

  const handleEdit = (n: (typeof nodes)[0]) => {
    setEditId(n.id);
    setForm({
      label: n.label,
      url: n.url,
      icon: n.icon ?? "",
      sortOrder: String(n.sortOrder),
      visible: n.visible,
      posX: n.posX ?? "",
      posY: n.posY ?? "",
    });
    setMsg("");
  };

  return (
    <div>
      <div style={S.sectionTitle}>Nav Nodes</div>

      {/* Form */}
      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid oklch(0.90 0.006 65)",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "oklch(0.50 0.008 65)",
            marginBottom: "10px",
          }}
        >
          {editId !== null ? `Editing node #${editId}` : "Add new node"}
        </div>
        <div style={S.formRow}>
          {(["label", "url", "icon", "sortOrder", "posX", "posY"] as const).map(
            f => (
              <div key={f}>
                <label style={S.label}>{f}</label>
                <input
                  style={S.input}
                  value={form[f] as string}
                  onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                  placeholder={
                    f === "posX" || f === "posY" ? "0–1 (optional)" : ""
                  }
                />
              </div>
            )
          )}
          <div>
            <label style={S.label}>Visible</label>
            <select
              style={{ ...S.input, width: "auto" }}
              value={form.visible ? "1" : "0"}
              onChange={e =>
                setForm(p => ({ ...p, visible: e.target.value === "1" }))
              }
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <button style={S.btn("primary")} onClick={handleSubmit}>
          {editId !== null ? "Update" : "Create"}
        </button>
        {editId !== null && (
          <button style={S.btn()} onClick={resetForm}>
            Cancel
          </button>
        )}
        {msg && (
          <span
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              color: "var(--signal)",
            }}
          >
            {msg}
          </span>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ fontSize: "10px", color: "oklch(0.55 0.008 65)" }}>
          Loading…
        </div>
      ) : (
        <table style={S.table}>
          <thead>
            <tr>
              {[
                "ID",
                "Label",
                "URL",
                "Order",
                "Visible",
                "PosX",
                "PosY",
                "Actions",
              ].map(h => (
                <th key={h} style={S.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map(n => (
              <tr key={n.id}>
                <td style={S.td}>{n.id}</td>
                <td style={S.td}>{n.label}</td>
                <td
                  style={{
                    ...S.td,
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.url}
                </td>
                <td style={S.td}>{n.sortOrder}</td>
                <td style={S.td}>{n.visible ? "✓" : "–"}</td>
                <td style={S.td}>{n.posX ?? "–"}</td>
                <td style={S.td}>{n.posY ?? "–"}</td>
                <td style={S.td}>
                  <button style={S.btn()} onClick={() => handleEdit(n)}>
                    Edit
                  </button>
                  <button
                    style={S.btn("danger")}
                    onClick={() => deleteMut.mutate({ id: n.id })}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
            {nodes.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    ...S.td,
                    color: "oklch(0.60 0.008 65)",
                    fontStyle: "italic",
                  }}
                >
                  No nodes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── Content Items Panel ───────────────────────────────────────────────────────
function ContentPanel() {
  const utils = trpc.useUtils();
  const [filterCat, setFilterCat] = useState("");
  const { data: items = [], isLoading } = trpc.content.listAll.useQuery(
    { category: filterCat || undefined },
    { staleTime: 10_000 }
  );

  const createMut = trpc.content.create.useMutation({
    onSuccess: () => utils.content.listAll.invalidate(),
  });
  const updateMut = trpc.content.update.useMutation({
    onSuccess: () => utils.content.listAll.invalidate(),
  });
  const deleteMut = trpc.content.delete.useMutation({
    onSuccess: () => utils.content.listAll.invalidate(),
  });

  const emptyForm = {
    category: "",
    title: "",
    description: "",
    url: "",
    coverUrl: "",
    sortOrder: "0",
    visible: true,
  };
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.category || !form.title) {
      setMsg("Category and title are required.");
      return;
    }
    const payload = {
      category: form.category,
      title: form.title,
      description: form.description || undefined,
      url: form.url || undefined,
      coverUrl: form.coverUrl || undefined,
      sortOrder: parseInt(form.sortOrder) || 0,
      visible: form.visible,
    };
    try {
      if (editId !== null) {
        await updateMut.mutateAsync({ id: editId, ...payload });
        setMsg("Updated.");
      } else {
        await createMut.mutateAsync(payload);
        setMsg("Created.");
      }
      resetForm();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Error");
    }
  };

  const handleEdit = (item: (typeof items)[0]) => {
    setEditId(item.id);
    setForm({
      category: item.category,
      title: item.title,
      description: item.description ?? "",
      url: item.url ?? "",
      coverUrl: item.coverUrl ?? "",
      sortOrder: String(item.sortOrder),
      visible: item.visible,
    });
    setMsg("");
  };

  return (
    <div>
      <div style={S.sectionTitle}>Content Items</div>

      {/* Filter */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ ...S.label, marginBottom: 0 }}>
          Filter by category:
        </label>
        <input
          style={{ ...S.input, width: "160px" }}
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          placeholder="all"
        />
      </div>

      {/* Form */}
      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid oklch(0.90 0.006 65)",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "oklch(0.50 0.008 65)",
            marginBottom: "10px",
          }}
        >
          {editId !== null ? `Editing item #${editId}` : "Add new item"}
        </div>
        <div style={S.formRow}>
          {(["category", "title", "url", "coverUrl", "sortOrder"] as const).map(
            f => (
              <div key={f}>
                <label style={S.label}>{f}</label>
                <input
                  style={S.input}
                  value={form[f] as string}
                  onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                />
              </div>
            )
          )}
          <div>
            <label style={S.label}>Visible</label>
            <select
              style={{ ...S.input, width: "auto" }}
              value={form.visible ? "1" : "0"}
              onChange={e =>
                setForm(p => ({ ...p, visible: e.target.value === "1" }))
              }
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={S.label}>Description</label>
          <textarea
            style={{ ...S.input, minHeight: "60px", resize: "vertical" }}
            value={form.description}
            onChange={e =>
              setForm(p => ({ ...p, description: e.target.value }))
            }
          />
        </div>
        <button style={S.btn("primary")} onClick={handleSubmit}>
          {editId !== null ? "Update" : "Create"}
        </button>
        {editId !== null && (
          <button style={S.btn()} onClick={resetForm}>
            Cancel
          </button>
        )}
        {msg && (
          <span
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              color: "var(--signal)",
            }}
          >
            {msg}
          </span>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ fontSize: "10px", color: "oklch(0.55 0.008 65)" }}>
          Loading…
        </div>
      ) : (
        <table style={S.table}>
          <thead>
            <tr>
              {["ID", "Cat", "Title", "URL", "Order", "Vis", "Actions"].map(
                h => (
                  <th key={h} style={S.th}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={S.td}>{item.id}</td>
                <td style={S.td}>{item.category}</td>
                <td style={{ ...S.td, maxWidth: "200px" }}>{item.title}</td>
                <td
                  style={{
                    ...S.td,
                    maxWidth: "160px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.url ?? "–"}
                </td>
                <td style={S.td}>{item.sortOrder}</td>
                <td style={S.td}>{item.visible ? "✓" : "–"}</td>
                <td style={S.td}>
                  <button style={S.btn()} onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    style={S.btn("danger")}
                    onClick={() => deleteMut.mutate({ id: item.id })}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    ...S.td,
                    color: "oklch(0.60 0.008 65)",
                    fontStyle: "italic",
                  }}
                >
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<"nodes" | "content">("nodes");

  if (loading) {
    return (
      <div
        style={{
          ...S.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "oklch(0.55 0.008 65)",
          }}
        >
          Loading…
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          ...S.page,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            color: "oklch(0.12 0.008 60)",
          }}
        >
          Access Restricted
        </div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "oklch(0.55 0.008 65)",
          }}
        >
          Owner login required
        </div>
        <a
          href={getLoginUrl()}
          style={{
            ...S.btn("primary"),
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Sign In
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div
        style={{
          ...S.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "oklch(0.55 0.008 65)",
          }}
        >
          Forbidden — admin only
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={S.heading}>
            <span
              style={{ fontFamily: "var(--font-wordmark)", fontWeight: 400 }}
            >
              Unscaled
            </span>{" "}
            Admin
          </h1>
          <div style={S.sub}>Control Panel · {user.name ?? user.email}</div>
        </div>
        <a
          href="/"
          style={{
            ...S.btn(),
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          ← Back to site
        </a>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "0.5rem" }}>
        {(["nodes", "content"] as const).map(t => (
          <button
            key={t}
            style={{
              ...S.btn(tab === t ? "primary" : "ghost"),
              marginRight: 0,
            }}
            onClick={() => setTab(t)}
          >
            {t === "nodes" ? "Nav Nodes" : "Content"}
          </button>
        ))}
      </div>

      {tab === "nodes" ? <NodesPanel /> : <ContentPanel />}
    </div>
  );
}
