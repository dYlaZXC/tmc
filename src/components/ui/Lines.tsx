import { Fragment } from "react";

interface LinesProps {
  lines: readonly string[];
}

/** Renders text lines separated by `<br>` (used for multi-line headings). */
export function Lines({ lines }: LinesProps) {
  return lines.map((line, index) => (
    <Fragment key={`${index}-${line}`}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
