"use client";

import React from "react";
import { Button } from "@design-system/components/Button/Button";
import { Input } from "@design-system/components/Input/Input";
import { Textarea } from "@design-system/components/Textarea/Textarea";
import { Badge } from "@design-system/components/Badge/Badge";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { RadioButton } from "@design-system/components/RadioButton/RadioButton";
import { ToggleSwitch } from "@design-system/components/ToggleSwitch/ToggleSwitch";
import { ProgressBar } from "@design-system/components/ProgressBar/ProgressBar";
import { Slider } from "@design-system/components/Slider/Slider";
import { Spinner } from "@design-system/components/Spinner/Spinner";
import { Alert } from "@design-system/components/Alert/Alert";
import { Breadcrumb } from "@design-system/components/Breadcrumb/Breadcrumb";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { Table } from "@design-system/components/Table/Table";
import { SelectionCard } from "@design-system/components/SelectionCard/SelectionCard";
import { Accordion } from "@design-system/components/Accordion/Accordion";
import { Instructions } from "@design-system/components/Instructions/Instructions";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import { DropdownMenu, DropdownMenuEntry } from "@design-system/components/DropdownMenu/DropdownMenu";
import { DateInput } from "@design-system/components/DateInput/DateInput";
import styles from "./page.module.css";

/* ============================================
   DEMO DATA
   ============================================ */

const teamMembers = [
  { id: "1", cells: { name: "Alice Chen", role: "Lead Engineer", status: <Badge variant="positive" label="Active" />, joined: "Jan 2023" } },
  { id: "2", cells: { name: "Marcus Webb", role: "Designer", status: <Badge variant="positive" label="Active" />, joined: "Mar 2023" } },
  { id: "3", cells: { name: "Priya Sharma", role: "PM", status: <Badge variant="warning" label="Away" />, joined: "Jun 2023" } },
  { id: "4", cells: { name: "Jake Torres", role: "Backend Dev", status: <Badge variant="neutral" label="Offline" />, joined: "Sep 2023" } },
];

const teamColumns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
  { key: "joined", header: "Joined" },
];

const fileMenuItems: DropdownMenuEntry[] = [
  { label: "New project", icon: "add", shortcut: "⌘ N", onClick: () => {} },
  { label: "Open recent", icon: "history", onClick: () => {} },
  { label: "Import", icon: "upload", onClick: () => {} },
  { type: "separator" },
  { label: "Export as PDF", icon: "picture_as_pdf", onClick: () => {} },
  { label: "Export as CSV", icon: "table_chart", onClick: () => {} },
  { type: "separator" },
  { label: "Delete project", icon: "delete", destructive: true, onClick: () => {} },
];

