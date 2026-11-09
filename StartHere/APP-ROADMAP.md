# League Room — build plan

## Where the app is now

The dashboard is a local, single-file HTML app with the captured 12-team Yahoo roster and standings snapshot, matchups, scoring settings, weekly manual player notes, and a manual roster editor. The editable roster is saved separately in browser storage; adds, drops, two-sided trades, position and starter/bench/IR edits, a recent-change log, latest-change undo, and JSON backup/restore are supported. A roster reset requires confirmation. The Yahoo snapshot, records, scores, and matchup data remain a historical snapshot.

Weekly injury labels, trends, and projections are entered by the user and can be backed up separately. The current start/sit comparison uses those entered values; it is not a live feed or independent projection. The trade lab shows roster ownership/role and, where available, a one-week projection difference. It does not estimate season-long trade value. Nothing submits moves to Yahoo.

Chosen source strategy: use both Yahoo and ESPN for different jobs. Yahoo is authoritative for this league's settings, rosters, standings, matchups, transactions, and fantasy points. ESPN complements it with player projections, injury status, player news, and broader outlook data. ESPN's official Player Rater documents weekly projections, and ESPN Support says its fantasy injury status follows the NFL's official injury/inactive list. Those product pages confirm the data exists, but do not establish a supported third-party API for this dashboard. Keep each value labeled with its provider and update time; never let ESPN overwrite Yahoo league data.

## Recommended order

### 1. Finish the manual league workflow

- Use the roster editor for waiver adds, drops, trades, and lineup changes; confirm the result in Team rosters and Trade lab.
- Improve input quality: dates, player name/position, duplicate prevention, and clearer feedback when browser storage is unavailable.
- Decide whether users need a free-agent/watch list so dropped players can be found again without retyping them.
- Verify roster slot limits and eligibility rules against the captured Yahoo settings before enforcing limits; current editing allows flexible lineup changes.

**Done when:** a user can make and undo representative moves, reload the page without losing browser-saved edits, and export/import a backup without changing the original Yahoo baseline.

### 2. Make weekly decisions more useful

- Use two complementary sources: Yahoo for league-specific data, and ESPN for player projections, injury status, player news, and player outlooks when an access path is verified.
- For Yahoo, first draft an API access application describing this private, single-league dashboard and the requested read-only fields. Yahoo requires application review and OAuth; its current access page says the API is read-only. User reviews/submits the application, and the project waits for approval before integration.
- For ESPN, test what can be accessed without sign-in or paid service, which fields are available, and how often they refresh. ESPN's official pages document the data shown in its Fantasy product, but we have not verified an official supported third-party API contract.
- If ESPN automation is not supported, keep ESPN as a manual/reference source and preserve manual update fields rather than relying on brittle undocumented endpoints or collecting ESPN sign-in cookies.
- Cost constraint: use only no-cost sources; do not add a paid provider or subscription. Use Yahoo's league scoreboard for fantasy matchups and fantasy points. ESPN's public NFL score feed may be considered for game-level context only if useful; it is undocumented and may change. Use the NFL public injury report or free nflverse downloads as additional no-cost references if needed. Show source and freshness separately for projections, game scores, and injuries.
- Record the source and “last updated” time for every imported or manually entered outlook.
- Build a lineup optimizer that fills all league slots while respecting Yahoo position eligibility, including FLEX and SUPERFLEX. Show why each change is suggested and how much of the result comes from user-entered projections.
- Handle questionable/out players, bye weeks, and missing projections as uncertainty rather than treating unknown as healthy or as zero.

**Done when:** recommendations can be reproduced from displayed inputs, every lineup slot is legal, and the user can inspect the data freshness and rationale before changing Yahoo.

### 3. Build a real trade analyzer

- Compare packages of players, not only one-for-one trades.
- Use the selected league scoring rules and agreed season-long projection source; separate short-term points from rest-of-season value.
- Show both teams’ needs, positional depth before/after, uncertainty, and the assumptions behind the comparison. Avoid a single “fair/unfair” label without evidence.
- Allow hypothetical trade evaluation without applying it to the manual roster; offer an explicit “apply this trade to my local copy” action only after review.

**Done when:** multi-player proposals show transparent value ranges, roster effects for both teams, and a clear distinction between hypothetical analysis and a recorded roster move.

### 4. Add league-level planning

- Compare team depth and needs across the 12 captured rosters.
- Identify plausible trade targets from current rosters and needs, with reasons and caveats.
- Add standings and matchup updates only when a reliable data source is chosen; label snapshots with their capture time.

**Done when:** target suggestions are based on current rosters and documented inputs, while stale standings or scores are visibly dated.

### 5. Decide whether to connect Yahoo

- First confirm Yahoo developer application approval and the supported API capabilities for this league.
- If available, begin with read-only authentication and a manual “sync now” action. Map Yahoo player/team identifiers to the local roster and show a diff for user review.
- Keep manually edited rosters safe during sync: explain conflicts and let the user choose which version wins. Do not silently overwrite local changes.
- Treat submitting trades or lineup changes as a separate future feature requiring explicit user review and confirmation at the moment of submission.

**Done when:** read-only sync reliably refreshes rosters/settings with a reviewed diff, handles expired authorization, and preserves backups and local edits. Do not promise Yahoo integration until access is approved and tested.

### 6. Prepare it for everyday use

- Test the dashboard in the user’s normal browser and make sure storage survives closing/reopening. If local-file storage is unreliable, choose a local app/server approach before relying on it for the season.
- Add a clear backup/restore reminder, schema versioning, and recovery for malformed or older backup files.
- Check mobile layout, keyboard access, and readable empty/error states.
- Keep league data private. Do not publish or share the roster dashboard unless explicitly requested.

**Done when:** the app opens reliably, the user can recover data from a backup, and each view clearly distinguishes captured, manually entered, and connected data.

### 7. Visual cleanup (later, after the data flow is sound)

- Simplify the navigation and tighten spacing and typography across the dashboard.
- Make data freshness, manual entries, and ESPN-sourced values visually distinct.
- Review mobile layout and keyboard accessibility while refining the design.

**Done when:** the main decisions are easy to scan and users can tell what is current, what is manually entered, and where each value came from.

## Suggested next session

1. Draft the Yahoo read-only API access application for the user's review; the user decides whether to submit it.
2. After Yahoo approval, connect through OAuth and verify the exact league settings, rosters, standings, matchup, transaction, and fantasy-point fields available. The current single-file app should not contain OAuth secrets; plan a secure local companion service if needed.
3. Test ESPN projection, injury-status, and player-news access separately. Integrate ESPN as a complementary source only where its access is verified; keep Yahoo authoritative for league data.
4. Preserve manual entry and source/freshness labels for any data that cannot be connected. Keep the project free and schedule visual cleanup after the data workflow is established.

## Data and product guardrails

- Keep Yahoo snapshot data and current user-managed roster state distinct.
- Label manual values with their source and date; never invent injuries, projections, or trends.
- The dashboard is an advisor/tracker; Yahoo remains the place where real league transactions are submitted.
- Never store passwords, login codes, or API secrets in the project folder or roster backup.
