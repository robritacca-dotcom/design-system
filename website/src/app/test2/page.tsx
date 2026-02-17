"use client";

import React from "react";
import { Button } from "@design-system/components/Button/Button";
import { Input } from "@design-system/components/Input/Input";
import { Badge } from "@design-system/components/Badge/Badge";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { Table } from "@design-system/components/Table/Table";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import { DropdownMenu, DropdownMenuEntry } from "@design-system/components/DropdownMenu/DropdownMenu";
import styles from "./page.module.css";

/* ============================================
   STATUS & PRIORITY HELPERS
   ============================================ */

type TaskStatus = "In Progress" | "Backlog" | "Todo" | "Done" | "Cancelled";
type TaskPriority = "High" | "Medium" | "Low";
type TaskType = "Documentation" | "Feature" | "Bug";

const statusIcons: Record<TaskStatus, string> = {
  "In Progress": "pending",
  Backlog: "radio_button_unchecked",
  Todo: "circle",
  Done: "check_circle",
  Cancelled: "cancel",
};

const priorityIcons: Record<TaskPriority, string> = {
  High: "arrow_upward",
  Medium: "arrow_forward",
  Low: "arrow_downward",
};

const typeBadgeVariant: Record<TaskType, "info" | "positive" | "error"> = {
  Documentation: "info",
  Feature: "positive",
  Bug: "error",
};

/* ============================================
   ROW ACTION MENU
   ============================================ */

const rowActions: DropdownMenuEntry[] = [
  { label: "Edit", icon: "edit", onClick: () => {} },
  { label: "Make a copy", icon: "content_copy", onClick: () => {} },
  { label: "Favourite", icon: "star", onClick: () => {} },
  { type: "separator" },
  { label: "Labels", icon: "label", onClick: () => {} },
  { type: "separator" },
  { label: "Delete", icon: "delete", destructive: true, onClick: () => {} },
];

/* ============================================
   CELL RENDERERS
   ============================================ */

function StatusCell({ status }: { status: TaskStatus }) {
  return (
    <span className={styles.statusCell}>
      <span className={`material-symbols-rounded ${styles.statusIcon}`}>
        {statusIcons[status]}
      </span>
      <span className={styles.statusText}>{status}</span>
    </span>
  );
}

function PriorityCell({ priority }: { priority: TaskPriority }) {
  return (
    <span className={styles.priorityCell}>
      <span className={`material-symbols-rounded ${styles.priorityIcon}`}>
        {priorityIcons[priority]}
      </span>
      <span className={styles.priorityText}>{priority}</span>
    </span>
  );
}

function TitleCell({ type, title }: { type: TaskType; title: string }) {
  return (
    <span className={styles.titleCell}>
      <Badge variant={typeBadgeVariant[type]} label={type} />
      <span className={styles.titleText}>{title}</span>
    </span>
  );
}

function ActionsCell() {
  return (
    <DropdownMenu
      trigger={
        <CircularButton
          icon="more_horiz"
          ariaLabel="Row actions"
          priority="secondary"
          size="compact"
        />
      }
      items={rowActions}
      align="end"
      size="compact"
    />
  );
}

/* ============================================
   DEMO DATA — 20 realistic tasks
   ============================================ */

