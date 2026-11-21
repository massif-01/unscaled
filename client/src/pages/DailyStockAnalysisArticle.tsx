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
        A company on your watchlist moves before you have time to read the
        news. By the time you sit down, the price chart, the headlines, and
        yesterday’s report are in three places. Daily Stock Analysis brings
        that material into one report so you can see what changed and decide
        where to spend your attention.
      </p>

      <h2>A watchlist that crosses markets</h2>
      <p>
        The project began with ZhuLinsen and has grown into a workspace for
        following a watchlist, reading older reports, and asking follow-up
        questions. It covers mainland China, Hong Kong, the United States,
        Japan, South Korea, and Taiwan, alongside ETFs. What goes into each
        report depends on the data available for that market. You can also
        schedule reports to arrive in a channel you already read.
      </p>

      <h2>Make yesterday’s report useful tomorrow</h2>
      <p>
        I contributed ways to revisit how past signals played out and to
        return to a conversation with the stock still in view. A report is
        worth keeping if it helps you ask a better question next time. The
        repository has sample reports and a guide to what each market can
        tell you.
      </p>
    </ArticlePage>
  );
}
