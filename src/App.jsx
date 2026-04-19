import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";


const student = {
  name: "Shekhar Suman",
  program: "BCA",
  year: "2025",
  id: "STU2024001",
  email: "shekharsuman@university.edu",
  phone: "123-4567",
  about: "Passionate about web development and full-stack projects.",
  gpa: 9.1,
  avatar: "https://i.pravatar.cc/80?img=12",
};

const courses = [
  { name: "Programming in C",    instructor: "Dr. Nancy",   credits: 4, progress: 92, grade: "A"  },
  { name: "Database Management", instructor: "Dr. Mohan",   credits: 3, progress: 88, grade: "A+" },
  { name: "Computer Networks",   instructor: "Dr. Anshika", credits: 3, progress: 85, grade: "B+" },
  { name: "Web Technologies",    instructor: "Dr. Gyan",    credits: 4, progress: 87, grade: "A"  },
  { name: "Software Engineering",instructor: "Dr. Prahlad", credits: 3, progress: 94, grade: "A+" },
];

const deadlines = [
  { title: "Math Quiz",      due: "Tomorrow", urgent: true  },
  { title: "Project Report", due: "2 days",   urgent: false },
  { title: "Web Dev Lab",    due: "1 week",   urgent: false },
];

const recentActivity = [
  "Created IT Assignment",
  "80% on Biology Test",
  "Joined Class: Modern with Art",
];

const gradeData = [
  { name: "A+", value: 2, color: "#3b82f6" },
  { name: "A",  value: 2, color: "#10b981" },
  { name: "B+", value: 1, color: "#f59e0b" },
];

// ─── November 2024 Calendar ───────────────────────────────────────────────────

const buildCalendar = () => {
  const cells = [];
  const firstDay = 5; // November 1 2024 = Friday (0=Sun … 6=Sat)
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= 30; d++) {
    cells.push({ day: d, status: d === 15 ? "absent" : d <= 29 ? "present" : "future" });
  }
  return cells;
};

