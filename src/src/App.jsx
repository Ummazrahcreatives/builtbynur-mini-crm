import { useState } from "react";

const STATUSES = ["New", "Contacted", "Qualified", "Converted"];

const SAMPLE_LEADS = [
  { id: 1, name: "Amina Rahman", company: "Sunrise Bakery", email: "amina@example.com", status: "New" },
  { id: 2, name: "Daniel Cruz", company: "Bright Path Tutoring", email: "daniel@example.com", status: "Contacted" },
  { id: 3, name: "Sofia Lim", company: "Petal & Co Florals", email: "sofia@example.com", status: "Qualified" },
  { id: 4, name: "Omar Haddad", company: "Cedar Fitness", email: "omar@example.com", status: "Converted" },
  { id: 5, name: "Grace Tan", company: "Lumen Photography", email: "grace@example.com", status: "New" },
];

const EMPTY_FORM = { name: "", company: "", email: "", status: "New" };

export default function App() {
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "New").length;
  const convertedCount = leads.filter((l) => l.status === "Converted").length;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) return;
    setLeads([{ id: Date.now(), ...form }, ...leads]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function updateStatus(id, status) {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  return (
    <div className="layout">
      <header className="topbar">
        <h1 className="brand">BuiltbyNur</h1>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <aside className={menuOpen ? "sidebar open" : "sidebar"}>
        <h1 className="brand desktop-only">BuiltbyNur</h1>
        <nav>
          <a className="nav-link active" href="#dashboard">Dashboard</a>
          <a className="nav-link" href="#leads">Leads</a>
        </nav>
      </aside>

      <main className="content" id="dashboard">
        <h2>Mini CRM Dashboard</h2>
        <p className="subtitle">Sample data only. Refreshing the page resets it.</p>

        <section className="cards">
          <div className="card">
            <span className="card-label">Total Leads</span>
            <span className="card-number">{total}</span>
          </div>
          <div className="card">
            <span className="card-label">New Leads</span>
            <span className="card-number">{newCount}</span>
          </div>
          <div className="card">
            <span className="card-label">Converted Leads</span>
            <span className="card-number">{convertedCount}</span>
          </div>
        </section>

        <section className="panel" id="leads">
          <div className="panel-header">
            <h3>Leads</h3>
            <button className="btn" onClick={() => setShowForm(true)}>
              + Add Lead
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td>{lead.email}</td>
                    <td>
                      <select
                        className={"status " + lead.status.toLowerCase()}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <form
            className="modal"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Add a New Lead</h3>

            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Maya Reyes" />

            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Sample Studio" />

            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="maya@example.com" />

            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div className="form-actions">
              <button type="button" className="btn ghost" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn">Save Lead</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
          }