export default function TestPage() {
  return (
    <div className={styles.collage}>

      {/* ============================================
         ROW 1 — Profile Card + Create Project + Stats
         ============================================ */}

      {/* Profile card */}
      <div className={styles.panel}>
        <div className={styles.row}>
          <div className={styles.avatar}>AC</div>
          <div className={styles.colTight}>
            <span className={styles.panelHeading}>Alice Chen</span>
            <span className={styles.meta}>Lead Engineer</span>
          </div>
        </div>
        <div className={styles.sep} />
        <div className={styles.colTight}>
          <span className={styles.meta}>alice@acme.io</span>
          <span className={styles.meta}>San Francisco, CA</span>
        </div>
        <Button label="Edit profile" priority="secondary" state="default" iconLeft="edit" size="compact" />
      </div>

      {/* Create project form */}
      <div className={`${styles.panel} ${styles.span2}`}>
        <span className={styles.panelHeading}>Create Project</span>
        <span className={styles.panelDescription}>Set up a new workspace for your team.</span>
        <Input label="Project name" placeholder="e.g. Marketing site redesign" />
        <div className={styles.row}>
          <div style={{ flex: 1 }}>
            <Dropdown
              label="Category"
              options={[
                { value: "engineering", label: "Engineering" },
                { value: "design", label: "Design" },
                { value: "marketing", label: "Marketing" },
              ]}
              placeholder="Select category"
            />
          </div>
          <div style={{ flex: 1 }}>
            <DateInput label="Start date" placeholder="dd/mm/yyyy" />
          </div>
        </div>
        <div className={styles.row}>
          <Button label="Create" priority="primary" state="default" iconLeft="add" />
          <Button label="Cancel" priority="secondary" state="default" />
        </div>
      </div>

      {/* Quick stats */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Overview</span>
        <div className={styles.colTight}>
          <span className={styles.stat}>142</span>
          <span className={styles.meta}>Active projects</span>
        </div>
        <div className={styles.sep} />
        <div className={styles.colTight}>
          <span className={styles.stat}>89%</span>
          <span className={styles.meta}>Sprint completion</span>
        </div>
        <div className={styles.sep} />
        <ProgressBar value={89} />
      </div>

      {/* ============================================
         ROW 2 — Team Table (wide) + Selection Card
         ============================================ */}

      {/* Team table */}
      <div className={`${styles.panel} ${styles.span3}`}>
        <div className={styles.rowSpaced}>
          <span className={styles.panelHeading}>Team Members</span>
          <div className={styles.row}>
            <Button label="Invite" priority="primary" state="default" iconLeft="person_add" size="compact" />
            <DropdownMenu
              trigger={<CircularButton icon="more_horiz" ariaLabel="More actions" priority="secondary" size="compact" />}
              items={fileMenuItems}
              size="compact"
            />
          </div>
        </div>
        <Table
          columns={teamColumns}
          rows={teamMembers}
          size="compact"
          caption="Team members"
          captionHidden
        />
      </div>

      {/* Environment selection */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Environment</span>
        <span className={styles.panelDescription}>Choose your deployment target.</span>
        <SelectionCard
          mode="radio"
          name="Deploy target"
          value="staging"
          options={[
            { value: "staging", label: "Staging", description: "Test before going live." },
            { value: "production", label: "Production", description: "Ship to all users." },
          ]}
        />
      </div>

      {/* ============================================
         ROW 3 — Settings + Notifications + Deploy
         ============================================ */}

      {/* Appearance settings */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Appearance</span>
        <SegmentedControl
          segments={[
            { label: "Light", value: "light", icon: "light_mode" },
            { label: "Dark", value: "dark", icon: "dark_mode" },
            { label: "System", value: "system", icon: "desktop_windows" },
          ]}
          activeSegment="dark"
          size="compact"
        />
        <div className={styles.sep} />
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>Sidebar compact</span>
          <ToggleSwitch checked={true} showLabel={false} ariaLabel="Compact sidebar" size="compact" />
        </div>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>Animations</span>
          <ToggleSwitch checked={true} showLabel={false} ariaLabel="Animations" size="compact" />
        </div>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>Dense tables</span>
          <ToggleSwitch checked={false} showLabel={false} ariaLabel="Dense tables" size="compact" />
        </div>
      </div>

      {/* Notifications */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Notifications</span>
        <Checkbox label="Email digest" checked={true} onChange={() => {}} />
        <Checkbox label="Push notifications" checked={true} onChange={() => {}} />
        <Checkbox label="Slack integration" checked={false} onChange={() => {}} />
        <div className={styles.sep} />
        <span className={styles.panelDescription}>Frequency</span>
        <RadioButton label="Instant" checked={true} onChange={() => {}} />
        <RadioButton label="Daily summary" checked={false} onChange={() => {}} />
      </div>

      {/* Deploy pipeline */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Deploy Pipeline</span>
        <Instructions
          steps={[
            { label: "Build", description: "Compile assets" },
            { label: "Test", description: "Run test suite" },
            { label: "Stage", description: "Deploy to staging" },
            { label: "Release", description: "Ship to production" },
          ]}
          numbered
          size="compact"
        />
      </div>

      {/* Feedback form */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Feedback</span>
        <span className={styles.panelDescription}>Help us improve your experience.</span>
        <Textarea placeholder="What could we do better?" />
        <div className={styles.row}>
          <Button label="Submit" priority="primary" state="default" size="compact" iconLeft="send" />
          <Button label="Cancel" priority="secondary" state="default" size="compact" />
        </div>
      </div>

      {/* ============================================
         ROW 4 — Alerts + Storage + Breadcrumbs + Actions
         ============================================ */}

      {/* Alerts stack */}
      <div className={`${styles.panel} ${styles.span2}`}>
        <span className={styles.panelHeading}>Recent Alerts</span>
        <Alert variant="positive" title="Deployment successful" description="v2.4.1 is live on production." size="compact" />
        <Alert variant="warning" title="Storage at 82%" description="Consider upgrading your plan." size="compact" />
        <Alert variant="error" title="Build failed" description="Tests failing in auth module." size="compact" />
      </div>

      {/* Storage usage + quick actions */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Storage</span>
        <div className={styles.colTight}>
          <span className={styles.stat}>4.2 GB</span>
          <span className={styles.meta}>of 10 GB used</span>
        </div>
        <Slider value={42} />
        <div className={styles.rowWrap}>
          <Badge variant="info" label="Assets: 2.1 GB" />
          <Badge variant="neutral" label="Logs: 1.4 GB" />
          <Badge variant="warning" label="Backups: 0.7 GB" />
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Quick Actions</span>
        <Breadcrumb items={[
          { label: "Dashboard", href: "#" },
          { label: "Projects", href: "#" },
          { label: "Acme Corp" },
        ]} />
        <div className={styles.sep} />
        <ButtonGroup
          buttons={[
            { label: "Archive", iconLeft: "archive", priority: "secondary", state: "default" },
            { label: "Report", iconLeft: "assessment", priority: "secondary", state: "default" },
            { label: "Delete", iconLeft: "delete", priority: "destructive", state: "default" },
          ]}
        />
        <div className={styles.sep} />
        <Tabs
          tabs={[
            { label: "Overview", value: "overview" },
            { label: "Activity", value: "activity" },
            { label: "Files", value: "files" },
          ]}
          activeTab="overview"
          size="compact"
          onTabChange={() => {}}
        />
      </div>

      {/* ============================================
         ROW 5 — FAQ + Processing + Badge/Button row
         ============================================ */}

      {/* FAQ accordion */}
      <div className={`${styles.panel} ${styles.span2}`}>
        <span className={styles.panelHeading}>FAQ</span>
        <Accordion
          items={[
            { id: "1", title: "How do I reset my password?", content: "Go to Settings → Security → Reset password. You'll receive a confirmation email within 5 minutes." },
            { id: "2", title: "Can I change my plan later?", content: "Yes, you can upgrade or downgrade at any time from the Billing page. Changes take effect immediately." },
            { id: "3", title: "Is there a free trial?", content: "All new accounts get a 14-day free trial of the Pro plan with full access to all features." },
          ]}
        />
      </div>

      {/* Processing state */}
      <div className={styles.panel} style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Spinner size="lg" />
        <span className={styles.panelHeading}>Processing</span>
        <span className={styles.panelDescription}>Generating your report. This may take a moment.</span>
        <Button label="Cancel" priority="destructive" state="default" size="compact" />
      </div>

      {/* Badges + status row */}
      <div className={styles.panel}>
        <span className={styles.panelHeading}>Service Status</span>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>API</span>
          <Badge variant="positive" label="Operational" />
        </div>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>Database</span>
          <Badge variant="positive" label="Operational" />
        </div>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>CDN</span>
          <Badge variant="warning" label="Degraded" />
        </div>
        <div className={styles.rowSpaced}>
          <span className={styles.panelDescription}>Webhooks</span>
          <Badge variant="error" label="Outage" />
        </div>
        <div className={styles.sep} />
        <span className={styles.meta}>Last checked 2 min ago</span>
      </div>
    </div>
  );
}
