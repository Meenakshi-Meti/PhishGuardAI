import {
  simpleHash,
  normalize,
  extractDomains,
} from "./hashUtils";

export function generateFingerprint(text) {
  const normalized = normalize(text);

  const words = normalized
    .split(" ")
    .filter(
      (w) =>
        w.length > 3 &&
        ![
          "dear",
          "regards",
          "team",
          "your",
          "this",
          "that",
        ].includes(w)
    );

  const top = [...new Set(words)]
    .slice(0, 10)
    .sort()
    .join("|");

  const domains = extractDomains(text)
    .sort()
    .join("|");

  return (
    "PHG-" +
    simpleHash(
      domains +
        "::" +
        top +
        "::" +
        normalized.slice(0, 180)
    ).toUpperCase()
  );
}

export function scoreEmail(text) {
  const lowered = text.toLowerCase();

  const domains = extractDomains(text);

  let score = 1;
  const hits = [];

  const add = (points, reason) => {
    score += points;
    hits.push(reason);
  };

  if (
    /urgent|immediately|today|blocked/.test(
      lowered
    )
  )
    add(2, "Urgency language");

  if (
    /click|verify|login|confirm/.test(
      lowered
    )
  )
    add(2, "Action request");

  if (/reward|gift|bonus/.test(lowered))
    add(1.5, "Reward bait");

  score = Math.max(
    1,
    Math.min(10, Math.round(score))
  );

  const action =
    score > 9
      ? "Delete"
      : score > 7
      ? "Spam"
      : "Allow";

  return {
    score,
    action,
    hits,
    domains,
  };
}