const calendarDays = buildCalendar();
const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard",  label: "Dashboard",  icon: "⊞" },
  { id: "profile",    label: "Profile",    icon: "👤" },
  { id: "courses",    label: "Courses",    icon: "📚" },
  { id: "grades",     label: "Grades",     icon: "📊" },
  { id: "attendance", label: "Attendance", icon: "📅" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function ProgressBar({ pct }) {
  return (
    <div style={{ background: "#e2e8f0", borderRadius: 6, height: 8, width: "100%" }}>
      <div
        style={{
          background: "#3b82f6",
          width: `${pct}%`,
          height: "100%",
          borderRadius: 6,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#1e3a5f" }}>
      {children}
    </h3>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Dashboard Overview</h1>
      <p style={styles.pageSubtitle}>Welcome back, {student.name}</p>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Tasks Complete", value: "5",  icon: "✅" },
          { label: "Courses",        value: "9",  icon: "📚" },
          { label: "Attendance %",   value: "95", icon: "📅" },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            style={{
              flex: 1, minWidth: 140, background: "white", borderRadius: 14,
              padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#1e3a5f" }}>{value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{label}</div>
            </div>
            <div style={{
              width: 42, height: 42, borderRadius: 10, background: "#eff6ff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            }}>
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card style={{ flex: 1, minWidth: 220 }}>
          <SectionTitle>Upcoming Deadlines</SectionTitle>
          {deadlines.map((d) => (
            <div
              key={d.title}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span style={{ fontSize: 14, color: "#334155" }}>{d.title}</span>
              <span style={{
                fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                background: d.urgent ? "#fef2f2" : "#f0fdf4",
                color: d.urgent ? "#dc2626" : "#16a34a",
              }}>
                {d.due}
              </span>
            </div>
          ))}
        </Card>

        <Card style={{ flex: 1, minWidth: 220 }}>
          <SectionTitle>Recent Activity</SectionTitle>
          {recentActivity.map((a) => (
            <div
              key={a}
              style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                padding: "9px 0", borderBottom: "1px solid #f1f5f9",
                fontSize: 14, color: "#334155",
              }}
            >
              <span style={{ color: "#3b82f6", marginTop: 1 }}>•</span>
              {a}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h1 style={styles.pageTitle}>My Profile</h1>
      <p style={styles.pageSubtitle}>Manage your personal information</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Info Card */}
        <Card style={{ flex: 1.2, minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <img
              src={student.avatar}
              alt="avatar"
              style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid #3b82f6" }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#1e3a5f" }}>{student.name}</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>{student.program}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{student.year}</div>
            </div>
          </div>
          {[
            { label: "Student ID", value: student.id    },
            { label: "Email",      value: student.email },
            { label: "Phone",      value: student.phone },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: 11, color: "#94a3b8", marginBottom: 4,
                fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                {label}
              </div>
              <div style={{ fontSize: 14, color: "#334155" }}>{value}</div>
            </div>
          ))}
        </Card>

        {/* About Card */}
        <Card style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <SectionTitle>About Me</SectionTitle>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{student.about}</p>
          </div>
          <button style={styles.primaryBtn}>Edit Profile</button>
        </Card>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <h1 style={styles.pageTitle}>My Courses</h1>
      <p style={styles.pageSubtitle}>2025 Semester</p>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
              {["Course", "Instructor", "Credits", "Progress", "Grade", "Action"].map((h) => (
                <th key={h} style={{
                  padding: "14px 18px", textAlign: "left",
                  fontSize: 12, color: "#94a3b8", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr
                key={c.name}
                style={{
                  borderBottom: i < courses.length - 1 ? "1px solid #f8fafc" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "14px 18px", fontWeight: 600, color: "#1e3a5f", fontSize: 14 }}>
                  {c.name}
                </td>
                <td style={{ padding: "14px 18px", color: "#64748b", fontSize: 14 }}>{c.instructor}</td>
                <td style={{ padding: "14px 18px", color: "#64748b", fontSize: 14 }}>{c.credits}</td>
                <td style={{ padding: "14px 18px", minWidth: 130 }}>
                  <ProgressBar pct={c.progress} />
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{
                    background: "#eff6ff", color: "#2563eb",
                    fontWeight: 700, padding: "3px 10px", borderRadius: 6, fontSize: 13,
                  }}>
                    {c.grade}
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <button style={styles.outlineBtn}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Grades() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Analytics</h1>
      <p style={styles.pageSubtitle}>GPA: {student.gpa} (2025)</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card style={{ flex: 1, minWidth: 240 }}>
          <SectionTitle>Grade Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gradeData} dataKey="value" cx="50%" cy="50%" outerRadius={85} innerRadius={48}>
                {gradeData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ flex: 1.4, minWidth: 260 }}>
          <SectionTitle>Subject Grades</SectionTitle>
          {courses.map((c) => (
            <div key={c.name} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: "#334155" }}>{c.name}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1e3a5f" }}>{c.progress}%</span>
              </div>
              <ProgressBar pct={c.progress} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Attendance() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Attendance</h1>
      <p style={styles.pageSubtitle}>November 2024</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Summary */}
        <Card style={{ flex: "0 0 auto", minWidth: 200, textAlign: "center" }}>
          <SectionTitle>Attendance Summary</SectionTitle>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#10b981", lineHeight: 1 }}>95%</div>
          <div style={{ color: "#64748b", fontSize: 14, margin: "6px 0 20px" }}>Overall</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {[
              { count: 28, label: "Present", bg: "#f0fdf4", color: "#16a34a" },
              { count: 1,  label: "Absent",  bg: "#fef2f2", color: "#dc2626" },
            ].map(({ count, label, bg, color }) => (
              <div key={label} style={{ background: bg, borderRadius: 10, padding: "10px 20px" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color }}>{count}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Calendar */}
        <Card style={{ flex: 1, minWidth: 280 }}>
          <SectionTitle>Monthly Calendar</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {DAY_NAMES.map((d, i) => (
              <div key={i} style={{
                textAlign: "center", fontSize: 12, fontWeight: 600,
                color: "#94a3b8", padding: "4px 0",
              }}>
                {d}
              </div>
            ))}
            {calendarDays.map((cell, i) => (
              <div
                key={i}
                style={{
                  height: 34, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 500,
                  background: !cell ? "transparent"
                    : cell.status === "absent"  ? "#fecaca"
                    : cell.status === "present" ? "#bbf7d0"
                    : "#f1f5f9",
                  color: !cell ? "transparent"
                    : cell.status === "absent"  ? "#dc2626"
                    : cell.status === "present" ? "#15803d"
                    : "#94a3b8",
                }}
              >
                {cell ? cell.day : ""}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {[
              { color: "#bbf7d0", label: "Present" },
              { color: "#fecaca", label: "Absent"  },
              { color: "#f1f5f9", label: "Future"  },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b" }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
                {label}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#1e3a5f", margin: 0 },
  pageSubtitle: { color: "#64748b", marginTop: 4, marginBottom: 24 },
  primaryBtn: {
    marginTop: 24, background: "#3b82f6", color: "white",
    border: "none", padding: "10px 20px", borderRadius: 8,
    fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%",
  },
  outlineBtn: {
    background: "none", border: "1px solid #3b82f6", color: "#3b82f6",
    padding: "5px 12px", borderRadius: 6, fontSize: 13, cursor: "pointer",
    fontWeight: 500,
  },
};

// ─── Root App ─────────────────────────────────────────────────────────────────

const PAGE_MAP = {
  dashboard:  <Dashboard  />,
  profile:    <Profile    />,
  courses:    <Courses    />,
  grades:     <Grades     />,
  attendance: <Attendance />,
};

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#dbeafe" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 210, background: "#1e3a5f", color: "white",
        display: "flex", flexDirection: "column", padding: "28px 0", flexShrink: 0,
      }}>
        <div style={{ padding: "0 20px 28px" }}>
          <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>
            Student<br />Dashboard
          </div>
          <div style={{ fontSize: 12, color: "#93c5fd", marginTop: 6 }}>Welcome back!</div>
        </div>

        <nav>
          {NAV.map(({ id, label, icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "11px 20px", border: "none",
                  background: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "white" : "#93c5fd",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14, cursor: "pointer", textAlign: "left",
                  borderRadius: isActive ? "0 8px 8px 0" : 0,
                  marginRight: isActive ? 8 : 0,
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto" }}>
        {PAGE_MAP[active]}
      </main>
    </div>
  );
}