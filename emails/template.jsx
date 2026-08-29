import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "User",
  type = "monthly-report",
  data = {},
}) {
  const isAlert = type === "budget-alert";
  const percentage = data?.percentageUsed || 0;
  const isHighAlert = percentage >= 90;

  return (
    <Html>
      <Head />
      <Preview>
        {isAlert
          ? `Budget Alert: ${percentage.toFixed(1)}% of your limit reached`
          : `Your ${data?.month || "Monthly"} Financial Report from Finly`}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          
          {/* Header Brand */}
          <Section style={styles.header}>
            <Text style={styles.logo}>
              Finly<span style={{ color: "#6366f1" }}>.</span>
            </Text>
          </Section>

          {/* Alert Type: BUDGET WARNING */}
          {isAlert && (
            <>
              <Section style={styles.badgeWrapper}>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: isHighAlert ? "#fef2f2" : "#fffbeb",
                    color: isHighAlert ? "#dc2626" : "#d97706",
                    borderColor: isHighAlert ? "#fecaca" : "#fef3c7",
                  }}
                >
                  {isHighAlert ? "Critical Alert" : "Budget Warning"}
                </span>
              </Section>

              <Heading style={styles.title}>Budget Limit Approaching</Heading>
              
              <Text style={styles.greeting}>Hello {userName},</Text>
              <Text style={styles.subtext}>
                You have reached{" "}
                <strong style={{ color: isHighAlert ? "#dc2626" : "#d97706" }}>
                  {percentage.toFixed(1)}%
                </strong>{" "}
                of your monthly allocated budget. Here is your current snapshot:
              </Text>

              <Section style={styles.metricGrid}>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Total Budget</Text>
                  <Text style={styles.metricValue}>
                    ₹{Number(data?.budgetAmount || 0).toLocaleString("en-IN")}
                  </Text>
                </div>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Spent So Far</Text>
                  <Text
                    style={{
                      ...styles.metricValue,
                      color: isHighAlert ? "#dc2626" : "#d97706",
                    }}
                  >
                    ₹{Number(data?.totalExpenses || 0).toLocaleString("en-IN")}
                  </Text>
                </div>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Remaining Balance</Text>
                  <Text style={{ ...styles.metricValue, color: "#16a34a" }}>
                    ₹
                    {Math.max(
                      0,
                      (data?.budgetAmount || 0) - (data?.totalExpenses || 0)
                    ).toLocaleString("en-IN")}
                  </Text>
                </div>
              </Section>

              <Section style={styles.tipBox}>
                <Text style={styles.tipText}>
                  💡 <strong>Tip:</strong> Consider cutting back on non-essential
                  expenses over the next few days to stay within your goal.
                </Text>
              </Section>
            </>
          )}

          {/* Alert Type: MONTHLY REPORT */}
          {!isAlert && (
            <>
              <Section style={styles.badgeWrapper}>
                <span style={styles.reportBadge}>
                  {data?.month || "Monthly"} Overview
                </span>
              </Section>

              <Heading style={styles.title}>Monthly Financial Report</Heading>
              
              <Text style={styles.greeting}>Hello {userName},</Text>
              <Text style={styles.subtext}>
                Here is your complete income and spending breakdown for the month
                of <strong>{data?.month}</strong>:
              </Text>

              {/* Main Financial Metrics */}
              <Section style={styles.metricGrid}>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Total Income</Text>
                  <Text style={{ ...styles.metricValue, color: "#16a34a" }}>
                    +₹{Number(data?.stats?.totalIncome || 0).toLocaleString("en-IN")}
                  </Text>
                </div>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Total Expenses</Text>
                  <Text style={{ ...styles.metricValue, color: "#dc2626" }}>
                    -₹{Number(data?.stats?.totalExpenses || 0).toLocaleString("en-IN")}
                  </Text>
                </div>
                <div style={styles.metricCard}>
                  <Text style={styles.metricLabel}>Net Savings</Text>
                  <Text style={styles.metricValue}>
                    ₹
                    {(
                      (data?.stats?.totalIncome || 0) -
                      (data?.stats?.totalExpenses || 0)
                    ).toLocaleString("en-IN")}
                  </Text>
                </div>
              </Section>

              {/* Spending Breakdown by Category */}
              {data?.stats?.byCategory && (
                <Section style={styles.cardSection}>
                  <Text style={styles.sectionHeader}>Expenses by Category</Text>
                  <Hr style={styles.separator} />
                  {Object.entries(data.stats.byCategory).map(
                    ([category, amount]) => (
                      <div key={category} style={styles.tableRow}>
                        <Text style={styles.categoryName}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                        <Text style={styles.categoryAmount}>
                          ₹{Number(amount).toLocaleString("en-IN")}
                        </Text>
                      </div>
                    )
                  )}
                </Section>
              )}

              {/* AI Powered Insights */}
              {data?.insights && data.insights.length > 0 && (
                <Section style={styles.insightSection}>
                  <Text style={styles.insightHeader}>✨ Finly Smart Insights</Text>
                  {data.insights.map((insight, idx) => (
                    <Text key={idx} style={styles.insightItem}>
                      • {insight}
                    </Text>
                  ))}
                </Section>
              )}
            </>
          )}

          {/* Footer */}
          <Hr style={styles.separator} />
          <Section style={styles.footerSection}>
            <Text style={styles.noReplyText}>
              Please do not reply directly to this email. This is an automated message sent from an unmonitored mailbox.
            </Text>
            <Text style={styles.footerBrand}>Finly Financial Management</Text>
            <Text style={styles.footerText}>
              You received this automated notification because budget alerts are active for your account.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#0f172a",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: "30px 0",
    margin: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "580px",
    margin: "0 auto",
    padding: "36px 32px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  badgeWrapper: {
    textAlign: "center",
    marginBottom: "12px",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    borderRadius: "9999px",
    borderWidth: "1px",
    borderStyle: "solid",
    letterSpacing: "0.5px",
  },
  reportBadge: {
    display: "inline-block",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    borderRadius: "9999px",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    border: "1px solid #c7d2fe",
    letterSpacing: "0.5px",
  },
  title: {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "700",
    textAlign: "center",
    margin: "0 0 16px 0",
    letterSpacing: "-0.3px",
  },
  greeting: {
    fontSize: "16px",
    color: "#1e293b",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  subtext: {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#64748b",
    margin: "0 0 24px 0",
  },
  metricGrid: {
    marginBottom: "24px",
  },
  metricCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "10px",
  },
  metricLabel: {
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#64748b",
    letterSpacing: "0.5px",
    margin: "0 0 4px 0",
  },
  metricValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  tipBox: {
    backgroundColor: "#eff6ff",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "0 8px 8px 0",
    padding: "12px 16px",
    marginTop: "8px",
  },
  tipText: {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#1e40af",
    margin: 0,
  },
  cardSection: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
  },
  sectionHeader: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  categoryName: {
    fontSize: "14px",
    color: "#334155",
    fontWeight: "500",
    margin: 0,
  },
  categoryAmount: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    margin: 0,
  },
  insightSection: {
    backgroundColor: "#f5f3ff",
    border: "1px solid #ddd6fe",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
  },
  insightHeader: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#6d28d9",
    margin: "0 0 10px 0",
  },
  insightItem: {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#4c1d95",
    margin: "0 0 6px 0",
  },
  separator: {
    borderColor: "#e2e8f0",
    margin: "24px 0 16px 0",
  },
  footerSection: {
    textAlign: "center",
  },
  noReplyText: {
    fontSize: "12px",
    color: "#94a3b8",
    fontStyle: "italic",
    lineHeight: "18px",
    margin: "0 0 12px 0",
  },
  footerBrand: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    margin: "0 0 4px 0",
  },
  footerText: {
    fontSize: "12px",
    color: "#94a3b8",
    lineHeight: "18px",
    margin: 0,
  },
};