import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function DailyStockAnalysisArticle() {
  useEffect(() => {
    document.title = "Daily Stock Analysis — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="Daily Stock Analysis"
      summary="A daily reading of your watchlist, with a record you can come back to when the market has moved on."
      category="Market research"
      repository="https://github.com/massif-01/daily_stock_analysis"
    >
      <p>
        A company on your watchlist moves before you have time to read the news.
        By the time you sit down, the price chart, the headlines, and
        yesterday's note live in three different places. Daily Stock Analysis
        pulls those threads into one <strong>Decision Dashboard</strong>
        —covering mainland China, Hong Kong, the US, Japan, South Korea, Taiwan,
        and ETFs—so you can see what changed and decide where to spend your
        attention.
      </p>
      <h2>Decision dashboards &amp; 15 built-in strategies</h2>
      <p>
        Rather than dumping raw prose, each scheduled run produces a structured
        brief and feeds a full local workspace.
      </p>
      <ul>
        <li>
          <strong>Actionable reports:</strong> Outputs core conclusions, scores,
          trend calls, entry/exit levels, risk alerts, and an action checklist.
        </li>
        <li>
          <strong>DSA workbench:</strong> Supports backtesting, position
          tracking, Markdown export, and importing watchlists from images,
          CSV/Excel, or the clipboard.
        </li>
        <li>
          <strong>Multi-turn strategy agent:</strong> Lets you interrogate any
          ticker across <strong>15 built-in strategies</strong> (moving
          averages, Chanlun, wave theory, event-driven, and more) and push
          digests to WeCom, Feishu, Telegram, Discord, Slack, or email.
        </li>
      </ul>
      <h2>Making yesterday's signal useful tomorrow</h2>
      <p>
        You can revisit how past signals actually played out and reopen a
        conversation with the stock's full context still in view. A market
        report is only worth keeping if it helps you ask a sharper question next
        time—and the repository includes sample reports and per-market guides to
        get started.
      </p>
    </ArticlePage>
  );
}
