"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Table } from "@design-system/components/Table/Table";
import { Button } from "@design-system/components/Button/Button";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { Input } from "@design-system/components/Input/Input";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/table");

/* ============================================
   SHARED TABLE DATA
   ============================================ */

const basicColumns = [
  { key: "name", header: "Name", width: "30%" },
  { key: "role", header: "Role", width: "30%" },
  { key: "email", header: "Email" },
];

const basicRows = [
  { id: "1", cells: { name: "Alice Chen", role: "Designer", email: "alice@example.com" } },
  { id: "2", cells: { name: "Bob Rivera", role: "Engineer", email: "bob@example.com" } },
  { id: "3", cells: { name: "Carol Osei", role: "Product Manager", email: "carol@example.com" } },
  { id: "4", cells: { name: "Dan Petrov", role: "Data Analyst", email: "dan@example.com" } },
];

export default function TablePage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Table</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-table--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Data table with flexible cell content, striped rows, and compact sizing. Cells accept any content including text, icons, inputs, and buttons.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table columns={basicColumns} rows={basicRows} />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table columns={basicColumns} rows={basicRows} size="compact" />
            </div>
          </section>

          {/* Striped */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Striped</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table columns={basicColumns} rows={basicRows} striped />
            </div>
          </section>

          {/* With icons */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With icons</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table
                columns={[
                  { key: "name", header: "Name", width: "35%" },
                  { key: "department", header: "Department", width: "30%" },
                  { key: "status", header: "Status", align: "center" },
                ]}
                rows={[
                  {
                    id: "1",
                    cells: {
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Alice Chen
                        </span>
                      ),
                      department: "Design",
                      status: <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "var(--color-status-positive-text)" }}>check_circle</span>,
                    },
                  },
                  {
                    id: "2",
                    cells: {
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Bob Rivera
                        </span>
                      ),
                      department: "Engineering",
                      status: <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "var(--color-status-positive-text)" }}>check_circle</span>,
                    },
                  },
                  {
                    id: "3",
                    cells: {
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Carol Osei
                        </span>
                      ),
                      department: "Product",
                      status: <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "var(--color-status-error-text)" }}>cancel</span>,
                    },
                  },
                ]}
              />
            </div>
          </section>

          {/* With controls */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With controls</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table
                columns={[
                  { key: "select", header: "", width: "48px", align: "center" },
                  { key: "name", header: "Name", width: "25%" },
                  { key: "role", header: "Role", width: "20%" },
                  { key: "email", header: "Email" },
                  { key: "actions", header: "Actions", align: "right" },
                ]}
                rows={[
                  {
                    id: "1",
                    cells: {
                      select: <Checkbox checked ariaLabel="Select Alice" />,
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Alice Chen
                        </span>
                      ),
                      role: "Designer",
                      email: "alice@example.com",
                      actions: (
                        <span style={{ display: "inline-flex", gap: "4px" }}>
                          <CircularButton icon="edit" ariaLabel="Edit" priority="secondary" size="compact" />
                          <CircularButton icon="delete" ariaLabel="Delete" priority="secondary" size="compact" />
                        </span>
                      ),
                    },
                  },
                  {
                    id: "2",
                    cells: {
                      select: <Checkbox ariaLabel="Select Bob" />,
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Bob Rivera
                        </span>
                      ),
                      role: "Engineer",
                      email: "bob@example.com",
                      actions: (
                        <span style={{ display: "inline-flex", gap: "4px" }}>
                          <CircularButton icon="edit" ariaLabel="Edit" priority="secondary" size="compact" />
                          <CircularButton icon="delete" ariaLabel="Delete" priority="secondary" size="compact" />
                        </span>
                      ),
                    },
                  },
                  {
                    id: "3",
                    cells: {
                      select: <Checkbox ariaLabel="Select Carol" />,
                      name: (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span className="material-symbols-rounded" style={{ fontSize: "24px" }}>person</span>
                          Carol Osei
                        </span>
                      ),
                      role: "Product Manager",
                      email: "carol@example.com",
                      actions: (
                        <span style={{ display: "inline-flex", gap: "8px" }}>
                          <Button label="Invite" priority="primary" size="compact" />
                        </span>
                      ),
                    },
                  },
                ]}
              />
            </div>
          </section>

          {/* With inputs */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With inputs</h2>
            </div>
            <div className={styles.tableWrapper}>
              <Table
                columns={[
                  { key: "setting", header: "Setting", width: "30%" },
                  { key: "value", header: "Value" },
                ]}
                rows={[
                  {
                    id: "1",
                    cells: {
                      setting: "Display name",
                      value: <Input placeholder="Enter name" value="Alice Chen" size="compact" />,
                    },
                  },
                  {
                    id: "2",
                    cells: {
                      setting: "Email address",
                      value: <Input placeholder="Enter email" value="alice@example.com" type="email" size="compact" />,
                    },
                  },
                  {
                    id: "3",
                    cells: {
                      setting: "Location",
                      value: <Input placeholder="Enter city" size="compact" />,
                    },
                  },
                ]}
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