interface TaskData {
  id: string;
  taskId: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const tasks: TaskData[] = [
  { id: "1", taskId: "TASK-8782", type: "Documentation", title: "You can't compress the program without quantifying the open-source SSD pixel!", status: "In Progress", priority: "Medium" },
  { id: "2", taskId: "TASK-7878", type: "Documentation", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
  { id: "3", taskId: "TASK-7839", type: "Bug", title: "We need to bypass the neural TCP card!", status: "Todo", priority: "High" },
  { id: "4", taskId: "TASK-5562", type: "Feature", title: "The SAS interface is down, bypass the open-source sensor so we can get the HTTP bandwidth!", status: "Backlog", priority: "Medium" },
  { id: "5", taskId: "TASK-8686", type: "Feature", title: "I'll parse the wireless SSL protocol, that should driver the API panel!", status: "Cancelled", priority: "Medium" },
  { id: "6", taskId: "TASK-1280", type: "Bug", title: "Use the digital TLS panel, then you can transmit the haptic system!", status: "Done", priority: "High" },
  { id: "7", taskId: "TASK-7262", type: "Feature", title: "The UTF8 application is down, parse the neural bandwidth so we can get the SMTP protocol!", status: "Done", priority: "High" },
  { id: "8", taskId: "TASK-1138", type: "Feature", title: "Generating the driver won't do anything, we need to quantify the 1080p HDD transmitter!", status: "In Progress", priority: "Medium" },
  { id: "9", taskId: "TASK-7184", type: "Bug", title: "We need to program the back-end HTTP bandwidth!", status: "Todo", priority: "Low" },
  { id: "10", taskId: "TASK-5160", type: "Documentation", title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!", status: "In Progress", priority: "High" },
  { id: "11", taskId: "TASK-5618", type: "Documentation", title: "Generating the driver won't do anything, we need to parse the bluetooth PNG bus!", status: "Done", priority: "Medium" },
  { id: "12", taskId: "TASK-6699", type: "Feature", title: "I'll compress the virtual SSL panel, that should controller the JBOD sensor!", status: "Backlog", priority: "High" },
  { id: "13", taskId: "TASK-2974", type: "Bug", title: "Use the redundant SCSI application, then you can override the wireless interface!", status: "In Progress", priority: "Low" },
  { id: "14", taskId: "TASK-1721", type: "Feature", title: "The RSS feed is down, copy the neural hard drive so we can parse the TCP firewall!", status: "Todo", priority: "Low" },
  { id: "15", taskId: "TASK-5090", type: "Bug", title: "Indexing the card won't do anything, we need to navigate the auxiliary XML pixel!", status: "Done", priority: "Medium" },
  { id: "16", taskId: "TASK-4682", type: "Documentation", title: "If we generate the sensor, we can get to the TCP bus through the virtual HTTP panel!", status: "Backlog", priority: "Low" },
  { id: "17", taskId: "TASK-9221", type: "Feature", title: "We need to calculate the mobile IB capacitor!", status: "In Progress", priority: "High" },
  { id: "18", taskId: "TASK-3602", type: "Bug", title: "Try to override the SMTP transmitter, maybe it will generate the optical matrix!", status: "Todo", priority: "Medium" },
  { id: "19", taskId: "TASK-4193", type: "Feature", title: "Parsing the firewall won't do anything, we need to copy the cross-platform SSD monitor!", status: "Cancelled", priority: "Low" },
  { id: "20", taskId: "TASK-8136", type: "Documentation", title: "The SQL interface is down, hack the neural driver so we can connect the TCP e-business!", status: "In Progress", priority: "High" },
];

/* ============================================
   TABLE SETUP
   ============================================ */

const columns = [
  { key: "checkbox", header: <Checkbox ariaLabel="Select all" size="compact" />, width: "40px" },
  { key: "taskId", header: "Task", width: "110px" },
  { key: "title", header: "Title" },
  { key: "status", header: "Status", width: "140px" },
  { key: "priority", header: "Priority", width: "110px" },
  { key: "actions", header: "", width: "50px", align: "right" as const },
];

const rows = tasks.map((task) => ({
  id: task.id,
  cells: {
    checkbox: <Checkbox ariaLabel={`Select ${task.taskId}`} size="compact" />,
    taskId: <span className={styles.taskId}>{task.taskId}</span>,
    title: <TitleCell type={task.type} title={task.title} />,
    status: <StatusCell status={task.status} />,
    priority: <PriorityCell priority={task.priority} />,
    actions: <ActionsCell />,
  },
}));

/* ============================================
   PAGE COMPONENT
   ============================================ */

export default function Test2Page() {
  return (
    <div className={styles.page}>

      {/* ============================================
         TOP NAVIGATION BAR
         ============================================ */}

      <nav className={styles.topNav}>
        <div className={styles.topNavLeft}>
          <Tabs
            tabs={[
              { label: "Examples", value: "examples" },
              { label: "Dashboard", value: "dashboard" },
              { label: "Tasks", value: "tasks" },
              { label: "Playground", value: "playground" },
              { label: "Authentication", value: "auth" },
            ]}
            activeTab="tasks"
            size="compact"
            onTabChange={() => {}}
          />
        </div>
        <div className={styles.topNavRight}>
          <Dropdown
            options={[
              { value: "neutral", label: "Neutral" },
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
            ]}
            value="neutral"
            size="compact"
          />
          <CircularButton icon="settings" ariaLabel="Settings" priority="secondary" size="compact" />
        </div>
      </nav>

      {/* ============================================
         WELCOME HERO
         ============================================ */}

      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Welcome back!</h1>
          <p className={styles.heroSubtitle}>Here&apos;s a list of your tasks for this month.</p>
        </div>
        <div className={styles.heroAvatar}>RC</div>
      </div>

      {/* ============================================
         FILTER BAR
         ============================================ */}

      <div className={styles.filterBar}>
        <div className={styles.searchInput}>
          <Input placeholder="Filter tasks..." size="compact" iconLeft="search" />
        </div>
        <Button label="Status" priority="secondary" state="default" size="compact" iconLeft="add_circle_outline" />
        <Button label="Priority" priority="secondary" state="default" size="compact" iconLeft="add_circle_outline" />

        <div className={styles.filterBarRight}>
          <Button label="View" priority="secondary" state="default" size="compact" iconLeft="tune" />
          <Button label="Add Task" priority="primary" state="default" size="compact" iconLeft="add" />
        </div>
      </div>

      {/* ============================================
         DATA TABLE
         ============================================ */}

      <div className={styles.tableWrapper}>
        <Table
          columns={columns}
          rows={rows}
          size="compact"
          caption="Tasks"
          captionHidden
        />

        {/* Table footer */}
        <div className={styles.tableFooter}>
          <span className={styles.footerMeta}>0 of {tasks.length} row(s) selected.</span>
          <div className={styles.footerActions}>
            <span className={styles.footerPageInfo}>Page 1 of 2</span>
            <Button label="Previous" priority="secondary" state="default" size="compact" />
            <Button label="Next" priority="secondary" state="default" size="compact" />
          </div>
        </div>
      </div>

    </div>
  );
}
