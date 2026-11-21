import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function TianshanOSArticle() {
  useEffect(() => {
    document.title = "TianshanOS — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="TianshanOS"
      summary="A way to check on an RM-01 and bring it back when its hosts stop answering."
      category="Hardware management"
      repository="https://github.com/RMinte/TianshanOS"
    >
      <p>
        A long inference run goes quiet. The machine stops answering over SSH,
        and you are nowhere near the power button. The first question is whether
        the box is still alive. TianshanOS gives the RM-01 an independent
        voice—running on a dedicated <strong>ESP32-S3</strong> out-of-band
        controller (built on ESP-IDF v5.5.2) that stays reachable even when the
        inference or application host has locked up.
      </p>
      <h2>Hardware telemetry from outside the host</h2>
      <p>
        As long as the controller has power and a management link, you can open
        the browser console or API to inspect the machine from the outside.
      </p>
      <ul>
        <li>
          <strong>Live power &amp; system console:</strong> Check input voltage,
          current, wattage, controller memory, and host power states across
          dedicated system, network, terminal, file, and command tabs.
        </li>
        <li>
          <strong>Out-of-band recovery:</strong> Issue hardware power and reset
          signals directly when a host stops responding.
        </li>
        <li>
          <strong>Config-driven &amp; maintainable:</strong> Hardware pins and
          peripherals map through <code>devices.json</code> and{" "}
          <code>pins.json</code>, with SD card config backups and OTA or USB
          firmware updates.
        </li>
      </ul>
      <h2>Thermal curves &amp; rule-based automation</h2>
      <p>
        Beyond ordinary fan curves, cooling adapts to{" "}
        <strong>temperature rise trends</strong> and falls back safely if a
        sensor drops out. You can also wire lightweight automation rules—reading
        REST or WebSocket metrics, setting thresholds with cooldowns, and
        triggering LED matrix alerts, logs, or SSH commands—so the controller
        watches long jobs for you.
      </p>
    </ArticlePage>
  );
}
