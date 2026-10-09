import fs from 'node:fs';

const path = 'src/content/blogData.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const source = {
  mlb: { label: 'MLB 2026 postseason schedule', url: 'https://www.mlb.com/news/2026-mlb-playoff-and-world-series-schedule' },
  mlbTv: { label: 'MLB.TV postseason schedule and authentication notes', url: 'https://www.mlb.com/live-stream-games/postseason/2026-schedule' },
  nfl5: { label: 'NFL Week 5 schedule', url: 'https://www.nfl.com/schedules/2026/by-week/reg-5' },
  nflFlex: { label: 'NFL flexible scheduling procedures', url: 'https://www.nfl.com/news/flexible-scheduling-procedures' },
  nflAccess: { label: 'NFL live regular-season access guide', url: 'https://support.nfl.com/hc/en-us/articles/40568374746644-How-to-access-LIVE-NFL-Regular-Season-games' },
  primeTnf: { label: 'Prime Video Thursday Night Football schedule', url: 'https://www.aboutamazon.com/news/entertainment/thursday-night-football-schedule-prime-video' },
  nbaSeason: { label: 'NBA 2026-27 regular-season schedule release', url: 'https://www.nba.com/news/2026-27-nba-regular-season-schedule' },
  nbaWatch: { label: 'NBA 2026-27 viewing guide', url: 'https://www.nba.com/news/how-to-watch-games-2026-27-season' },
  nbaDates: { label: 'NBA 2026-27 key dates', url: 'https://www.nba.com/news/key-dates' },
  nbaCup: { label: 'NBA Cup key dates and schedule', url: 'https://www.nba.com/news/emirates-nba-cup-key-dates-schedule' },
  nbaCup101: { label: 'NBA Cup 101 rules and format', url: 'https://www.nba.com/news/nba-cup-101' },
  nbaCupGroups: { label: 'NBA Cup 2026 groups announced', url: 'https://api-hub.nba.com/news/emirates-nba-cup-2026-groups-announced' },
  nbaBlackout: { label: 'NBA League Pass blackout guide', url: 'https://support.watch.nba.com/hc/en-us/articles/115002481154-League-Pass-Blackout-Guide' },
  wnba: { label: 'WNBA 2026 postseason FAQ', url: 'https://www.wnba.com/news/2026-wnba-postseason-faq' },
  wnbaSemi: { label: 'WNBA 2026 semifinals preview', url: 'https://www.wnba.com/news/2026-playoffs-series-preview-semifinals' },
  wnbaBlackout: { label: 'WNBA League Pass blackout guide', url: 'https://support.wnba.com/hc/en-us/articles/19679847275927-Blackouts' },
  ncaa: { label: 'NCAA college football TV schedule', url: 'https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview' },
};

const p = (text) => ({ type: 'p', text });
const h3 = (text) => ({ type: 'h3', text });
const ul = (items) => ({ type: 'ul', items });
const table = (headers, rows) => ({ type: 'table', headers, rows });
const links = (items) => ({ type: 'links', items });
const image = (article, index = 0) => ({ type: 'image', image: article.sectionImages?.[index] || article.heroImage });

function find(slug) {
  const article = data.articles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Missing article ${slug}`);
  return article;
}

function setArticle(slug, patch) {
  const article = find(slug);
  Object.assign(article, patch);
}

function genericFaq(question, answer) {
  return { question, answer };
}

const baseRelated = [
  { label: 'moatv pricing', href: '/pricing' },
  { label: 'moatv device guide', href: '/channels' },
  { label: 'moatv FAQ', href: '/faq' },
];

const articleLinks = {
  mlb: [{ label: 'World Series guide', href: '/blog/2026-world-series-viewing-guide' }, { label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }],
  ws: [{ label: 'MLB Playoffs guide', href: '/blog/how-to-watch-2026-mlb-playoffs' }, { label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }],
  nfl: [{ label: 'NFL Week 5 guide', href: '/blog/nfl-week-5-viewing-guide-2026' }, { label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }],
  nfl5: [{ label: 'NFL October guide', href: '/blog/nfl-october-2026-tv-guide' }, { label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }],
  nbaOpen: [{ label: 'NBA season guide', href: '/blog/nba-2026-27-viewing-guide' }, { label: 'NBA Cup guide', href: '/blog/2026-nba-cup-guide' }],
  nbaSeason: [{ label: 'NBA Opening Night guide', href: '/blog/nba-opening-night-2026-watch-guide' }, { label: 'NBA Cup guide', href: '/blog/2026-nba-cup-guide' }],
  nbaCup: [{ label: 'NBA season guide', href: '/blog/nba-2026-27-viewing-guide' }, { label: 'NBA Opening Night guide', href: '/blog/nba-opening-night-2026-watch-guide' }],
  college: [{ label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }, { label: 'NFL October guide', href: '/blog/nfl-october-2026-tv-guide' }],
  wnba: [{ label: 'October sports calendar', href: '/blog/october-2026-sports-calendar' }, { label: 'NBA Opening Night guide', href: '/blog/nba-opening-night-2026-watch-guide' }],
  calendar: [
    { label: 'MLB Playoffs guide', href: '/blog/how-to-watch-2026-mlb-playoffs' },
    { label: 'World Series guide', href: '/blog/2026-world-series-viewing-guide' },
    { label: 'NFL October guide', href: '/blog/nfl-october-2026-tv-guide' },
    { label: 'NFL Week 5 guide', href: '/blog/nfl-week-5-viewing-guide-2026' },
    { label: 'NBA Opening Night guide', href: '/blog/nba-opening-night-2026-watch-guide' },
    { label: 'NBA season guide', href: '/blog/nba-2026-27-viewing-guide' },
    { label: 'NBA Cup guide', href: '/blog/2026-nba-cup-guide' },
    { label: 'WNBA Playoffs guide', href: '/blog/how-to-watch-2026-wnba-playoffs-finals' },
    { label: 'College football October guide', href: '/blog/college-football-october-2026-tv-guide' },
  ],
};

function attachRelated(article, key) {
  article.relatedLinks = [...baseRelated, ...articleLinks[key]];
}

{
  const article = find('how-to-watch-2026-mlb-playoffs');
  setArticle(article.slug, {
    intro: [
      'The 2026 MLB Playoffs are already in progress, and the most useful way to follow them is to separate the confirmed bracket dates from the conditional games that disappear when a series ends early. MLB’s official schedule lists Division Series action in early October, the National League Championship Series beginning Sunday, October 11, the American League Championship Series beginning Monday, October 12, and World Series Game 1 on Friday, October 23. This guide explains how the rounds fit together, where the national broadcast notes sit, and how U.S. viewers should verify access without assuming that any single provider or app carries every game.',
      'Use this as a practical postseason planning guide rather than a prediction page. It does not invent winners, broadcast crews, local carriage or MoaTV sports-channel availability. It keeps the official MLB facts attached to each round, explains why “if necessary” games matter, and links to the dedicated World Series guide when the best-of-seven championship round becomes the only remaining baseball series on the October calendar.',
    ],
    sections: [
      { id: 'quick-answer', heading: '2026 MLB Playoffs: quick answer', body: [
        p('The quick answer is that the 2026 MLB Playoffs move from best-of-five Division Series into best-of-seven League Championship Series and then a best-of-seven World Series scheduled to start October 23. MLB lists FOX, FS1, FOX Deportes, FOX One, TBS, truTV, HBO Max and UniMas across the postseason schedule, with the exact network depending on the round, league and date. Because several games are marked if necessary, the schedule should be checked on MLB.com on the morning of the game and again before first pitch.'),
        table(['Round', 'Official timing in October 2026', 'Series format', 'Primary viewing issue'], [
          ['Wild Card Series', 'Sept. 29-Oct. 1 completed window', 'Best of three', 'Early round results decide Division Series opponents'],
          ['Division Series', 'Oct. 3-10 window', 'Best of five', 'Games 4 and 5 vanish if one team wins early'],
          ['League Championship Series', 'NLCS from Oct. 11; ALCS from Oct. 12', 'Best of seven', 'League-specific network families and possible time moves'],
          ['World Series', 'Oct. 23-31 if it reaches Game 7', 'Best of seven', 'FOX family coverage and home-field tied to better 2026 record'],
        ]),
        p('For viewers, the first decision is not which team will advance; it is which round you are trying to watch. Division Series days can include multiple games across different network families. Championship Series days often become league-specific. The World Series is simpler because MLB lists every game on FOX, FOX Deportes and FOX One, but Games 5, 6 and 7 still depend on the score of the series.'),
      ] },
      { id: 'postseason-structure', heading: 'How the MLB postseason structure affects what you watch', body: [
        image(article, 0),
        p('The postseason begins with Wild Card Series winners moving into the Division Series against higher-seeded clubs. By October 2026, the Wild Card round has already determined several paths: Atlanta advanced over Philadelphia, the White Sox advanced over Houston, the Yankees advanced over Boston, and San Diego advanced over Chicago. Those results matter for viewers because a schedule table that says “winner at higher seed” becomes an actual matchup only after the prior round closes.'),
        p('The Division Series is a best-of-five round, so the first team to three wins advances. That format is short enough that every game can carry elimination pressure after Game 2. MLB marks later Division Series games as if necessary because a three-game sweep ends the matchup before Games 4 or 5. When you see an if-necessary listing, treat it as a reserved television window, not a guaranteed baseball game.'),
        p('The League Championship Series changes the viewing pattern. The NLCS opens on October 11 on the FOX family, while the ALCS opens on October 12 on TNT Sports platforms listed by MLB. These rounds are best of seven, so a series can end in four games or stretch into a full week. MLB’s schedule also notes that some times can move if the other league series ends early, which is why the official schedule remains more reliable than a static screenshot.'),
        p('The World Series closes the bracket. MLB lists Game 1 for Friday, October 23, with Games 1, 2, 6 and 7 at the home of the league champion with the better 2026 regular-season record. Games 3, 4 and 5 shift to the other league champion’s ballpark. The practical point is simple: postseason home-field is not always a universal “higher seed” shorthand by the time the World Series arrives.'),
      ] },
      { id: 'round-by-round-schedule', heading: 'Round-by-round schedule table for U.S. viewers', body: [
        p('The following table is designed for planning, not scorekeeping. It groups the key remaining October windows and highlights what the viewer should verify before using a remote, streaming app or TV guide. Use Eastern Time as the default unless the official listing or your local guide converts it for your market.'),
        table(['Date or range', 'Round', 'Known official note', 'Viewer action'], [
          ['Oct. 3-10', 'Division Series', 'Best-of-five games with Games 4-5 conditional', 'Confirm whether the series is still alive before planning around later games'],
          ['Oct. 11', 'NLCS Game 1', 'FOX/FS1/FOX Deportes/FOX One family listed by MLB', 'Check whether your provider or app includes the specific listed channel'],
          ['Oct. 12', 'ALCS Game 1', 'TBS/truTV/HBO Max/UniMas family listed by MLB', 'Confirm authentication requirements before first pitch'],
          ['Oct. 16-20', 'LCS late games', 'Several if-necessary games and possible time adjustments', 'Use MLB.com rather than an old calendar invite'],
          ['Oct. 23-31', 'World Series', 'FOX/FOX Deportes/FOX One for every listed game', 'Read Games 5-7 as conditional until the series requires them'],
        ]),
        p('A practical example helps. If the NLCS is tied 2-2 after four games, Game 5 is definitely needed and the later schedule becomes more likely to matter. If one club leads 3-0, Game 5 may never happen. The same logic applies to the World Series: Game 5 exists only if neither team has won four games through Game 4, while Game 7 exists only if the series is tied after six games.'),
      ] },
      { id: 'broadcast-and-streaming', heading: 'Broadcast and streaming notes: national, regional and MLB.TV', body: [
        p('MLB postseason viewing is different from regular-season regional baseball. During the regular season, a fan often thinks first about the regional sports network or local blackout territory. In October, the listed national postseason partners become the center of the plan. That does not mean every viewer has the same access; it means the schedule points to national telecasts that may require the correct pay TV package, streaming subscription or participating provider authentication.'),
        p('MLB.TV is especially easy to misunderstand in October. MLB’s postseason streaming notes have historically distinguished authenticated live postseason telecasts from regular-season out-of-market live games. The useful reader takeaway is to avoid assuming that an MLB.TV subscription by itself unlocks every live postseason game in the United States. Check the MLB.TV postseason page and the specific network line for the game you want.'),
        p('Regional and national coverage can also differ in tone and availability. The postseason telecast listed by MLB is the authoritative live game window for U.S. viewers, while local pregame and postgame shows may live elsewhere. If you are following one team closely, you may need both the national game listing and your team’s local media notes to understand pregame programming, radio coverage and postgame analysis.'),
        p('Device compatibility should be tested before the game window. A viewer using a smart TV app, streaming stick, browser, mobile app or provider login may face different sign-in screens. If you expect to use FOX One, HBO Max, a TV Everywhere login or a cable replacement app, open the app early and confirm the channel tile before the national anthem rather than during the first inning.'),
      ] },
      { id: 'time-zones-and-if-necessary', heading: 'Time zones and if-necessary game planning', body: [
        p('Most official U.S. sports schedules use Eastern Time unless they say otherwise. For October baseball, that matters because a listed 8 p.m. ET first pitch becomes 7 p.m. Central, 6 p.m. Mountain and 5 p.m. Pacific. West Coast viewers often get earlier starts during work or commute hours, while East Coast viewers can face late endings for games played in the Pacific or Mountain time zones.'),
        table(['Listed ET start', 'Central', 'Mountain', 'Pacific', 'Planning note'], [
          ['5:00 p.m.', '4:00 p.m.', '3:00 p.m.', '2:00 p.m.', 'Potential workday conflict for western viewers'],
          ['6:00 p.m.', '5:00 p.m.', '4:00 p.m.', '3:00 p.m.', 'Early dinner window in the East and commute window in the West'],
          ['8:00 p.m.', '7:00 p.m.', '6:00 p.m.', '5:00 p.m.', 'Most common national prime-time baseball slot'],
          ['9:00 p.m.', '8:00 p.m.', '7:00 p.m.', '6:00 p.m.', 'Late East Coast finish risk'],
        ]),
        p('The phrase “if necessary” is not a footnote; it is the difference between an actual game and an empty reservation. A best-of-five series ends when one team wins three games. A best-of-seven series ends when one team wins four. If your calendar contains every possible game, review the series standings each morning and delete any games that cannot be played.'),
      ] },
      { id: 'examples-and-troubleshooting', heading: 'Practical examples and common viewing problems', body: [
        h3('Example: following a Division Series'),
        p('Suppose you are following a Division Series that starts Saturday. Set reminders for Games 1 and 2 immediately because those games are guaranteed once the matchup is set. Add Games 3, 4 and 5 with conditional labels. After Game 3, review the series score: if one team has already reached three wins, remove the remaining listings; if the series is 2-1, Game 4 becomes real; if it reaches 2-2, Game 5 becomes the decisive event.'),
        h3('Example: sharing one screen during October'),
        p('A household may have MLB playoffs, college football, NFL and WNBA games on the same weekend. Use the baseball schedule to identify elimination games first, because those cannot be recreated live. Then place fixed national windows such as NFL Thursday or NBA Opening Night around the baseball plan. If two events overlap, decide ahead of time whether one person will use a mobile or tablet stream while the living-room screen stays on the higher-priority game.'),
        h3('Common fixes'),
        ul([
          'If the app says the event is unavailable, confirm whether it requires a participating provider login rather than a standalone subscription.',
          'If a guide still lists a canceled if-necessary game, check MLB.com and the team pages before assuming the broadcast moved.',
          'If the wrong channel opens, search by team name and round instead of relying only on a generic network tile.',
          'If a stream works on a phone but not a TV, review device restrictions and sign-in status on the TV app itself.',
        ]),
      ] },
      { id: 'related-guides', heading: 'Where this guide fits in the MoaTV sports cluster', body: [
        p('This article owns the broad 2026 MLB Playoffs path: round structure, schedule logic, national coverage notes and how to think about conditional games. Once the bracket reaches the Fall Classic, the dedicated World Series guide is the better page for Game 1 through Game 7 details. For multi-sport conflicts, the October sports calendar puts baseball beside NFL, NBA, WNBA and college football windows.'),
        links(articleLinks.mlb),
        p('MoaTV readers should keep the distinction clear: this article helps with planning and source verification, not with a guarantee that MoaTV carries a particular postseason telecast. Confirm the official channel, confirm your local or authenticated access, then use the site’s pricing and device pages only for setup decisions that are already supported by verified MoaTV information.'),
      ] },
      { id: 'final-note', heading: 'Final MLB postseason checklist', body: [
        p('Before each postseason night, check the MLB schedule, check whether the game is guaranteed, confirm the listed network or streaming platform, and test the device you plan to use. That four-step habit solves most baseball viewing confusion because it connects the bracket, the broadcaster and the screen in the right order.'),
        p('The 2026 MLB Playoffs have enough moving pieces that a static schedule can become stale quickly. The safest plan is to treat this guide as the structured explanation and MLB.com as the live source of truth for teams, times and if-necessary updates.'),
      ] },
    ],
    faq: [
      genericFaq('What channel are the 2026 MLB Playoffs on?', 'MLB lists different network families by round and league, including FOX, FS1, FOX Deportes, FOX One, TBS, truTV, HBO Max and UniMas. Check the specific game listing because the correct channel depends on date and round.'),
      genericFaq('When does the 2026 World Series start?', 'MLB lists World Series Game 1 for Friday, October 23, 2026. Games 5, 6 and 7 are if necessary, so the series can end before October 31.'),
      genericFaq('Can MLB.TV subscribers watch postseason games live?', 'U.S. live postseason access through MLB.TV can require authentication through a participating pay TV provider and can vary by telecast. Use MLB.TV’s postseason schedule notes before relying on it for a live game.'),
      genericFaq('What does if necessary mean in MLB playoff schedules?', 'It means the game is played only if the series has not already been decided. Best-of-five series end at three wins, and best-of-seven series end at four wins.'),
      genericFaq('How should I handle local listings during the playoffs?', 'Start with MLB’s national schedule, then verify your provider or app in your ZIP code. Local pregame shows, radio coverage and national telecasts are not always in the same place.'),
    ],
    sources: [source.mlb, source.mlbTv],
  });
  attachRelated(article, 'mlb');
}

{
  const article = find('2026-world-series-viewing-guide');
  setArticle(article.slug, {
    intro: [
      'The 2026 World Series is scheduled to begin Friday, October 23, with every listed game on FOX, FOX Deportes and FOX One. It is a best-of-seven series, which means Games 1 through 4 are scheduled once the two league champions are known, while Games 5, 6 and 7 are played only if no team has already won four games. MLB lists Games 1, 2, 6 and 7 at the home of the league champion with the better 2026 regular-season record.',
      'This guide is narrower than the broader MLB Playoffs article. It focuses on the Fall Classic itself: the Game 1 through Game 7 calendar, the 2-3-2 home-field pattern, conditional-game scenarios, live versus replay access questions, device preparation, and how U.S. viewers should read the official listing without guessing which teams will win the pennants.',
    ],
    sections: [
      { id: 'world-series-schedule', heading: '2026 World Series schedule and coverage', body: [
        p('The complete World Series schedule is compact enough to put in one table, but it still needs careful reading. The first four games are the planned opening sequence. Game 5 is necessary only if the series is not finished after Game 4. Games 6 and 7 require the series to return to the club with the better regular-season record, which happens only if neither team wins four games in the first five or six contests.'),
        table(['Game', 'Date', 'Status', 'Home-field note', 'Coverage listed by MLB'], [
          ['Game 1', 'Friday, Oct. 23', 'Scheduled', 'Better 2026 record', 'FOX/FOX Deportes/FOX One'],
          ['Game 2', 'Saturday, Oct. 24', 'Scheduled', 'Better 2026 record', 'FOX/FOX Deportes/FOX One'],
          ['Game 3', 'Monday, Oct. 26', 'Scheduled', 'Other league champion', 'FOX/FOX Deportes/FOX One'],
          ['Game 4', 'Tuesday, Oct. 27', 'Scheduled', 'Other league champion', 'FOX/FOX Deportes/FOX One'],
          ['Game 5', 'Wednesday, Oct. 28', 'If necessary', 'Other league champion', 'FOX/FOX Deportes/FOX One'],
          ['Game 6', 'Friday, Oct. 30', 'If necessary', 'Better 2026 record', 'FOX/FOX Deportes/FOX One'],
          ['Game 7', 'Saturday, Oct. 31', 'If necessary', 'Better 2026 record', 'FOX/FOX Deportes/FOX One'],
        ]),
        p('The date gap between Games 2 and 3 is the normal travel break. The date gap between Games 5 and 6 is another travel break if the series returns to the original host. Viewers planning recordings, watch parties or travel should not treat the break days as accidental gaps; they are part of the best-of-seven structure.'),
      ] },
      { id: 'format-and-home-field', heading: 'Best-of-seven format and home-field structure', body: [
        image(article, 0),
        p('The World Series uses a best-of-seven format: the first team to four wins becomes champion. The home-field layout is usually described as 2-3-2, meaning the better-record club hosts Games 1 and 2, the other club hosts Games 3, 4 and, if needed, 5, and the better-record club hosts Games 6 and 7 if the series goes that long. The format is simple, but its consequences change after every game.'),
        p('If one team wins the first three games, Game 4 becomes a potential clincher and Game 5 exists only if the trailing team extends the series. If the teams split the first four games, Game 5 is guaranteed and the series will return for Game 6. If the series is tied 3-3 after six games, Game 7 becomes the final possible baseball game of the season.'),
        p('Home field does not mean a team is guaranteed an advantage in every viewing context. It tells you where the game is played, which local fans may get earlier pregame coverage, and which city controls the in-stadium clock. For U.S. viewers watching from home, the more important practical detail is that FOX-family coverage remains the listed national path for every game.'),
      ] },
      { id: 'legal-viewing-options', heading: 'Legal viewing options, live access and replay differences', body: [
        p('The cleanest live-viewing rule is to start with MLB’s listed broadcaster and then ask whether your household can receive that broadcaster legally. FOX over-the-air availability depends on local reception or a live TV service that carries the local FOX station. FOX Deportes depends on Spanish-language package availability. FOX One availability depends on the product and account path in your market.'),
        p('Do not assume a baseball replay follows the same rule as a live telecast. Live national rights, authenticated streams, next-day replays and condensed-game products can sit under different rules. A viewer who only needs a replay the next morning may have more options than a viewer trying to watch live at first pitch. Conversely, a viewer who wants live coverage should not rely on replay language as proof of live access.'),
        p('This distinction matters most for fans watching away from home. A hotel TV lineup, a borrowed streaming device, a work laptop and a mobile app can all have different sign-in requirements. Before Game 1, open the app or service you expect to use, search for the exact scheduled telecast, and confirm that your account can reach the live channel.'),
      ] },
      { id: 'time-zone-guide', heading: 'U.S. time-zone guidance for World Series nights', body: [
        p('MLB’s public schedule is easiest to read in Eastern Time, but the World Series is a national event that U.S. viewers watch across four continental time zones. If a first pitch is listed at 8 p.m. ET, it is 7 p.m. CT, 6 p.m. MT and 5 p.m. PT. A West Coast household may be starting dinner when the East Coast broadcast is already in the early innings.'),
        table(['Eastern listing', 'Central', 'Mountain', 'Pacific', 'Viewing implication'], [
          ['7:00 p.m.', '6:00 p.m.', '5:00 p.m.', '4:00 p.m.', 'Possible commute conflict in the West'],
          ['8:00 p.m.', '7:00 p.m.', '6:00 p.m.', '5:00 p.m.', 'Most common national evening planning window'],
          ['8:30 p.m.', '7:30 p.m.', '6:30 p.m.', '5:30 p.m.', 'East Coast finish may run late'],
        ]),
        p('Because official first-pitch times can be adjusted, convert the time only after checking the day’s official listing. Calendar apps sometimes preserve an old time even after a network or league page changes it. The safest method is to save the series dates, then update the exact start time on game day.'),
      ] },
      { id: 'series-scenarios', heading: 'How series results affect the remaining schedule', body: [
        h3('If a team leads 3-0'),
        p('Game 4 is a clinching opportunity. Game 5 appears on the official schedule, but it will not be played if the leading club wins Game 4. Do not plan a watch party for Game 5 without checking the series score after Game 4.'),
        h3('If the series is 2-2 after Game 4'),
        p('Game 5 is guaranteed. The winner of Game 5 leads 3-2, which means Game 6 is also guaranteed because the trailing team still has a path to four wins. Game 7 remains conditional until the trailing club wins Game 6.'),
        h3('If the series reaches 3-3'),
        p('Game 7 becomes the final possible game of the MLB season. It is the easiest viewing night to explain and often the hardest to access casually because more fans search for the same telecast, app tile or local channel at once. Check access early and avoid waiting until the pregame show is already underway.'),
      ] },
      { id: 'device-checklist', heading: 'Device compatibility and common viewer questions', body: [
        p('A World Series device plan should be boring on purpose. Use the screen you already know works, update the app the day before, sign in before the pregame show, and make sure the remote, HDMI input and Wi-Fi connection are stable. Most game-night problems are not baseball problems; they are account, device, app or local-channel problems discovered too late.'),
        ul([
          'For antenna viewers, test the local FOX signal before Game 1 and have a backup if reception is inconsistent.',
          'For live TV streaming viewers, search for FOX and FOX Deportes in the guide, not only for the team names.',
          'For app viewers, confirm whether the app requires a TV provider login, a separate subscription, or both.',
          'For mobile viewers, check whether casting or connected-TV playback is supported by the product you plan to use.',
        ]),
        p('MoaTV readers should also keep business claims separate from schedule facts. This article can help you understand the official World Series listing and prepare your device, but it does not state that MoaTV carries FOX, FOX Deportes, FOX One or any specific game. Any service-specific availability must come from verified MoaTV information and the viewer’s own local access.'),
      ] },
      { id: 'related-guides', heading: 'Related MoaTV guides for the baseball month', body: [
        p('Use the broader MLB Playoffs guide when you need Division Series or League Championship Series context. Use the October sports calendar when you need to compare World Series nights with NFL, WNBA, NBA or college football events. Keeping those intents separate prevents this World Series page from becoming a copy of the whole postseason article.'),
        links(articleLinks.ws),
      ] },
      { id: 'final-note', heading: 'World Series final viewing note', body: [
        p('The best World Series plan is simple: save the seven possible dates, mark Games 5 through 7 as conditional, confirm FOX-family access for the exact game, and test the device before the pregame window. Once the pennant winners are known, add team-specific reminders, but keep the official MLB schedule as the source of truth for dates and if-necessary status.'),
      ] },
    ],
    faq: [
      genericFaq('When is Game 1 of the 2026 World Series?', 'Game 1 is scheduled for Friday, October 23, 2026. MLB lists Games 5, 6 and 7 as if necessary.'),
      genericFaq('What network has the 2026 World Series?', 'MLB lists every 2026 World Series game on FOX, FOX Deportes and FOX One. Viewers still need to confirm local or account access to the listed service.'),
      genericFaq('Are the 2026 World Series teams known?', 'No. The teams are determined by the ALCS and NLCS winners, so any team-specific listing before those series end is speculative.'),
      genericFaq('What does home field depend on?', 'MLB lists Games 1, 2, 6 and 7 at the home of the league champion with the better 2026 regular-season record.'),
      genericFaq('Do World Series replays follow the same rules as live games?', 'Not always. Live rights and replay availability can differ, so check the provider or league product you plan to use.'),
    ],
    sources: [source.mlb],
  });
  attachRelated(article, 'ws');
}

{
  const article = find('nfl-october-2026-tv-guide');
  setArticle(article.slug, {
    intro: [
      'The NFL October 2026 TV picture runs from Week 4 spillover through Week 8, with Thursday Night Football, Sunday afternoon regional windows, Sunday Night Football, Monday Night Football and multiple international mornings all sharing the month with MLB, WNBA, NBA and college football. For U.S. viewers, the main challenge is not finding one master channel; it is knowing which games are national, which are local, which are out of market, and which can move under NFL flex rules.',
      'This month-level guide does not repeat the full Week 5 article. Instead, it explains the October structure, the confirmed anchor games, the London and international starts, the difference between national and local coverage, the major platform categories, and the specific checks a fan should make before each NFL weekend.',
    ],
    sections: [
      { id: 'month-map', heading: 'October 2026 NFL month at a glance', body: [
        p('October NFL viewing begins with Week 4 games that land on October 1-5 and continues through Week 8, which starts Thursday, October 29 and extends into November. That boundary matters because a simple “October NFL schedule” search can mix completed games, upcoming games and November spillover. For planning, treat the month as five weekly clusters rather than one continuous list.'),
        table(['Week', 'October dates', 'Confirmed anchor examples', 'Planning note'], [
          ['Week 4', 'Oct. 1-5', 'Steelers at Browns on Thursday; Colts vs. Commanders in London; Lions-Panthers SNF; Falcons-Saints MNF', 'Early-month games may already be completed by the time readers arrive'],
          ['Week 5', 'Oct. 8-12', 'Buccaneers at Cowboys TNF; Eagles at Jaguars in London; Ravens at Falcons SNF; Bills at Rams MNF', 'Use the dedicated Week 5 guide for every matchup'],
          ['Week 6', 'Oct. 15-19', 'Seahawks at Broncos TNF; Texans vs. Jaguars in London; Cowboys-Packers SNF; Commanders-49ers MNF', 'Another international morning changes Sunday timing'],
          ['Week 7', 'Oct. 22-26', 'Patriots at Bears TNF; Steelers-Saints in Saint-Denis; Chiefs-Seahawks SNF; Cowboys-Eagles MNF', 'International and primetime windows continue'],
          ['Week 8', 'Oct. 29-Nov. 2', 'Panthers at Packers TNF listed by Prime Video', 'Starts in October but finishes in November'],
        ]),
        p('This table is intentionally a map, not a replacement for NFL.com. Individual Sunday afternoon coverage depends on market assignment, and flex procedures can affect Sunday night or afternoon placement. The monthly guide is best used to identify which weekends need extra attention and which national windows should be tested in advance.'),
      ] },
      { id: 'national-local', heading: 'National windows versus local Sunday games', body: [
        image(article, 0),
        p('National windows are the easiest to explain. Thursday Night Football is tied to Prime Video with participating-market exceptions noted by Amazon and NFL sources. Sunday Night Football is an NBC/Peacock national window. Monday Night Football is generally an ESPN or ABC-family national window depending on the listing. International games can be national or exclusive to a league partner such as NFL Network, depending on the specific event.'),
        p('Sunday afternoon is different. CBS and FOX games are distributed regionally, so the game available to a viewer in Dallas can differ from the game available to a viewer in Boston at the same 1 p.m. ET window. A national schedule table can tell you every matchup, but it cannot tell every ZIP code which local affiliate will show which game until distribution maps and local guides settle.'),
        p('Out-of-market rules are the next layer. NFL Sunday Ticket is the product category associated with out-of-market Sunday afternoon games, while NFL+ live access in the United States is limited by device type and focuses on local and nationally televised games on phone or tablet. Provider logins can be required for connected TV or desktop access. Those distinctions are why a fan should choose the game first, then the platform, then the screen.'),
        table(['Window', 'Typical October access question', 'What to verify'], [
          ['Thursday night', 'Do I have Prime Video or a local participating-market option?', 'Amazon schedule, local station notes and device sign-in'],
          ['Sunday afternoon', 'Is my preferred game local or out of market?', 'CBS/FOX local guide, Sunday Ticket status and team market'],
          ['Sunday night', 'Can I receive NBC or Peacock?', 'NBC/Peacock availability and start time'],
          ['Monday night', 'Which ESPN/ABC listing applies this week?', 'Official NFL listing and provider access'],
          ['International morning', 'Which league or network partner has the special game?', 'NFL schedule page and app availability'],
        ]),
      ] },
      { id: 'international-games', heading: 'International games change the Sunday plan', body: [
        p('October 2026 includes multiple international NFL mornings. The Week 5 Eagles-Jaguars London game is listed for Sunday, October 11 at 9:30 a.m. ET. The broader month also includes other London or international games, including Colts-Commanders in the first October weekend and Texans-Jaguars later in the month according to the NFL’s international schedule context. These games create an all-day football rhythm for U.S. viewers.'),
        p('A 9:30 a.m. ET kickoff is 8:30 a.m. Central, 7:30 a.m. Mountain and 6:30 a.m. Pacific. That means West Coast viewers are dealing with breakfast-hour football, while East Coast viewers can move almost directly from the international game into the 1 p.m. Sunday slate. If your household shares one screen, the international window can either solve conflicts by finishing early or create a longer day that requires more device planning.'),
        p('Do not infer local stadium names, local simulcast rules or app availability beyond what the official listing states. International games are special-event windows and can differ from ordinary Sunday distribution. The safe approach is to check NFL.com for the matchup, time and listed partner, then check your app or provider guide for that exact event.'),
      ] },
      { id: 'primetime-and-flex', heading: 'Primetime anchors and flex scheduling', body: [
        p('October primetime gives the month its predictable spine: Prime Video’s Thursday schedule includes Steelers-Browns on October 1, Buccaneers-Cowboys on October 8, Seahawks-Broncos on October 15, Patriots-Bears on October 22 and Panthers-Packers on October 29. Sunday and Monday night games then close each NFL week. These windows are easier to plan than regional Sunday afternoon coverage because they are intended for national audiences.'),
        p('Flex scheduling adds caution. NFL flexible scheduling begins in Week 5 and can affect Sunday night from Weeks 5-18, with limits early in the season. The league explains that Sunday afternoon games can move into the Sunday night window and that the originally listed Sunday night game can move to an afternoon slot. Thursday and Monday games are not handled the same way under the standard flex explanation.'),
        p('The practical effect is that October viewers should treat Sunday night listings as strong but not untouchable, especially after the early weeks. The NFL’s own procedure emphasizes advance notice, but the safest habit is to recheck Sunday night and late-afternoon listings about two weeks out, then again during game week. That matters for childcare, travel, recordings and shared-screen households.'),
      ] },
      { id: 'platforms', heading: 'Streaming availability distinctions for U.S. viewers', body: [
        p('A good NFL October plan distinguishes live television, streaming simulcast, mobile-only access, replays and out-of-market access. NFL support materials describe CBS and FOX as Sunday afternoon local-market networks, NBC as Sunday Night Football, ESPN/ABC as Monday Night Football, Amazon Prime Video as Thursday Night Football, NFL Network as a home for select exclusive games including some international games, and Sunday Ticket as the out-of-market Sunday afternoon path.'),
        p('NFL+ is not the same thing as every live NFL game on every screen. NFL support describes live local and nationally televised regular-season games on phone and tablet, plus replays on supported devices. That is helpful for fans who watch on mobile, but it is not a substitute for out-of-market Sunday afternoon access on a living-room TV. If a fan is away from home, device type and location can matter as much as subscription status.'),
        p('For MoaTV readers, the most responsible guidance is to keep official access categories separate from MoaTV setup decisions. This article does not say MoaTV carries CBS, FOX, NBC, ESPN, Prime Video, NFL Network or Sunday Ticket. It tells you which official categories to check and then points you to MoaTV device and pricing pages only for verified setup context.'),
      ] },
      { id: 'weekly-examples', heading: 'Practical weekly viewing examples', body: [
        h3('Favorite team in your local market'),
        p('If your favorite team is assigned to your local CBS or FOX station on Sunday afternoon, your plan is mostly about confirming the local affiliate and avoiding conflicts with other household events. Check the provider guide by ZIP code, then test the TV input or streaming app that carries the local station.'),
        h3('Favorite team out of market'),
        p('If your team is out of market and plays Sunday afternoon, the monthly NFL schedule will show the game but may not give you live local access. That is when out-of-market rules and Sunday Ticket become relevant. If the same team plays Thursday, Sunday night, Monday night or internationally, the access path can be entirely different in the same month.'),
        h3('Shared sports household'),
        p('October creates conflicts with MLB postseason, WNBA playoffs, NBA Opening Night and college football. Decide which NFL windows are fixed national events, which are regional and which can be watched later. A single living-room screen can work if the household assigns mobile or tablet viewing for secondary games before Sunday arrives.'),
      ] },
      { id: 'time-zone-and-byes', heading: 'Time zones, byes and game-week verification', body: [
        p('NFL schedules are commonly read in Eastern Time. A Thursday or Monday 8:15 p.m. ET kickoff is 7:15 p.m. Central, 6:15 p.m. Mountain and 5:15 p.m. Pacific. A Sunday night 8:20 p.m. ET kickoff is 7:20 p.m. Central, 6:20 p.m. Mountain and 5:20 p.m. Pacific. International 9:30 a.m. ET games become very early on the West Coast.'),
        table(['ET kickoff', 'Central', 'Mountain', 'Pacific', 'Typical NFL window'], [
          ['9:30 a.m.', '8:30 a.m.', '7:30 a.m.', '6:30 a.m.', 'International morning'],
          ['1:00 p.m.', '12:00 p.m.', '11:00 a.m.', '10:00 a.m.', 'Early Sunday regional'],
          ['4:05/4:25 p.m.', '3:05/3:25 p.m.', '2:05/2:25 p.m.', '1:05/1:25 p.m.', 'Late Sunday regional'],
          ['8:15/8:20 p.m.', '7:15/7:20 p.m.', '6:15/6:20 p.m.', '5:15/5:20 p.m.', 'Primetime'],
        ]),
        p('Byes matter because they remove teams from the slate and change fantasy, betting and fan-viewing habits. Week 5, for example, lists Carolina and Kansas City on bye. Later October weeks list different teams. If a favorite team disappears from the Sunday grid, check the bye list before assuming a listing is missing.'),
      ] },
      { id: 'related-guides', heading: 'Use the right NFL guide for the job', body: [
        p('Use this page when you want the month-level NFL structure: international games, national windows, flex rules and platform categories. Use the Week 5 guide when you need every October 8-12 matchup, the London game, the byes and the precise Week 5 viewing decisions. Use the October sports calendar when baseball, basketball or college football conflicts are the bigger problem.'),
        links(articleLinks.nfl),
      ] },
      { id: 'final-note', heading: 'October NFL viewing checklist', body: [
        p('For each October NFL week, start with NFL.com, identify whether the game is national, local, international or out of market, then confirm the platform and device. Recheck Sunday night games close to kickoff because flex rules exist, and recheck Sunday afternoon games locally because CBS and FOX regional assignments are not the same for every viewer.'),
      ] },
    ],
    faq: [
      genericFaq('What are the NFL viewing windows in October 2026?', 'October includes Thursday night, Sunday international mornings, Sunday afternoon regional windows, Sunday night and Monday night. Some weeks also include byes and schedule notes that require game-week verification.'),
      genericFaq('Which NFL London games are in October 2026?', 'The October schedule includes international games such as Eagles-Jaguars in London on October 11 at 9:30 a.m. ET, plus other international windows in nearby weeks. Confirm each listing on NFL.com.'),
      genericFaq('How do local NFL broadcasts differ from national games?', 'CBS and FOX Sunday afternoon games are distributed by market, while Thursday, Sunday night, Monday night and some international games are national or special windows. Your ZIP code can decide which Sunday afternoon game you see.'),
      genericFaq('How does NFL flex scheduling affect October?', 'Flex scheduling begins in Week 5 and can move eligible Sunday afternoon games into Sunday night, subject to NFL procedures and notice rules. Recheck listings during game week.'),
      genericFaq('Can NFL+ replace Sunday Ticket for out-of-market games?', 'No. NFL support describes NFL+ live access as local and nationally televised games on phone and tablet, while out-of-market Sunday afternoon games require Sunday Ticket.'),
    ],
    sources: [source.nfl5, source.nflFlex, source.nflAccess, source.primeTnf],
  });
  attachRelated(article, 'nfl');
}

{
  const article = find('nfl-week-5-viewing-guide-2026');
  setArticle(article.slug, {
    intro: [
      'NFL Week 5 in 2026 runs from Thursday, October 8 through Monday, October 12 in Eastern Time listings, with 15 games and two teams on bye. The official slate includes Buccaneers at Cowboys on Thursday night, Eagles at Jaguars in London on Sunday morning, a full Sunday regional schedule, Ravens at Falcons on Sunday night and Bills at Rams on Monday night. Carolina and Kansas City are the listed bye teams.',
      'This page is intentionally narrower than the NFL October guide. It focuses on the exact Week 5 matchups, how to read home and away order, which windows are national, which Sunday games depend on local distribution, how to convert kickoff times, and what can still change under NFL procedures.',
    ],
    sections: [
      { id: 'schedule-table', heading: 'Complete NFL Week 5 2026 schedule table', body: [
        p('NFL schedules list the away team first and the home or designated home team second. For international games, that second team may be the designated home club even though the game is played at a neutral international venue. The table below uses Eastern Time and groups the week by viewing window.'),
        table(['Game', 'Date', 'Time ET', 'Window', 'Viewing note'], [
          ['Buccaneers at Cowboys', 'Thu., Oct. 8', '8:15 p.m.', 'Thursday night', 'Prime Video national window with local-market exceptions to verify'],
          ['Eagles at Jaguars', 'Sun., Oct. 11', '9:30 a.m.', 'London', 'Early international window'],
          ['Bengals at Dolphins', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Regional CBS/FOX-style local distribution to verify'],
          ['Bears at Packers', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Divisional matchup; check local market'],
          ['Giants at Vikings', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Regional game'],
          ['Jets at Patriots', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Regional game'],
          ['Saints at Lions', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Regional game'],
          ['Titans at Texans', 'Sun., Oct. 11', '1:00 p.m.', 'Sunday early', 'Regional game'],
          ['Commanders at Cardinals', 'Sun., Oct. 11', '4:05 p.m.', 'Sunday late', 'Late regional window'],
          ['Broncos at Chargers', 'Sun., Oct. 11', '4:05 p.m.', 'Sunday late', 'Late regional window'],
          ['49ers at Seahawks', 'Sun., Oct. 11', '4:25 p.m.', 'Sunday late', 'Late regional window'],
          ['Ravens at Falcons', 'Sun., Oct. 11', '8:20 p.m.', 'Sunday night', 'National Sunday night window'],
          ['Bills at Rams', 'Mon., Oct. 12', '8:15 p.m.', 'Monday night', 'National Monday night window'],
        ]),
        p('Some official pages expose local time through browser settings, which can make the same game appear as an overnight time if the page converts from Eastern Time. For U.S. planning, use the NFL listing and your local guide together. If a date appears one day later because of time-zone conversion, confirm the Eastern Time kickoff before changing your calendar.'),
      ] },
      { id: 'thursday-london', heading: 'Thursday opener and the Week 5 London game', body: [
        image(article, 0),
        p('Week 5 opens with Buccaneers at Cowboys in the Thursday night window. Amazon’s 2026 Thursday Night Football schedule lists the matchup for October 8 at 8:15 p.m. ET. A viewer should separate the kickoff from pregame programming, because app tiles and guide entries may begin earlier than the game itself. If you live in a participating local market, check the local station option separately from the Prime Video national path.'),
        p('The Eagles-Jaguars game creates the week’s most unusual timing. It is listed for Sunday, October 11 at 9:30 a.m. ET from London. That is 8:30 a.m. Central, 7:30 a.m. Mountain and 6:30 a.m. Pacific. West Coast fans who want to watch live should test the app the night before, because troubleshooting at 6:20 a.m. local time is a miserable way to start football Sunday.'),
        p('International games also change the emotional shape of the slate. A fan can watch London football, roll into the 1 p.m. games, keep one eye on the late window, and still have Sunday Night Football at 8:20 p.m. ET. The long day is fun if planned; it becomes frustrating if every window requires a new login or if the main screen is shared with MLB postseason games.'),
      ] },
      { id: 'sunday-slate', heading: 'How to interpret the Sunday regional slate', body: [
        p('Week 5 has a broad Sunday afternoon slate, but the presence of a game in the official schedule does not mean every viewer receives that game on a local station. Regional distribution still decides which CBS or FOX game appears in each market. A fan in the home market of one team may receive that team’s game, while a fan across the country may need an out-of-market product if the game is not selected locally.'),
        p('The early window includes divisional and conference matchups that can overlap completely. If two games you care about both kick at 1 p.m. ET, choose the legally available main-screen option first and use highlights, audio, mobile viewing or replays for the secondary game only if your access permits it. Do not rely on channel flipping if your local guide only carries one of them.'),
        p('The late window is smaller and can be easier to manage, but it creates different regional pressures. Western teams often appear in the 4:05 or 4:25 p.m. ET slots, and markets with local teams in that window may have fewer alternative games available. The correct question is always local: “Which game is my affiliate assigned to carry?”'),
      ] },
      { id: 'primetime', heading: 'Sunday Night Football and Monday Night Football in Week 5', body: [
        p('The Week 5 Sunday night listing is Ravens at Falcons at 8:20 p.m. ET. Sunday night is the first place many casual fans look because it feels national and easy to find, but Week 5 is also the beginning of the flexible scheduling period. The NFL explains that Sunday afternoon games can move into Sunday night under specific rules and notice timing, so viewers should recheck the listing close to game week.'),
        p('The Monday night listing is Bills at Rams at 8:15 p.m. ET. Monday games are not treated the same way as standard Sunday night flex candidates in the NFL’s basic flex explanation. Even so, a viewer should still confirm the network, app access and kickoff time because provider listings and alternate feeds can create confusion on game day.'),
        p('Primetime viewing tends to concentrate traffic. If you plan to use a streaming app, open it during pregame rather than at kickoff. If you plan to watch through a provider login, make sure the login has not expired. If you plan to cast from a phone to a TV, test the cast path before the game window.'),
      ] },
      { id: 'time-zone-table', heading: 'Week 5 kickoff time conversions', body: [
        table(['ET kickoff', 'Central', 'Mountain', 'Pacific', 'Week 5 use case'], [
          ['9:30 a.m.', '8:30 a.m.', '7:30 a.m.', '6:30 a.m.', 'Eagles-Jaguars London'],
          ['1:00 p.m.', '12:00 p.m.', '11:00 a.m.', '10:00 a.m.', 'Early Sunday regional games'],
          ['4:05 p.m.', '3:05 p.m.', '2:05 p.m.', '1:05 p.m.', 'Some late regional games'],
          ['4:25 p.m.', '3:25 p.m.', '2:25 p.m.', '1:25 p.m.', 'Featured late regional slot'],
          ['8:15 p.m.', '7:15 p.m.', '6:15 p.m.', '5:15 p.m.', 'Thursday and Monday night'],
          ['8:20 p.m.', '7:20 p.m.', '6:20 p.m.', '5:20 p.m.', 'Sunday night'],
        ]),
        p('Time conversion is not just convenience. It affects whether a game conflicts with work, dinner, children’s routines, another sport or a commute. Week 5 has every major NFL time shape: Thursday night, international morning, early Sunday, late Sunday, Sunday night and Monday night. That makes it a useful example of the whole NFL viewing system.'),
      ] },
      { id: 'access-decisions', heading: 'How to confirm local broadcasts and access', body: [
        p('Start with the official NFL Week 5 page to confirm the matchup and time. Then use your local TV guide, live TV service guide or provider app to confirm whether the game is actually available where you are. If the game is local or nationally televised, one access path may apply; if it is out of market on Sunday afternoon, Sunday Ticket may be the relevant product category.'),
        p('NFL+ can be helpful, but the device distinction matters. NFL support describes live local and nationally televised games on phone and tablet, with full and condensed replays available on supported devices. That does not mean a fan can watch every out-of-market Sunday afternoon game live on a connected TV through NFL+. Read the product’s live access rules before counting on it.'),
        ul([
          'Check official matchup and kickoff on NFL.com.',
          'Check local station or live TV guide by ZIP code.',
          'Identify whether the game is national, local, international or out of market.',
          'Test the exact device before kickoff.',
          'Keep a replay or highlights plan for games you cannot watch live.',
        ]),
      ] },
      { id: 'byes-and-changes', heading: 'Byes, schedule changes and practical examples', body: [
        p('Carolina and Kansas City are the listed Week 5 bye teams. A bye can look like a missing game if you only follow one team, so check the bye list before searching for a nonexistent kickoff. Byes also affect fantasy lineups and shared-household priorities because fans of those teams may focus on rival games, standings or other sports during the week.'),
        p('A practical Sunday itinerary might look like this: watch Eagles-Jaguars in the morning, choose one 1 p.m. local game, use a second device for late-window updates, then treat Ravens-Falcons as the shared national night game. If your household also watches MLB playoffs, decide before Sunday which sport gets the largest screen at each hour.'),
        p('The most common Week 5 mistake is treating the schedule as an access guarantee. It is not. The schedule tells you what the league has listed. Your location, provider, app, device and market decide how you actually watch.'),
      ] },
      { id: 'related-guides', heading: 'Related Week 5 planning links', body: [
        p('Use the month-level NFL October guide when you want flex rules, other October international games and platform categories. Use the October sports calendar when the Week 5 slate overlaps with baseball playoffs, college football or WNBA postseason games.'),
        links(articleLinks.nfl5),
      ] },
    ],
    faq: [
      genericFaq('When is NFL Week 5 in 2026?', 'Week 5 runs from Thursday, October 8 through Monday, October 12 in Eastern Time scheduling.'),
      genericFaq('What is the London game in NFL Week 5?', 'Eagles at Jaguars is listed for Sunday, October 11 at 9:30 a.m. ET in London.'),
      genericFaq('Who plays Sunday night in Week 5?', 'Ravens at Falcons is the listed Sunday night game at 8:20 p.m. ET, subject to normal NFL schedule verification.'),
      genericFaq('Which teams are on bye in Week 5?', 'The NFL Week 5 page lists the Panthers and Chiefs on bye.'),
      genericFaq('Do all viewers get every Sunday afternoon game?', 'No. Sunday afternoon games are regionally distributed unless you have an appropriate out-of-market option. Check your local guide and provider.'),
    ],
    sources: [source.nfl5, source.nflFlex, source.nflAccess, source.primeTnf],
  });
  attachRelated(article, 'nfl5');
}

{
  const article = find('nba-opening-night-2026-watch-guide');
  setArticle(article.slug, {
    intro: [
      'NBA Opening Night 2026 is Tuesday, October 20, and the official NBA schedule lists an NBC/Peacock tripleheader: Celtics at Pistons at 3 p.m. ET, 76ers at Knicks at 7 p.m. ET, and Thunder at Spurs at 9:30 p.m. ET. That is the direct answer most U.S. viewers need, but the useful plan also includes time-zone conversion, NBC versus Peacock access, League Pass blackout awareness, device checks and the difference between Opening Night, opening week and the NBA Cup.',
      'This article focuses only on the first night of the 2026-27 NBA regular season. The broader season guide covers recurring national windows, Christmas, Play-In and playoffs. The NBA Cup guide covers Group Play and December knockout rounds. Keeping those topics separate makes Opening Night easier to plan and prevents a one-night watch guide from becoming a generic NBA season explainer.',
    ],
    sections: [
      { id: 'opening-night-schedule', heading: 'NBA Opening Night 2026 official schedule', body: [
        p('The official Opening Night slate is unusually viewer-friendly because all three games are tied to one national NBC/Peacock presentation. The first game starts in the afternoon, the second game anchors the traditional East Coast prime-time window, and the third game closes the night with a late national matchup. A fan who wants to watch all three should plan for a long broadcast day rather than a single evening game.'),
        table(['Game', 'Date', 'Time ET', 'Coverage', 'Planning note'], [
          ['Boston Celtics at Detroit Pistons', 'Tue., Oct. 20', '3:00 p.m.', 'NBC/Peacock', 'Afternoon start; workday conflict for many U.S. viewers'],
          ['Philadelphia 76ers at New York Knicks', 'Tue., Oct. 20', '7:00 p.m.', 'NBC/Peacock', 'Prime-time game and Knicks banner-night context'],
          ['Oklahoma City Thunder at San Antonio Spurs', 'Tue., Oct. 20', '9:30 p.m.', 'NBC/Peacock', 'Late window; West Coast-friendly, East Coast late finish'],
        ]),
        p('The schedule also places NBA Showtime pregame coverage before the evening window, according to NBA release context. Viewers should check the exact guide entry because a pregame show, team introductions and tipoff are not always the same timestamp. If the goal is to catch the start of play, set the reminder for the listed tipoff. If the goal is ceremony and context, join earlier.'),
      ] },
      { id: 'matchups', heading: 'What each Opening Night matchup means for viewers', body: [
        image(article, 0),
        h3('Celtics at Pistons'),
        p('The first game is the hardest to watch live for many working viewers because it starts at 3 p.m. ET. That is noon Pacific and falls inside school or work hours for much of the country. If you cannot watch live, decide whether a legal replay, highlights package or later recap is enough before you build the rest of the night around the tripleheader.'),
        h3('76ers at Knicks'),
        p('The Knicks game is the classic Opening Night centerpiece because the NBA schedule release frames it around Madison Square Garden and a championship-banner setting. That does not change the viewing rights; it changes the value of joining before tipoff. If you care about ceremonies, player introductions and studio context, the pregame window matters more than usual.'),
        h3('Thunder at Spurs'),
        p('The final game gives the night a Western Conference finish. At 9:30 p.m. ET, it starts at 8:30 p.m. Central, 7:30 p.m. Mountain and 6:30 p.m. Pacific. East Coast viewers should expect a late ending; West Coast viewers get a more comfortable evening slot. If you are recording the game, add extra time because season openers can include ceremonies, reviews and extended halftime coverage.'),
      ] },
      { id: 'watching-options', heading: 'How to watch: NBC, Peacock, local listings and League Pass', body: [
        p('The NBA lists Opening Night on NBC and Peacock. NBC means many viewers will look first for a local NBC station through antenna, cable, satellite or a live TV streaming service. Peacock means viewers may use the Peacock app or platform support where available. The correct path depends on the viewer’s subscriptions, device support and location.'),
        p('NBA League Pass should not be treated as the answer for national live games in the United States. The NBA League Pass blackout guide says U.S. blackouts include local NBA team games and all nationally broadcast games, with nationally broadcast-game replays becoming available at 6 a.m. ET the following day. That makes League Pass useful for many out-of-market regular-season games, but it is not the same as live access to an NBC/Peacock national tripleheader.'),
        p('Local listings still matter because NBC station availability can vary by service and ZIP code. If you rely on an antenna, test reception. If you rely on a live TV streaming service, confirm your local NBC station is included. If you rely on Peacock, open the app early, update it, and verify that the live sports tile appears on the device you plan to use.'),
      ] },
      { id: 'time-zones', heading: 'Opening Night time zones and full-night planning', body: [
        table(['Game', 'ET', 'Central', 'Mountain', 'Pacific'], [
          ['Celtics at Pistons', '3:00 p.m.', '2:00 p.m.', '1:00 p.m.', '12:00 p.m.'],
          ['76ers at Knicks', '7:00 p.m.', '6:00 p.m.', '5:00 p.m.', '4:00 p.m.'],
          ['Thunder at Spurs', '9:30 p.m.', '8:30 p.m.', '7:30 p.m.', '6:30 p.m.'],
        ]),
        p('The early start is the defining schedule detail. A viewer in Los Angeles who wants all three games starts at noon. A viewer in New York may still be watching near midnight. A viewer in Chicago gets an afternoon, evening and late-evening sequence. That spread is why “watch NBA Opening Night” can mean very different things for different households.'),
        p('A practical full-night plan is to identify one must-watch game, one flexible game and one replay candidate. For example, a Knicks fan may prioritize the 7 p.m. game and treat the afternoon game as highlights. A Thunder or Spurs fan may ignore the first two games and prepare for the 9:30 p.m. start. A neutral fan may put the whole tripleheader on one screen and keep baseball or WNBA updates on another.'),
      ] },
      { id: 'device-prep', heading: 'Device viewing guidance and pregame preparation', body: [
        p('Opening Night is a bad time to discover that a TV app needs an update. The smart approach is to choose the device the day before, open NBC or Peacock, confirm the account, test audio, and make sure the app works on the specific screen you plan to use. A phone stream that works does not prove a connected-TV app or casting setup will behave the same way.'),
        ul([
          'Check whether you will watch through local NBC, Peacock or another legal live TV service.',
          'Confirm that the device supports the app and that the account is signed in.',
          'Check whether nationally televised live games are blacked out on League Pass in your location.',
          'Set separate reminders for the 3 p.m., 7 p.m. and 9:30 p.m. ET tipoffs.',
          'Add recording padding or replay plans if you cannot watch the full tripleheader live.',
        ]),
        p('If a stream buffers or fails, switch troubleshooting order: internet connection, app status, account sign-in, device restart, then alternate legal access path. Do not wait until the opening tip to discover that your preferred app has signed you out.'),
      ] },
      { id: 'opening-week-cup', heading: 'Opening Night versus opening week and the NBA Cup', body: [
        p('Opening Night is the start of the regular season, not the entire opening week. ESPN has opening-week doubleheaders after the Tuesday tripleheader, and Prime Video opens its Friday NBA schedule on October 23. Those games matter for the broader season, but they are not part of the first-night tripleheader that this article owns.'),
        p('Opening Night is also separate from the NBA Cup. The NBA Cup starts on October 30 with Group Play. Cup games can count in the regular-season standings, but the tournament has its own groups, tiebreakers and December knockout path. If your question is “What is on October 20?”, stay here. If your question is “How does the in-season tournament work?”, use the Cup guide.'),
        links(articleLinks.nbaOpen),
      ] },
      { id: 'common-problems', heading: 'Common Opening Night questions and fixes', body: [
        p('The most common Opening Night confusion is mixing “broadcast on NBC and Peacock” with “available on every basketball product.” A nationally televised game can be promoted through the NBA schedule but still require the correct NBC or Peacock access in the United States. League Pass live blackouts are a separate issue and should be checked before relying on that product.'),
        p('Another common issue is time. The first game begins while many viewers are busy, and the last game ends late in the East. Use the time-zone table to decide which games are live priorities. If you only have one screen and multiple sports overlap, reserve the main screen for the game you care about most and use official highlights or replay options for the rest.'),
      ] },
      { id: 'final-note', heading: 'Opening Night final checklist', body: [
        p('Before October 20, confirm the three tipoff times, choose NBC or Peacock access, test the device, and decide whether League Pass replay timing is enough for any game you cannot watch live. Opening Night is a celebration, but the viewing plan works best when it is specific: one date, three games, one verified access path per household.'),
      ] },
    ],
    faq: [
      genericFaq('When is NBA Opening Night 2026?', 'NBA Opening Night is Tuesday, October 20, 2026.'),
      genericFaq('What games are on NBA Opening Night 2026?', 'The official slate is Celtics at Pistons at 3 p.m. ET, 76ers at Knicks at 7 p.m. ET, and Thunder at Spurs at 9:30 p.m. ET.'),
      genericFaq('What channel has NBA Opening Night?', 'The NBA lists all three Opening Night games on NBC and Peacock. Viewers should confirm local NBC or Peacock access on their chosen device.'),
      genericFaq('Is NBA Opening Night the same as the NBA Cup?', 'No. Opening Night starts the regular season on October 20. NBA Cup Group Play begins October 30.'),
      genericFaq('Can I watch the Opening Night tripleheader live on NBA League Pass in the U.S.?', 'Nationally broadcast games are blacked out live on League Pass in the United States, with replays generally available at 6 a.m. ET the next day. Check the NBA blackout guide for current rules.'),
    ],
    sources: [source.nbaSeason, source.nbaDates, source.nbaBlackout],
  });
  attachRelated(article, 'nbaOpen');
}

{
  const article = find('nba-2026-27-viewing-guide');
  setArticle(article.slug, {
    intro: [
      'The 2026-27 NBA regular season starts Tuesday, October 20, 2026 and concludes Sunday, April 11, 2027, with all 30 teams scheduled on the final day. The national viewing landscape includes Disney platforms, NBCUniversal platforms and Amazon’s Prime Video, while local and out-of-market access still depends on regional rights, nationally televised-game blackouts and the viewer’s location. A season guide has to connect those pieces without pretending every game lives in one place.',
      'Use this page for the season structure: opening week, national broadcast partners, recurring windows, NBA Cup integration, Christmas, League Pass restrictions, Play-In and playoffs. Use the Opening Night guide for the October 20 tripleheader and the NBA Cup guide for tournament rules and tiebreakers.',
    ],
    sections: [
      { id: 'season-structure', heading: 'NBA 2026-27 season structure and key dates', body: [
        p('The NBA’s 81st regular season begins October 20 and runs through April 11. The regular season includes 82 games for each team, but at schedule release only 80 were assigned for each club because two games are determined after NBA Cup Group Play. That scheduling wrinkle matters because December planning depends on which teams qualify for the Cup knockout rounds and which teams need assigned regular-season games against non-qualifiers.'),
        table(['Date or range', 'Season item', 'Viewer meaning'], [
          ['Oct. 20, 2026', 'Regular season begins', 'NBC/Peacock Opening Night tripleheader'],
          ['Oct. 23, 2026', 'Prime Video Friday opener', 'National streaming window joins opening week'],
          ['Oct. 30-Nov. 27', 'NBA Cup Group Play', 'Cup games also count in regular-season standings'],
          ['Dec. 4-11', 'NBA Cup knockout/championship window', 'Some matchups are determined by Group Play results'],
          ['Dec. 25, 2026', 'Christmas Day', 'Five-game national holiday slate on ABC/ESPN/ESPN App'],
          ['Apr. 11, 2027', 'Regular season ends', 'All 30 teams in action'],
          ['After Apr. 11', 'Play-In and playoffs', 'Postseason access and schedule rules take over'],
        ]),
        p('The most important season-planning lesson is that national windows and local team-following are different tasks. A casual fan can follow marquee windows. A team fan needs local broadcasts, national blackouts, League Pass replay rules and calendar maintenance.'),
      ] },
      { id: 'national-partners', heading: 'National broadcasting partners and recurring windows', body: [
        image(article, 0),
        p('The NBA says the 2026-27 national schedule is attached to Disney, NBCUniversal and Amazon. NBA viewing guidance describes a pattern in which Mondays are on Peacock, Tuesdays on NBC/Peacock, Wednesdays on ESPN, Thursdays on Prime Video, Fridays on Prime Video and ESPN, Saturdays on Prime Video in the afternoon and ABC at night, and Sundays on ABC in the afternoon plus NBC/Peacock at night beginning later in the season. Exact games still require the official schedule.'),
        table(['Partner family', 'Examples from official NBA guidance', 'Viewer check'], [
          ['Disney', 'ABC, ESPN, ESPN Radio, ESPN App', 'Confirm whether the game is on ABC, ESPN or app-authenticated access'],
          ['NBCUniversal', 'NBC, Peacock, NBCSN', 'Check local NBC, Peacock subscription and device support'],
          ['Amazon', 'Prime Video', 'Confirm Prime Video account and app support'],
          ['NBA League Pass', 'Out-of-market regular-season product with blackouts', 'Check local and national restrictions by location'],
        ]),
        p('A weekly pattern is helpful, but it should not replace the official schedule. A Friday game can be a Prime Video game, an ESPN game, a local-only game or a Cup game depending on date and matchup. The viewer’s task is to read the exact listing rather than assume the weekday alone decides access.'),
      ] },
      { id: 'opening-week', heading: 'Opening week without duplicating Opening Night', body: [
        p('Opening week starts with the October 20 NBC/Peacock tripleheader, then continues with ESPN doubleheaders and Prime Video’s Friday opener. The season guide cares about those games because they reveal the national partner mix. The Opening Night article owns the detailed one-night plan, including the Celtics-Pistons, 76ers-Knicks and Thunder-Spurs schedule.'),
        p('After the first night, ESPN’s opening-week games and Prime Video’s Friday doubleheader show why the season cannot be planned around a single app. A viewer may need NBC/Peacock on Tuesday, ESPN/ESPN App on Wednesday or Thursday, and Prime Video on Friday. A team fan may also need regional access for games that are not nationally selected.'),
        links(articleLinks.nbaSeason),
      ] },
      { id: 'nba-cup-integration', heading: 'How the NBA Cup fits the regular season', body: [
        p('The NBA Cup begins October 30 with Group Play and runs through a December 11 championship at Hinkle Fieldhouse in Indianapolis. Group Play games count as regular-season games, and the tournament affects the schedule because the final two regular-season games for each team are determined after Group Play. That is why the NBA released 80 assigned games per team first.'),
        p('Cup integration creates two separate questions. The first is tournament qualification: which teams win groups or wild cards and move into the knockout rounds? The second is ordinary season accounting: which December games fill the schedule for teams that do not advance? A season viewer should understand both, but a full Cup rules explanation belongs in the NBA Cup guide.'),
        p('The practical season effect is that early December contains uncertainty by design. Do not panic if your favorite team’s schedule appears incomplete around that window. The NBA uses Cup results to determine some assignments, so the official schedule becomes clearer after Group Play.'),
      ] },
      { id: 'christmas-playin-playoffs', heading: 'Christmas, Play-In Tournament and playoffs', body: [
        p('Christmas remains one of the NBA’s largest regular-season national windows. The NBA says the league will feature five games on Christmas Day for the 19th consecutive year, with the matchups available on ABC, ESPN and the ESPN App. For season planning, that means December 25 is a national day even for viewers who do not follow every weeknight window.'),
        p('The Play-In Tournament follows the regular season and determines the final playoff seeds in each conference. Viewers should treat it as a postseason-adjacent event with its own schedule and national coverage, not as a normal regular-season week. By the time the Play-In arrives, local broadcast habits may no longer be enough because the national postseason windows become central.'),
        p('The playoffs and Finals carry their own rights structure. NBA viewing guidance says ESPN platforms are the exclusive home of the NBA Finals on ABC and also broadcast playoff games. The exact 2027 playoff schedule should be checked when it is released, because first-round matchups, game times and if-necessary games depend on seeding and series results.'),
      ] },
      { id: 'league-pass-local', heading: 'Regional broadcasts, League Pass and blackout restrictions', body: [
        p('Local versus national access is the season’s most common confusion. A local team game may be unavailable live on League Pass inside the team’s market because a regional content provider has the live rights. A nationally broadcast game may also be unavailable live on League Pass in the United States because national partners have exclusive live windows.'),
        p('The NBA League Pass blackout guide says U.S. local team games become available as replays three days after the live broadcast concludes, while nationally broadcast games become available at 6 a.m. ET the following day. It also says device location and ZIP code can affect blackout restrictions. Those details matter for travelers, students, remote workers and fans who split time between markets.'),
        p('A favorite-team plan should therefore start with location. Are you in the team’s home market? Is the game nationally televised? Is it a Cup semifinal, playoff or Finals game? Are you trying to watch live or the next morning? The answer can change from game to game even for the same team.'),
      ] },
      { id: 'examples', heading: 'Three favorite-team viewing scenarios', body: [
        h3('In-market fan'),
        p('An in-market fan should identify the regional provider first, then add national windows. League Pass may still be useful for other teams, but it is not the live path for local team games that are blacked out in that market.'),
        h3('Out-of-market fan'),
        p('An out-of-market fan may use League Pass for many regular-season games, but national games still follow national blackout rules. If the team is selected for NBC, ESPN, ABC or Prime Video, check that partner rather than assuming League Pass live access.'),
        h3('National-only viewer'),
        p('A national-only viewer can build a lighter plan around Opening Night, weekly national windows, NBA Cup knockout games, Christmas, MLK Day, All-Star, Play-In and playoffs. This viewer needs fewer local checks but should still confirm each platform.'),
      ] },
      { id: 'final-note', heading: 'Season viewing checklist', body: [
        p('Build the 2026-27 NBA season plan in layers: national windows, favorite-team local access, NBA Cup dates, holiday games, then postseason transitions. Keep the official NBA schedule handy, and update your calendar after Cup Group Play because some December games are intentionally not assigned until results are known.'),
      ] },
    ],
    faq: [
      genericFaq('When does the 2026-27 NBA season start?', 'The regular season starts Tuesday, October 20, 2026.'),
      genericFaq('What networks carry national NBA games in 2026-27?', 'The NBA lists national schedules for Disney platforms, NBCUniversal platforms and Amazon Prime Video. Exact games depend on the official listing.'),
      genericFaq('When does NBA Cup play begin?', 'NBA Cup Group Play begins October 30, 2026 and runs through November 27 before the December knockout window.'),
      genericFaq('How is this different from an Opening Night guide?', 'This season guide explains the full viewing landscape. The Opening Night guide focuses only on the October 20 tripleheader.'),
      genericFaq('How do NBA League Pass blackouts work in the United States?', 'Local team games and nationally broadcast games can be unavailable live on League Pass. Replays have different availability windows, including 6 a.m. ET next-day access for nationally broadcast games.'),
    ],
    sources: [source.nbaSeason, source.nbaWatch, source.nbaDates, source.nbaCup, source.nbaBlackout],
  });
  attachRelated(article, 'nbaSeason');
}

{
  const article = find('2026-nba-cup-guide');
  setArticle(article.slug, {
    intro: [
      'The 2026 NBA Cup starts Friday, October 30 with Group Play and ends Friday, December 11 with the championship at Hinkle Fieldhouse in Indianapolis. The tournament has two stages: Group Play and the Knockout Rounds. Every team plays four designated Group Play games, group winners and wild cards advance, and the championship is a winner-take-all game that does not count in the regular-season standings.',
      'This guide focuses on the tournament itself: groups, standings, tiebreakers, knockout qualification, national broadcast notes, how Cup games interact with the regular season, and worked examples that show why point differential and total points can matter. For the full season calendar, use the NBA 2026-27 viewing guide. For the first night of basketball, use the Opening Night article.',
    ],
    sections: [
      { id: 'cup-calendar', heading: '2026 NBA Cup phase-by-phase schedule', body: [
        p('The NBA Cup calendar begins in October, runs through November on designated Cup Nights, and finishes in December. Group Play games are played in NBA team markets, while the championship is listed for Hinkle Fieldhouse in Indianapolis. The NBA lists semifinals for December 8 and/or December 9, so do not invent a final day allocation before the league sets it.'),
        table(['Stage', 'Date or range', 'What happens', 'Viewing note'], [
          ['Group Play', 'Oct. 30-Nov. 27', 'Each team plays four group games', 'Games count in regular-season standings'],
          ['Quarterfinals', 'Dec. 4-5', 'Eight-team knockout begins', 'Higher seeds host in team markets'],
          ['Semifinals', 'Dec. 8 and/or Dec. 9', 'Quarterfinal winners play', 'NBA lists date window rather than one fixed day'],
          ['Championship', 'Dec. 11', 'Winner-take-all final at Hinkle Fieldhouse', 'Prime Video listed for the championship in NBA schedule context'],
        ]),
        p('Cup Nights include October 30, November 6, November 13, November 20, November 24, November 25 and November 27. The Friday rhythm makes the tournament easier to spot, but Thanksgiving week adds Tuesday and Wednesday Cup Nights. Viewers should check the exact game listing because some Cup games are national and others are League Pass or local-market listings subject to blackout rules.'),
      ] },
      { id: 'groups', heading: 'Groups, standings and tournament purpose', body: [
        image(article, 0),
        p('All 30 teams are drawn into six groups of five, three in each conference. The NBA says the groups are based on 2025-26 regular-season records and drawn within conferences. Each team plays the other four teams in its group once, with two home games and two road games. That creates a compact standings race where every Cup Night can matter.'),
        p('The tournament’s purpose for viewers is to add a second layer of stakes to early regular-season games. A Cup game is still a regular-season game for standings purposes, but it also affects group record, point differential, total points and qualification. That dual status is why the same final score can matter twice: once for the ordinary standings and once for the Cup table.'),
        p('Groups are not playoff divisions. They are temporary tournament pools. A team can be strong in the regular season and still miss the Cup knockout rounds if it loses key group games. A team can win a group by performing well in four specific Cup games even if its broader season remains uneven.'),
      ] },
      { id: 'tiebreakers', heading: 'Group Play tiebreaker rules from the NBA', body: [
        p('The NBA’s Cup rules list ordered tiebreakers for teams tied within a group: head-to-head record in Group Play, point differential in Group Play, total points scored in Group Play, 2025-26 regular-season record and, if still tied, random drawing. The order matters because you do not skip to point differential if head-to-head record already breaks the tie.'),
        table(['Tiebreaker order', 'Rule', 'Example use'], [
          ['1', 'Head-to-head record in Group Play', 'Two tied teams played each other and one won'],
          ['2', 'Point differential in Group Play', 'Three tied teams need margin comparison'],
          ['3', 'Total points scored in Group Play', 'Point differential is also tied'],
          ['4', '2025-26 regular-season record', 'Current Cup metrics remain tied'],
          ['5', 'Random drawing', 'Unlikely last resort'],
        ]),
        p('The NBA also notes that overtime scoring is treated specially for point differential and total-points calculations. Viewers should use the official NBA standings rather than trying to maintain a homemade spreadsheet during live games. The worked examples below are educational, not a substitute for the official table.'),
      ] },
      { id: 'qualification-examples', heading: 'Worked examples of Cup qualification', body: [
        h3('Two-team tie'),
        p('Suppose Team A and Team B both finish Group Play 3-1. If Team A beat Team B in their Cup game, Team A wins the head-to-head tiebreaker and ranks ahead of Team B before point differential is considered. That is why one November game can effectively decide a group even if both teams finish with the same record.'),
        h3('Three-team tie'),
        p('Suppose three teams finish 3-1 and each beat one of the others. Head-to-head may not resolve the tie cleanly, so point differential can become the next separator. That makes late-game margin relevant, although teams still have to balance sportsmanship, substitutions, injuries and normal coaching priorities.'),
        h3('Wild-card comparison'),
        p('The wild card is the best non-group-winner in each conference. If two wild-card candidates did not play each other in Group Play, head-to-head may not apply in the same way, so the NBA’s wild-card tiebreaker protocol becomes important. The viewer takeaway is to watch conference standings, not only one group table.'),
      ] },
      { id: 'knockout-rounds', heading: 'Knockout Rounds and championship structure', body: [
        p('Eight teams qualify for the Knockout Rounds: the six group winners plus one wild card from each conference. Quarterfinals and semifinals are single-elimination games. Lose once and the Cup run ends. That makes the December phase easier to understand than Group Play, because the bracket replaces the group table.'),
        p('Most Knockout Round games count toward the regular-season schedule, but the championship is the exception. The championship decides the Cup winner but does not count in the regular-season standings. That distinction matters when checking team records after December 11. A team can win the Cup championship without adding a regular-season win for that specific game.'),
        p('Home-court structure depends on seeding and tournament rules, not simply a normal regular-season rotation. Do not assume a quarterfinal or semifinal venue until the NBA publishes the bracket. The final itself is listed for Hinkle Fieldhouse in Indianapolis, which is a separate neutral championship site.'),
      ] },
      { id: 'broadcast-access', heading: 'Broadcasting arrangements and League Pass restrictions', body: [
        p('The NBA says the Group Play schedule includes national games across Prime Video, NBC/Peacock and ESPN, and the broader schedule release points to Prime Video for key Cup knockout and championship coverage. Other games may appear through local or League Pass contexts, depending on the exact listing and the viewer’s location.'),
        p('League Pass restrictions still apply. The NBA League Pass blackout guide says U.S. local team games and all nationally broadcast games can be unavailable live on League Pass, while national replays become available at 6 a.m. ET the following day. Cup semifinals and the championship are specifically included among tentpole events unavailable live on League Pass in the United States.'),
        p('The safest Cup access plan is to check the game row, not only the tournament stage. A Friday Group Play game on Prime Video is not the same access path as a local-only Cup game. A quarterfinal may not have the same path as the championship. Viewers should verify each game individually.'),
      ] },
      { id: 'misconceptions', heading: 'Common NBA Cup misconceptions', body: [
        ul([
          'The NBA Cup is not a preseason tournament; it occurs during the regular season.',
          'Most Cup games count in the regular-season standings, but the championship does not.',
          'Group standings are not the same as conference standings.',
          'A team can miss the knockout rounds even with a respectable overall regular-season start.',
          'Nationally televised Cup games may be blacked out live on League Pass in the United States.',
        ]),
        p('Another misconception is that the Cup makes every late-November game a tournament game. Only designated Cup games are Group Play games. Teams also play ordinary regular-season games during the same period, so check whether the listing actually identifies the game as a Cup Night.'),
      ] },
      { id: 'related-guides', heading: 'Cup context inside the broader NBA season', body: [
        p('Use the season guide for recurring national windows, Christmas, Play-In and playoffs. Use the Opening Night guide for October 20. Use this Cup article when your question is about Group Play, tiebreakers, knockout qualification or December Cup dates.'),
        links(articleLinks.nbaCup),
      ] },
      { id: 'final-note', heading: 'NBA Cup final viewing note', body: [
        p('The simplest way to follow the 2026 NBA Cup is to track three things after each Cup Night: group record, point differential and total points. Then check the official NBA standings before assuming which teams advance. The tournament rewards careful schedule reading because a regular-season game can also be a tournament game with separate stakes.'),
      ] },
    ],
    faq: [
      genericFaq('When does the 2026 NBA Cup start?', 'Group Play begins Friday, October 30, 2026.'),
      genericFaq('How does NBA Cup group play work?', 'Each team plays four designated Group Play games against the other teams in its five-team group, with two home games and two road games.'),
      genericFaq('When is the NBA Cup Championship?', 'The championship is scheduled for Friday, December 11, 2026 at Hinkle Fieldhouse in Indianapolis.'),
      genericFaq('Do NBA Cup games count in the regular season?', 'Group Play and most knockout games count as regular-season games. The championship does not count in the regular-season standings.'),
      genericFaq('What are the NBA Cup tiebreakers?', 'Within a group, the NBA uses head-to-head record, point differential, total points, prior regular-season record and random drawing in order.'),
    ],
    sources: [source.nbaCup, source.nbaCup101, source.nbaCupGroups, source.nbaSeason, source.nbaBlackout],
  });
  attachRelated(article, 'nbaCup');
}

{
  const article = find('college-football-october-2026-tv-guide');
  setArticle(article.slug, {
    intro: [
      'College Football October 2026 is not a single-channel viewing problem. It is a weekly schedule problem spread across conferences, time slots, network partners, rankings, local kickoff announcements and late television selections. NCAA.com’s current schedule page lists all times Eastern and warns that schedules and networks are subject to change, which is the right starting point for any U.S. fan trying to plan Saturdays in October.',
      'This guide explains how to read the October college football calendar, where confirmed October 8-10 examples fit, why weeknight games matter, how major conferences differ, what rankings do and do not tell you, and how to verify kickoff times without inventing unannounced assignments.',
    ],
    sections: [
      { id: 'october-structure', heading: 'October college football schedule structure', body: [
        p('October college football is built around five Saturdays, but the viewing week often begins on Tuesday or Wednesday. Smaller-conference and midweek games open the TV calendar, Thursday and Friday games create standalone windows, and Saturday becomes a layered day of noon, afternoon, night and late-night kickoffs. A fan who only checks Saturday morning can miss meaningful games that were announced earlier in the week.'),
        table(['Window', 'Typical October role', 'Example from current NCAA listing'], [
          ['Tuesday/Wednesday', 'Midweek conference games and smaller-league windows', 'Southern Miss-Troy, Jacksonville State-Kennesaw State and New Mexico State-FIU appeared in early October listings'],
          ['Thursday', 'National cable windows before the Saturday slate', 'Sam Houston-Liberty, Missouri State-Western Kentucky, South Florida-UTSA and South Alabama-Arkansas State'],
          ['Friday', 'Standalone power-conference and regional windows', 'Florida State-Louisville, Iowa-Washington, Iowa State-BYU and other listed games'],
          ['Saturday noon ET', 'First major national wave', 'Indiana-Nebraska, Texas A&M-Missouri, Texas-Oklahoma and others'],
          ['Saturday afternoon/night', 'Ranked matchups, rivalry windows and late West/Mountain games', 'Assignments vary by conference and selection timing'],
        ]),
        p('The important October habit is to read the week as a sequence. A Thursday ESPN game, a Friday FOX game and a Saturday ABC game can all be part of the same college football week. If you only search for “Saturday college football,” you may miss the games that shape the weekend narrative before Saturday begins.'),
      ] },
      { id: 'confirmed-examples', heading: 'Verified October examples and how to read them', body: [
        image(article, 0),
        p('NCAA.com’s October 8 update lists several concrete Week 6 examples: Sam Houston at Liberty at 7 p.m. ET on ESPNU, Missouri State at Western Kentucky at 7 p.m. ET on CBSSN, South Florida at UTSA at 7:30 p.m. ET on ESPN, and South Alabama at Arkansas State at 7:30 p.m. ET on ESPN2. Those games show the weeknight pattern clearly: multiple games can start within the same half-hour on different networks.'),
        p('The Friday slate shows a different kind of overlap. NCAA.com lists Florida State at Louisville at 7 p.m. ET on ESPN, No. 20 Iowa at Washington at 9 p.m. ET on FOX, Washington State at Utah State at 9 p.m. ET on The CW, Wyoming at San Jose State at 9 p.m. ET on CBSSN, and Iowa State at No. 8 BYU at 10:15 p.m. ET on ESPN. A viewer who follows ranked teams may need both early and late windows.'),
        p('Saturday, October 10 begins with a crowded noon ET wave, including No. 7 Indiana at Nebraska on FOX, Texas A&M at No. 14 Missouri on ABC, UCF at No. 18 Oklahoma State on ESPN2, North Carolina at No. 25 Pitt on ESPN, Arizona at West Virginia on TNT and other listed games. The noon window alone can force a viewer to choose between rankings, conference relevance, local rooting interest and channel availability.'),
      ] },
      { id: 'conference-differences', heading: 'Major conferences and coverage differences', body: [
        p('College football television is fragmented because conferences have different media arrangements and selection procedures. The Big Ten can appear across FOX, CBS, NBC, Peacock and Big Ten Network contexts. SEC games can appear on ABC, ESPN networks and SEC Network contexts. ACC and Big 12 games can sit across ESPN, ABC, ACC Network, FOX, FS1, TNT or other partner windows depending on the specific package and season.'),
        p('That fragmentation is not a defect in the schedule; it is the structure of the sport. A viewer following one conference should learn that conference’s typical windows and then verify each game. A viewer following ranked teams nationally should expect to move across networks every few hours. A viewer following one school should use the school’s official schedule page after the conference or TV partner announces a time.'),
        p('Notre Dame and independent or non-power conference schedules add another layer. Home-game rights, away-game rights and neutral-site games can differ. Do not assume that a school’s previous week channel predicts the next week channel, especially when the opponent, venue or conference affiliation changes.'),
      ] },
      { id: 'pending-assignments', heading: 'Confirmed versus pending assignments', body: [
        p('College football TV selections often use six-day or 12-day windows, especially for conference games whose importance depends on current records, rankings and competing national inventory. That means a late-October game may have a date and opponent long before it has a final kickoff time or network. Treat “TBA” as a normal scheduling state, not as missing information.'),
        p('A good verification sequence is: NCAA schedule page for national context, conference announcement for selection windows, school schedule for team-specific updates, and provider guide for local channel access. If those sources disagree, prefer the newest official page that is specific to the game. Avoid copying older offseason schedule PDFs into game week if a newer announcement exists.'),
        table(['Status label', 'Meaning', 'Viewer action'], [
          ['Confirmed time and network', 'The game has a listed kickoff and TV partner', 'Add it to calendar and check provider access'],
          ['Confirmed time, pending network', 'Kickoff is known but channel may still be assigned', 'Set date/time reminder and recheck the week of the game'],
          ['Date only', 'Opponent/date known but kickoff not selected', 'Wait for conference or school announcement'],
          ['Subject to change', 'Official listing may still move', 'Verify close to kickoff'],
        ]),
      ] },
      { id: 'rankings-rivalries', heading: 'Rankings, rivalries and why they matter', body: [
        p('Rankings help explain why some games receive national windows, but they should not be treated as permanent facts. NCAA.com’s current schedule includes ranked labels for teams such as No. 7 Indiana, No. 14 Missouri, No. 18 Oklahoma State, No. 25 Pitt, No. 1 Texas and No. 8 BYU in the October 10 examples. Those rankings reflect the current week’s context and can change after every result.'),
        p('Rivalries and neutral-site games can also influence viewing priority. Texas-Oklahoma at the Cotton Bowl in Dallas is not just another 3:30 p.m. ET listing; it is a rivalry with a neutral-site tradition and broad national interest. Florida-Georgia, when listed later in the month, should be checked against the current official venue rather than prior-year assumptions.'),
        p('For playoff implications, remember that October is positioning season. A ranked win, conference loss or rivalry result can matter later, but no viewer should invent clinching scenarios before standings and tiebreakers make them real. The useful October question is whether a game has conference, ranking or rivalry significance today, not whether it guarantees a postseason outcome.'),
      ] },
      { id: 'streaming-access', heading: 'Streaming access and device considerations', body: [
        p('College football streaming depends on the network family. ESPN games can involve ESPN apps or authenticated access, but not every ESPN-branded listing has the same subscription path. Big Ten Network, SEC Network, ACC Network, CBS Sports Network, The CW, FOX, FS1, TNT, Peacock and ESPN+ each have different access rules. A game on ESPN2 is not the same as a game on ESPN+, and a conference network listing is not automatically included in every live TV package.'),
        p('Device planning should match the channel. If a game is on ABC or FOX, some viewers may use antenna or a live TV service. If it is on CBSSN, Big Ten Network or SEC Network, package tiers matter. If it is on Peacock or ESPN+, app subscription and device support matter. If it is on a school-produced stream or YouTube for lower divisions, the path can differ again.'),
        p('MoaTV readers should avoid unsupported assumptions about carriage. This article can help identify the official network and the questions to ask, but it does not claim MoaTV includes a specific college football channel or game. Verify the official listing and your lawful access before kickoff.'),
      ] },
      { id: 'time-zones-examples', heading: 'Time-zone guidance and practical Saturday examples', body: [
        table(['ET kickoff', 'Central', 'Mountain', 'Pacific', 'College football use case'], [
          ['12:00 p.m.', '11:00 a.m.', '10:00 a.m.', '9:00 a.m.', 'Noon national window'],
          ['3:30 p.m.', '2:30 p.m.', '1:30 p.m.', '12:30 p.m.', 'Afternoon showcase'],
          ['7:30 p.m.', '6:30 p.m.', '5:30 p.m.', '4:30 p.m.', 'Evening window'],
          ['10:15 p.m.', '9:15 p.m.', '8:15 p.m.', '7:15 p.m.', 'Late Mountain/West Coast game'],
        ]),
        p('A practical Saturday plan starts by choosing one game per window rather than trying to watch everything. For October 10, a viewer might choose Indiana-Nebraska or Texas A&M-Missouri at noon, Texas-Oklahoma in the afternoon, then a late ESPN game after dinner. Another viewer might ignore rankings and follow only one conference. Both plans work if they begin with the official listing and the viewer’s actual channel access.'),
        p('When college football overlaps with NFL, MLB or WNBA events, prioritize live elimination or rivalry stakes first. A regular-season college football game can be important, but an MLB postseason elimination game or WNBA Finals game may be harder to defer if your household follows those sports. Use the October sports calendar when the conflict is cross-sport rather than college-only.'),
        links(articleLinks.college),
      ] },
      { id: 'final-note', heading: 'College football October checklist', body: [
        p('For each October week, check NCAA.com for national schedule context, confirm conference and school updates, verify the final TV assignment, convert the kickoff time, and test the app or channel before kickoff. College football rewards fresh verification because many assignments are intentionally late and subject to change.'),
      ] },
    ],
    faq: [
      genericFaq('Where can I find college football TV listings for October 2026?', 'NCAA.com maintains a college football TV schedule page with game times and channels, and it notes that all times are Eastern and schedules are subject to change.'),
      genericFaq('Why do college football TV assignments change?', 'Conference and network partners often use six-day or 12-day selection windows so they can choose better TV slots based on records, rankings and national inventory.'),
      genericFaq('Is there one channel for all college football?', 'No. College football is split across many networks and streaming platforms based on conference, game, partner and package.'),
      genericFaq('What should fans check before kickoff?', 'Check the official game time, network, provider access, app sign-in and local time-zone conversion.'),
      genericFaq('Do rankings decide the TV channel?', 'Rankings influence interest and selection, but they do not by themselves decide access. The official network listing is what matters for watching.'),
    ],
    sources: [source.ncaa],
  });
  attachRelated(article, 'college');
}

{
  const article = find('how-to-watch-2026-wnba-playoffs-finals');
  setArticle(article.slug, {
    intro: [
      'The 2026 WNBA Playoffs use the top eight teams regardless of conference, with a best-of-three first round, best-of-five semifinals and best-of-seven Finals. The 2026 postseason began September 27, the semifinals began October 4, and the Finals are scheduled to run from October 17 through October 31 if the series reaches Game 7. Because several games are conditional, viewers should track the bracket and not treat every date as guaranteed.',
      'This guide explains qualification, seeding, home-court patterns, round formats, current semifinal context, the Finals schedule, broadcast notes, if-necessary games, League Pass replay restrictions and practical viewing examples for U.S. fans. It avoids guessing the finalists or claiming that MoaTV carries any specific WNBA telecast.',
    ],
    sections: [
      { id: 'format', heading: '2026 WNBA playoff format and qualification rules', body: [
        p('The WNBA playoff field is the top eight teams by regular-season record, regardless of conference. That creates a single seeded bracket rather than separate East and West brackets. The higher seed receives home-court advantage according to the round format, and the bracket does not reset after each round. A lower seed that advances keeps moving through its assigned path.'),
        table(['Round', 'Series length', 'Wins needed', 'Home-court pattern'], [
          ['First Round', 'Best of three', 'Two wins', 'Higher seed hosts Games 1 and 3; lower seed hosts Game 2'],
          ['Semifinals', 'Best of five', 'Three wins', 'Higher seed hosts Games 1, 2 and 5; lower seed hosts Games 3 and 4'],
          ['Finals', 'Best of seven', 'Four wins', 'Higher seed hosts Games 1, 2, 5 and 7; lower seed hosts Games 3, 4 and 6'],
        ]),
        p('The jump from best of three to best of five to best of seven changes viewing priorities. A first-round series can end quickly, so every game is urgent. A semifinal gives teams more room to respond, but Games 4 and 5 may still disappear. A Finals series can stretch across two weeks, but Games 5, 6 and 7 are conditional.'),
      ] },
      { id: 'bracket-progression', heading: 'Bracket progression and current semifinal context', body: [
        image(article, 0),
        p('The WNBA’s current playoff pages and semifinal preview provide the reliable bracket context. The first round produced the semifinal field, and the semifinal preview lists matchups, hosts, times and broadcast assignments. Current series status can change quickly after each game, so this article treats the official WNBA bracket as the live source for results.'),
        p('Semifinal series are best of five. The higher seed hosting Games 1 and 2 has an early home-court opportunity, but the lower seed gets Games 3 and 4 if the series lasts that long. Game 5, if needed, returns to the higher seed. That structure explains why the second road game for a lower seed can become an elimination or series-tying game depending on the first two results.'),
        p('Viewers should track series score and next-game location together. A 2-0 lead means the next game can be a clincher. A 1-1 split means the lower seed’s home games can swing the series. A 2-2 tie makes Game 5 a winner-take-all semifinal game. The schedule alone does not tell the story without the series score.'),
      ] },
      { id: 'finals-schedule', heading: 'WNBA Finals schedule and if-necessary games', body: [
        p('The WNBA postseason FAQ lists the 2026 Finals calendar with Games 5, 6 and 7 marked if necessary. The exact teams and venues depend on semifinal results and seeding, but the dates and listed broadcast windows give U.S. viewers a reliable planning framework.'),
        table(['Finals game', 'Date', 'Time ET', 'Status', 'Listed coverage'], [
          ['Game 1', 'Sat., Oct. 17', '3:30 p.m.', 'Scheduled', 'NBC/Peacock'],
          ['Game 2', 'Mon., Oct. 19', '8:00 p.m.', 'Scheduled', 'USA/Peacock'],
          ['Game 3', 'Thu., Oct. 22', '8:00 p.m.', 'Scheduled', 'USA/Peacock'],
          ['Game 4', 'Sat., Oct. 24', '3:30 p.m.', 'Scheduled', 'NBC/Peacock'],
          ['Game 5', 'Mon., Oct. 26', '8:00 p.m.', 'If necessary', 'USA/Peacock'],
          ['Game 6', 'Thu., Oct. 29', '8:00 p.m.', 'If necessary', 'USA/Peacock'],
          ['Game 7', 'Sat., Oct. 31', '8:00 p.m.', 'If necessary', 'USA/Peacock'],
        ]),
        p('A Finals sweep ends after Game 4, so Games 5-7 would not be played. A 3-1 series requires Game 5. A 3-2 series requires Game 6. A 3-3 series creates Game 7 on October 31. Calendar reminders should be labeled with those conditions so you do not plan around a game that no longer exists.'),
      ] },
      { id: 'broadcast-access', heading: 'Broadcast assignments, League Pass and replay access', body: [
        p('The Finals table lists NBC/Peacock and USA/Peacock windows. That tells viewers where to start, but it does not guarantee that every account, device or local market has access. Viewers should confirm NBC, USA and Peacock availability through their provider or app before the Finals begin. A smart TV, mobile app and browser can have different sign-in behavior.'),
        p('WNBA League Pass access is separate from national live broadcast rights. WNBA support materials describe blackouts for nationally televised games and replay availability after the live broadcast window. If you plan to use League Pass because you cannot watch live, verify whether the replay timing meets your needs. A replay that appears the next morning is useful, but it is not live coverage.'),
        p('If you travel during the Finals, location can affect app behavior and availability. Sign in before leaving home, know which device you will use, and check whether the app relies on location services or provider authentication. Do not assume a hotel TV package includes USA, NBC or Peacock access.'),
      ] },
      { id: 'home-court', heading: 'Home-court considerations and practical scenarios', body: [
        p('Home court matters in the WNBA postseason because the higher seed receives extra host games in each round. In a best-of-seven Finals, the higher seed hosts Games 1, 2, 5 and 7. That means the higher seed can open the series at home and, if the series goes the distance, host the final possible game. The lower seed hosts the middle swing of Games 3, 4 and 6.'),
        h3('If the Finals start 2-0'),
        p('The lower seed returns home under pressure. Game 3 can turn the series into a contest or put one team within a win of the title. Viewers should check whether Game 4 becomes a clinching opportunity after Game 3.'),
        h3('If the Finals are tied 2-2'),
        p('Game 5 is guaranteed and becomes a pivot game. The winner leads 3-2, which guarantees Game 6. Game 7 remains conditional until the trailing team wins Game 6.'),
        h3('If the Finals reach Game 7'),
        p('October 31 becomes the final game of the WNBA season. It may overlap with World Series Game 7 if both series go the distance, so cross-sport viewers should identify primary and secondary screens in advance.'),
      ] },
      { id: 'time-zones', heading: 'U.S. time-zone guide for WNBA playoff games', body: [
        table(['ET listing', 'Central', 'Mountain', 'Pacific', 'Finals examples'], [
          ['3:30 p.m.', '2:30 p.m.', '1:30 p.m.', '12:30 p.m.', 'Games 1 and 4'],
          ['8:00 p.m.', '7:00 p.m.', '6:00 p.m.', '5:00 p.m.', 'Games 2, 3, 5, 6 and 7'],
        ]),
        p('The afternoon games are easier for East Coast family viewing but can collide with West Coast daytime errands or college football. The 8 p.m. ET games are prime time in the East and early evening in the West. If you plan to watch every Finals game, create two different routines rather than assuming all games start at night.'),
      ] },
      { id: 'october-overlap', heading: 'How the WNBA postseason fits October', body: [
        p('The WNBA Finals occupy the same late-October zone as MLB League Championship Series and World Series dates, NFL weekends, NBA Opening Night and college football Saturdays. That makes the WNBA schedule especially important for multi-sport households. If the Finals reach Games 5-7, the league can overlap with the World Series and NBA Cup launch week.'),
        p('Use the October sports calendar when you need cross-sport conflict planning. Use this WNBA guide when you need format, bracket and Finals details. Use the NBA Opening Night guide when the October 20 men’s NBA start is the specific question.'),
        links(articleLinks.wnba),
      ] },
      { id: 'final-note', heading: 'WNBA playoff viewing checklist', body: [
        p('Before each WNBA playoff game, check the bracket, confirm whether the game is guaranteed or if necessary, verify NBC, USA or Peacock access, convert the start time, and test the device. The postseason format is straightforward once you track wins needed and home-court pattern together.'),
      ] },
    ],
    faq: [
      genericFaq('When do the 2026 WNBA Playoffs start?', 'The 2026 WNBA Playoffs began Sunday, September 27, 2026.'),
      genericFaq('What is the WNBA playoff format?', 'The top eight teams qualify regardless of conference. The first round is best of three, semifinals are best of five, and the Finals are best of seven.'),
      genericFaq('When do the 2026 WNBA Finals start?', 'Finals Game 1 is scheduled for Saturday, October 17 at 3:30 p.m. ET on NBC/Peacock.'),
      genericFaq('Which WNBA Finals games are if necessary?', 'Games 5, 6 and 7 are if necessary on October 26, October 29 and October 31.'),
      genericFaq('Can WNBA League Pass replace live national playoff coverage?', 'Not necessarily. National live games can be blacked out, with replay access following separate timing. Check WNBA support guidance before relying on League Pass for a live playoff game.'),
    ],
    sources: [source.wnba, source.wnbaSemi, source.wnbaBlackout],
  });
  attachRelated(article, 'wnba');
}

{
  const article = find('october-2026-sports-calendar');
  setArticle(article.slug, {
    intro: [
      'October 2026 is one of the busiest U.S. sports months on the calendar: MLB postseason rounds move toward a World Series scheduled to begin October 23, NFL Weeks 4-8 fill every weekend and multiple prime-time windows, NBA Opening Night arrives October 20, the NBA Cup begins October 30, the WNBA Finals are scheduled from October 17-31 if needed, and college football continues with weeknight and Saturday windows.',
      'This hub is designed for chronological planning, not for duplicating every detail from the nine sport-specific guides. Use it to see what overlaps, which events are confirmed versus conditional, and which MoaTV guide to open next for format, access or schedule detail.',
    ],
    sections: [
      { id: 'legend', heading: 'How to read the October 2026 sports calendar', body: [
        p('The calendar uses three status labels. Confirmed means the date, event and broad viewing note are listed by an official source. Conditional means the date is reserved but the game depends on series results or tournament qualification. Pending means a sport or team has a date or window, but exact time, network or matchup can still be incomplete. Those labels matter because October contains playoffs, tournaments and late TV selections at the same time.'),
        table(['Status', 'Meaning', 'Examples'], [
          ['Confirmed', 'The official source lists the event/date', 'NBA Opening Night on Oct. 20; NFL Week 5 date range'],
          ['Conditional', 'The game happens only if results require it', 'MLB World Series Games 5-7; WNBA Finals Games 5-7'],
          ['Pending', 'Some assignment details can still change', 'College football kickoff/network selections; local NFL Sunday distribution'],
        ]),
        p('All times in this hub should be treated as Eastern unless a linked guide states otherwise. Viewers in Central, Mountain and Pacific time zones should convert the official listing after checking the newest source. A calendar entry is only useful if it matches the game-day listing you can actually access.'),
      ] },
      { id: 'october-1-4', heading: 'October 1-4: early football and postseason setup', body: [
        p('The first October weekend combines NFL Week 4 spillover, college football and the early MLB postseason path. Some MLB Wild Card results are already complete by October 1, which means the Division Series field is taking shape. NFL Week 4 includes a Thursday game on October 1 and an international Colts-Commanders window during the first weekend, while college football keeps its usual Thursday, Friday and Saturday schedule rhythm.'),
        table(['Date', 'Sport', 'Event type', 'Status', 'Best next guide'], [
          ['Oct. 1', 'NFL', 'Week 4 Thursday Night Football', 'Confirmed', 'NFL October guide'],
          ['Oct. 3-4', 'MLB', 'Division Series opening weekend', 'Confirmed/series-dependent', 'MLB Playoffs guide'],
          ['Oct. 3-4', 'College football', 'Saturday and weekend schedule', 'Pending by game', 'College football guide'],
          ['Oct. 4', 'WNBA', 'Semifinals begin', 'Confirmed', 'WNBA Playoffs guide'],
        ]),
        p('This opening weekend is a reminder that October sports do not wait for the NBA to begin. Baseball and football already dominate the calendar, and WNBA semifinal games add playoff stakes. If your household follows multiple sports, reserve one screen for live elimination or playoff games and use another for regular-season football updates.'),
      ] },
      { id: 'october-5-11', heading: 'October 5-11: MLB Division Series, NFL Week 5 and college football', body: [
        image(article, 0),
        p('The second week is one of the month’s densest planning stretches. MLB Division Series games can reach if-necessary Games 4 and 5. NFL Week 5 opens with Buccaneers at Cowboys on Thursday, continues with Eagles-Jaguars from London on Sunday morning, includes a large Sunday regional slate, and ends with Bills at Rams on Monday. College football adds midweek and Saturday windows, including several ranked examples on the October 10 schedule.'),
        table(['Date or range', 'Sport', 'Event', 'Status', 'Conflict note'], [
          ['Oct. 6-10', 'College football', 'Weeknight, Friday and Saturday games', 'Confirmed/pending by game', 'Friday and Saturday overlap with MLB'],
          ['Oct. 8', 'NFL', 'Buccaneers at Cowboys TNF', 'Confirmed', 'Prime-time football opposite postseason baseball context'],
          ['Oct. 10', 'MLB', 'Division Series late window', 'Conditional', 'Games depend on series results'],
          ['Oct. 11', 'NFL', 'Eagles at Jaguars in London', 'Confirmed', 'Morning NFL extends the sports day'],
          ['Oct. 11', 'WNBA', 'Possible semifinal games', 'If necessary', 'Check bracket before planning'],
        ]),
        p('The key decision this week is whether playoff baseball or NFL appointment viewing owns the main screen. An if-necessary MLB game can become the most urgent event of the night, while Thursday Night Football and the London game are fixed football anchors. Use the Week 5 guide for exact NFL matchups and the MLB guide for series status.'),
        links([{ label: 'NFL Week 5 guide', href: '/blog/nfl-week-5-viewing-guide-2026' }, { label: 'MLB Playoffs guide', href: '/blog/how-to-watch-2026-mlb-playoffs' }, { label: 'College football October guide', href: '/blog/college-football-october-2026-tv-guide' }]),
      ] },
      { id: 'october-12-18', heading: 'October 12-18: League Championship Series and WNBA Finals begin', body: [
        p('Mid-October shifts baseball into League Championship Series territory. MLB lists the NLCS opening October 11 and the ALCS opening October 12, with network families differing by league. NFL Week 6 adds another Thursday game and another international Sunday morning. WNBA Finals Game 1 is scheduled for Saturday, October 17 at 3:30 p.m. ET on NBC/Peacock.'),
        table(['Date', 'Sport', 'Event', 'Status', 'Planning note'], [
          ['Oct. 12', 'MLB', 'ALCS Game 1', 'Confirmed once matchup set', 'TBS/truTV/HBO Max/UniMas family listed by MLB'],
          ['Oct. 15', 'NFL', 'Seahawks at Broncos TNF', 'Confirmed', 'Prime Video Thursday window'],
          ['Oct. 17', 'WNBA', 'Finals Game 1', 'Confirmed once finalists set', 'NBC/Peacock afternoon start'],
          ['Oct. 18', 'MLB', 'Possible NLCS Game 6', 'If necessary', 'Could overlap NFL Sunday'],
          ['Oct. 18', 'NFL', 'Week 6 Sunday slate and London context', 'Confirmed/local by game', 'International morning affects schedule'],
        ]),
        p('This week is where conditional playoff thinking becomes essential. A scheduled LCS Game 6 may never happen if a series ends early. A WNBA Finals game is scheduled, but the teams and venues depend on semifinals. NFL Sunday remains predictable in structure but local in distribution.'),
      ] },
      { id: 'october-19-25', heading: 'October 19-25: NBA Opening Night and World Series Game 1', body: [
        p('The third full week is the month’s television centerpiece. WNBA Finals Game 2 is scheduled for Monday, October 19. NBA Opening Night arrives Tuesday, October 20 with an NBC/Peacock tripleheader. WNBA Finals Game 3 follows Thursday, October 22. MLB World Series Game 1 is scheduled Friday, October 23, and Game 2 Saturday, October 24. NFL Week 7 and college football continue around those events.'),
        table(['Date', 'Sport', 'Event', 'Status', 'Best next guide'], [
          ['Oct. 19', 'WNBA', 'Finals Game 2', 'Confirmed once finalists set', 'WNBA Playoffs guide'],
          ['Oct. 20', 'NBA', 'Opening Night tripleheader', 'Confirmed', 'NBA Opening Night guide'],
          ['Oct. 22', 'WNBA', 'Finals Game 3', 'Confirmed once finalists set', 'WNBA Playoffs guide'],
          ['Oct. 23', 'MLB', 'World Series Game 1', 'Confirmed once pennants decided', 'World Series guide'],
          ['Oct. 23', 'NBA', 'Prime Video opening-week doubleheader', 'Confirmed', 'NBA season guide'],
          ['Oct. 24', 'MLB/WNBA/College football', 'World Series Game 2, WNBA Finals Game 4 and Saturday football', 'Confirmed/overlap', 'Use sport-specific guides'],
        ]),
        p('This is the week where one-screen households need a real priority list. NBA Opening Night is fixed and national. World Series Games 1 and 2 are fixed once teams are known. WNBA Finals Games 2-4 are scheduled with national coverage notes. College football and NFL add more windows. Decide in advance which sport owns the main screen each night.'),
        links([{ label: 'NBA Opening Night guide', href: '/blog/nba-opening-night-2026-watch-guide' }, { label: 'World Series guide', href: '/blog/2026-world-series-viewing-guide' }, { label: 'WNBA Playoffs guide', href: '/blog/how-to-watch-2026-wnba-playoffs-finals' }]),
      ] },
      { id: 'october-26-31', heading: 'October 26-31: conditional championship games and NBA Cup launch', body: [
        p('The final week can be either packed or calmer depending on playoff results. MLB World Series Games 5, 6 and 7 are if necessary on October 28, October 30 and October 31. WNBA Finals Games 5, 6 and 7 are if necessary on October 26, October 29 and October 31. The NBA Cup begins October 30, while NFL Week 8 opens October 29 and continues into November.'),
        table(['Date', 'Sport', 'Event', 'Status', 'Conflict note'], [
          ['Oct. 26', 'WNBA', 'Finals Game 5', 'If necessary', 'Monday night playoff basketball'],
          ['Oct. 28', 'MLB', 'World Series Game 5', 'If necessary', 'Could be clinching game'],
          ['Oct. 29', 'NFL/WNBA', 'Panthers-Packers TNF; WNBA Finals Game 6', 'Confirmed/conditional', 'Football and basketball can overlap'],
          ['Oct. 30', 'MLB/NBA', 'World Series Game 6; NBA Cup tips off', 'Conditional/confirmed', 'Baseball championship path meets tournament launch'],
          ['Oct. 31', 'MLB/WNBA/College football', 'Possible World Series Game 7, possible WNBA Finals Game 7, Saturday football', 'Conditional/confirmed', 'Potential multi-sport peak date'],
        ]),
        p('October 31 is the calendar’s most dramatic conditional date. If both the World Series and WNBA Finals reach Game 7, two championship-deciding games share the day with college football. If either series ends early, the pressure drops. That is why conditional labels are not decoration; they decide whether the date is a normal Saturday or one of the biggest sports days of the year.'),
        links([{ label: 'NBA Cup guide', href: '/blog/2026-nba-cup-guide' }, { label: 'NBA season guide', href: '/blog/nba-2026-27-viewing-guide' }]),
      ] },
      { id: 'timezone-planning', heading: 'U.S. time-zone guidance and cross-sport examples', body: [
        table(['ET time', 'Central', 'Mountain', 'Pacific', 'Typical October event'], [
          ['9:30 a.m.', '8:30 a.m.', '7:30 a.m.', '6:30 a.m.', 'NFL international game'],
          ['12:00 p.m.', '11:00 a.m.', '10:00 a.m.', '9:00 a.m.', 'College football noon window'],
          ['3:30 p.m.', '2:30 p.m.', '1:30 p.m.', '12:30 p.m.', 'WNBA Finals afternoon game or college football'],
          ['8:00 p.m.', '7:00 p.m.', '6:00 p.m.', '5:00 p.m.', 'MLB/WNBA/NBA national night window'],
          ['9:30 p.m.', '8:30 p.m.', '7:30 p.m.', '6:30 p.m.', 'Late NBA national game'],
        ]),
        p('A cross-sport example: on October 24, a household may face World Series Game 2, WNBA Finals Game 4 and college football. If one game can decide a championship or series swing, give it priority. If a game is a regular-season football matchup with replay or highlights available, it may become the secondary screen. The best choice depends on fandom, but the process is consistent: identify fixed events, identify conditional events, then decide which live outcome matters most.'),
        p('Another example: October 30 combines the NBA Cup launch with a possible World Series Game 6. A casual NBA fan might sample the Cup and move to baseball if the World Series can be clinched. A Lakers or Warriors fan might prioritize the Cup opener. Neither plan is wrong if it is based on the actual official listings and series status.'),
      ] },
      { id: 'guide-index', heading: 'Detailed MoaTV guides by sport', body: [
        p('This hub stays useful by sending detailed questions to the right guide. MLB format, authentication and if-necessary scenarios belong in the MLB Playoffs guide. The World Series game-by-game table belongs in the World Series guide. NFL regional coverage and flex context belong in the NFL month guide, while Week 5 matchups belong in the Week 5 page. NBA Opening Night, NBA season structure, NBA Cup rules, WNBA playoff format and college football TV volatility each have their own pages.'),
        links(articleLinks.calendar),
      ] },
      { id: 'final-note', heading: 'October 2026 sports calendar checklist', body: [
        p('Build the month in weekly blocks, label conditional playoff games, verify local and national access separately, and update the calendar after each MLB or WNBA series result. October is manageable when every event carries a status: confirmed, conditional or pending.'),
      ] },
    ],
    faq: [
      genericFaq('What major sports are in October 2026?', 'October includes MLB playoffs and World Series, NFL regular-season weeks, NBA Opening Night, NBA Cup launch, WNBA playoffs and Finals, and college football.'),
      genericFaq('When does the 2026 World Series start?', 'World Series Game 1 is scheduled for Friday, October 23, 2026. Games 5-7 are if necessary.'),
      genericFaq('When does the NBA season start?', 'The NBA regular season starts Tuesday, October 20, 2026 with an NBC/Peacock tripleheader.'),
      genericFaq('What should U.S. fans track weekly?', 'Track official schedules, local broadcast access, time-zone conversions, conditional playoff games and any pending college football or NFL local assignments.'),
      genericFaq('Why are some October events conditional?', 'Playoff series can end early. MLB World Series and WNBA Finals later games happen only if neither team has already clinched the series.'),
    ],
    sources: [source.mlb, source.nfl5, source.nflFlex, source.nbaSeason, source.nbaCup, source.wnba, source.ncaa],
  });
  attachRelated(article, 'calendar');
}

function addDepth(slug, id, heading, paragraphs) {
  const article = find(slug);
  article.sections.splice(Math.max(article.sections.length - 1, 0), 0, {
    id,
    heading,
    body: paragraphs.map((text) => p(text)),
  });
}

addDepth('how-to-watch-2026-mlb-playoffs', 'postseason-deep-dive', 'Additional MLB postseason viewing depth', [
  'Seeding is the first hidden viewing variable in the MLB postseason. A casual viewer sees team names and channels, but the bracket has already been shaped by division winners, Wild Card qualifiers and byes. Higher-seeded teams can receive rest before the Division Series, while Wild Card winners arrive from a short, urgent series. That matters for fans because the first Division Series game may be a rested club against a team that just used pitching in the prior round. The schedule does not tell you bullpen status, but it does tell you which team had to survive an earlier round.',
  'Home field also changes the feel of a series. In a best-of-five Division Series, the higher seed usually gets the opening home games and the possible final game. That makes Game 2 feel very different depending on who won Game 1: a home team trying to protect both opening games has a different pressure point than a road team trying to steal a split. Viewers who understand the home pattern can better interpret why a manager might handle pitching aggressively in one game and conservatively in another.',
  'National coverage can lead to staggered starts, especially on days with multiple games. A viewer should expect some games to begin in afternoon or early evening windows and others to slide into prime time. If a postseason day includes four games, the first pitch times may be arranged to reduce overlap, but long games can still collide. Extra innings, rain delays and replay reviews can push one game into the next window. Recording padding is useful because baseball has no clock and October games can run long.',
  'Authentication is not a minor technical detail. If a telecast is listed through a network family that requires a participating provider, the viewer needs that login ready before the game. This is where many postseason problems happen: the user has the app, but the app asks for provider credentials; the user has the provider, but the provider is not supported; the user can watch on a phone, but the connected-TV app behaves differently. Test the exact game path, not only the app icon.',
  'Radio can be a useful fallback for fans who cannot legally watch a live telecast. MLB teams, national radio partners and local stations can have separate coverage from the television listing. A viewer at work, in a car or outside the home market may still be able to follow legally through audio even when live video is unavailable. This article focuses on video viewing, but a complete October plan should include audio as the backup when device, market or subscription rules block the screen.',
  'Postseason weather should be treated as a schedule risk, not a prediction. Outdoor baseball in October can face rain, cold and travel effects. The official schedule remains the source of truth for postponements or time changes. If a game moves, the network and app listings can take time to update across providers. Check MLB.com first, then the broadcaster, then the local guide. That order keeps you from chasing stale information inside a slow-updating TV interface.',
  'For viewers following more than one team, the best approach is to categorize games by elimination risk. A Game 1 is important, but a Game 4 with a team facing elimination is more urgent. A potential clincher deserves priority over a non-elimination game in another series if you only have one main screen. This is not about telling fans what to care about; it is about making a realistic plan when October puts several meaningful games into the same evening.',
]);

addDepth('2026-world-series-viewing-guide', 'world-series-deep-dive', 'Deeper World Series viewing scenarios', [
  'A best-of-seven World Series has a different emotional rhythm from the earlier rounds. Game 1 establishes the matchup and often draws casual viewers who have not followed every postseason series. Game 2 can either even the series or create a 2-0 lead before the venue changes. Game 3 introduces the second ballpark and often changes the broadcast texture because the crowd, camera angles and local atmosphere shift. Game 4 can be a sweep-clincher or the start of a longer series.',
  'Games 5, 6 and 7 should be labeled differently in your calendar. Game 5 is conditional but relatively common because it requires only that the series not end in four games. Game 6 requires one team to be leading 3-2 after five or the series to have another unresolved path. Game 7 is rare by design because it requires a 3-3 tie after six games. A viewer who marks all three as equal commitments may overplan late October. A viewer who labels the condition can adjust quickly.',
  'The 2-3-2 home pattern is also a travel pattern. The teams open in one city, move to the other city for the middle games, and return only if the series needs Games 6 or 7. For fans watching from home, travel days explain why there are gaps in the calendar. For fans planning in-person events, travel days can affect ticket markets, hotel prices and local crowd energy. This guide does not cover ticket purchasing, but the same schedule logic helps a viewer understand why the off days exist.',
  'The FOX-family listing is simple, but household access can still be complicated. One viewer may have an antenna that receives local FOX clearly. Another may use a live TV streaming service where local station availability depends on ZIP code. Another may prefer Spanish-language coverage on FOX Deportes. Another may use FOX One if available to that account. The official line tells you the telecast family; your household still has to verify the exact route.',
  'Live versus delayed viewing deserves a realistic plan. The World Series is hard to avoid on social media, sports apps and news alerts. If you plan to watch a replay, silence score notifications and avoid auto-playing highlights. If you plan to watch live but may join late, decide whether you care about starting from the beginning or jumping to live action. Different apps handle start-over and replay controls differently, so test those features before Game 1 if they matter.',
  'Shared-screen households should decide in advance how to handle overlap with WNBA Finals, NBA opening week, NFL and college football. A World Series Game 7 on October 31, if needed, would be a very different priority than a Game 3 in a series with no elimination at stake. The same date can be ordinary or historic depending on series results. That is why this guide keeps repeating the condition attached to Games 5-7: it changes the whole night.',
  'If the teams are from different time zones, local fan routines can differ. A West Coast host can create an earlier national start for local attendees than some fans expect, while an East Coast viewer may still face late endings. The official broadcast window solves the national schedule, not every household routine. Consider dinner, work, bedtime and commute timing before inviting people for a weeknight game.',
  'Finally, do not use team rumors or unofficial graphics as a schedule source. Once the league champions are set, team sites, MLB.com and broadcaster listings will populate with more detail. Until then, the official World Series framework is enough: October 23 start, FOX-family coverage, 2-3-2 home pattern and conditional late games. Anything beyond that should come from a current official source.',
]);

addDepth('nfl-october-2026-tv-guide', 'nfl-october-deep-dive', 'More October NFL planning detail', [
  'The month-level NFL problem is that every week contains several kinds of games. A Thursday game is a national appointment. A Sunday international game is an early national or special-event window. A Sunday afternoon game may be local, regional or out of market. A Sunday night game is national but potentially affected by flex procedures. A Monday night game is national but can sit on different ESPN or ABC combinations. Treating all of those as “NFL on TV” hides the access differences that cause real viewer frustration.',
  'October also introduces bye-week thinking. Fans often notice byes only when their favorite team disappears from the schedule, but byes affect the entire viewing market. A slate with several popular teams idle can shift national attention toward other games. Fantasy players need to adjust lineups. Sports bars and shared households may find that one fan suddenly cares about a rival’s game because their team is off. Checking the bye list is a simple way to understand why a week feels lighter or stranger.',
  'Flex scheduling deserves nuance. The existence of flex rules does not mean every Sunday night game will move. It means the league has a mechanism to improve national windows under defined timing and limits. Early-season flexing is more constrained than late-season playoff-race flexing. For October, the practical rule is to avoid treating Sunday night as absolutely final until game week, especially if travel, tickets or group plans depend on it.',
  'Local station verification should be done close to Sunday because distribution maps can be updated after national conversation changes. If a quarterback injury, weather event or standings implication changes the appeal of a game, networks and affiliates may emphasize different matchups where rules allow. The official NFL schedule gives you the slate; the local affiliate guide tells you what appears on your television. Both are needed for a Sunday afternoon plan.',
  'International mornings are useful for fans who want more football, but they can create endurance problems. Watching from 9:30 a.m. ET through Monday night is a lot of football across one week. Build breaks into the plan: morning game, one early window, one late window, night game. If you try to watch every snap of every window, the quality of the viewing experience can drop. A practical guide should help fans choose, not imply that every game must be watched live.',
  'October NFL also overlaps with baseball playoffs in ways that affect priority. A Sunday afternoon NFL game may be a regular-season Week 6 matchup, while an MLB game the same night could be an elimination game. Conversely, a local NFL rivalry might matter more to a household than a non-elimination baseball game. The right plan depends on fandom, but the method is stable: label national NFL anchors, local NFL access, and playoff elimination risk before the weekend starts.',
  'For device planning, remember that a service can work on one device and fail on another because of app support, location permissions or account restrictions. A mobile app may allow a certain live game, while the connected-TV app requires provider authentication. A browser may work, while a smart TV app is outdated. Test the exact device tied to the exact window, especially for Thursday, international and primetime games.',
]);

addDepth('nfl-week-5-viewing-guide-2026', 'week-5-deep-dive', 'Week 5 matchup and access depth', [
  'Week 5 is a complete sample of modern NFL viewing because it contains every major kind of window. The Thursday game creates a Prime Video check. The London game creates an early morning check. The early Sunday games create local-market choices. The late games create regional scarcity. Sunday night and Monday night create national prime-time checks. If a fan can plan Week 5 correctly, the rest of October becomes easier to understand.',
  'The away-at-home convention matters in every row. Buccaneers at Cowboys means Dallas is the home team. Eagles at Jaguars means Jacksonville is the designated home team for the London game. This affects local-market assumptions, team-site coverage and stadium context. It does not automatically tell every U.S. viewer what channel they receive, but it helps interpret team pages, ticket references and local broadcast notes.',
  'The 1 p.m. ET window is usually where the most confusion happens. A viewer may see five or six games listed at the same time and assume they can choose any of them through the local TV guide. In reality, the local CBS or FOX affiliate usually shows a selected game based on market rules and network inventory. If your desired game is not local, you need an out-of-market path or a different legal way to follow it. The schedule is the menu, not the entitlement.',
  'The 4:05 and 4:25 distinction also matters. Late-afternoon games can sit in different network windows, and a nationally featured late game can reduce the number of alternatives in some markets. If your favorite team plays late, check whether it is your local affiliate’s chosen game. If you are neutral, the late window may be easier to watch as a national-style experience because fewer games compete at once.',
  'Sunday Night Football in Week 5 should be monitored because the flex period has begun. The listed Ravens-Falcons game gives viewers a planning anchor, but the NFL’s procedures allow eligible Sunday afternoon games to move into Sunday night within the stated rules. That does not mean a move will happen. It means the careful viewer rechecks the Sunday night line during game week rather than relying on a calendar invite created months earlier.',
  'Monday Night Football is easier to isolate because it stands alone after the Sunday slate. Bills at Rams on October 12 becomes the week’s final national football event. If you are using a live TV streaming service, confirm the ESPN or ABC access path in advance. If you use a provider app, make sure the provider login has not expired. Monday night problems are especially annoying because there is no alternate Sunday game to switch to.',
  'The bye teams shape fantasy and fan behavior. Carolina and Kansas City being off means fans of those teams may pay more attention to divisional rivals, fantasy players must replace starters, and national discussion may shift away from those teams for a week. If you are building a watch party around a favorite team, check the bye line before assuming there is a missing listing.',
  'A final Week 5 tip is to plan the morning before Sunday arrives. The London game starts early enough that normal Sunday routines may not be ready. Put the coffee, app login and remote plan in place Saturday night. Then decide which 1 p.m. game is the priority, whether the late window matters, and whether Sunday night is a must-watch or background event.',
]);

addDepth('nba-opening-night-2026-watch-guide', 'opening-night-deep-dive', 'Opening Night viewer scenarios', [
  'The afternoon opener changes the normal NBA routine. Many fans associate the NBA with evening tipoffs, but Celtics-Pistons at 3 p.m. ET creates a workplace, school and commute problem. A viewer on the East Coast might follow live on a second screen. A viewer in the Central time zone may catch the second half after meetings. A Pacific viewer faces a noon start. Planning around that first game is less about hype and more about whether live viewing is realistic.',
  'The Knicks-76ers window carries ceremony risk and reward. If banner-night coverage matters to you, join before the listed 7 p.m. ET tipoff. If you only want live game action, the pregame and ceremony context may be optional. The difference matters for recordings: a recording that starts exactly at tipoff may miss meaningful arena moments, while a recording that starts too early may need more storage or manual navigation later.',
  'The late Thunder-Spurs game creates an endurance question. A fan who starts at 3 p.m. ET and watches continuously may be on hour seven by the time the third game tips. That is a lot of basketball for a Tuesday. A better plan is to choose intentional breaks, decide whether the first game is live or replay, and reserve attention for the matchup you care about most.',
  'NBC versus Peacock access should be tested separately. A household might receive local NBC through an antenna but use Peacock for the late game on a tablet. Another household might rely entirely on Peacock. Another might use a live TV service with local NBC but not use Peacock at all. The schedule line contains both options, but the viewer’s best path depends on account status, device support and local station availability.',
  'League Pass is best understood as a season product with blackout rules, not as a universal national-game solution. For Opening Night, all three games are nationally televised. In the United States, nationally broadcast games are blacked out live on League Pass under NBA support guidance, with next-day replay access at 6 a.m. ET. That distinction is crucial for fans who assume a basketball subscription means immediate live access to every game.',
  'Opening Night can also overlap with baseball and WNBA playoff context. If MLB League Championship Series games or WNBA Finals games are active that night, a multi-sport household should decide whether basketball gets the main screen for all three games or only the Knicks prime-time window. The correct answer depends on fandom, but the decision should be made before the first tip.',
  'For accessibility and comfort, test captions, audio output and picture settings before the tripleheader. Sports apps can default to different audio levels, and a long night makes small annoyances bigger. If you watch with family or friends, confirm whether everyone wants the studio show, only the game, or a mix with other sports updates during halftime.',
  'Opening week begins immediately after Opening Night, so avoid overloading the first article with every national game. If your interest is the Tuesday launch, stay focused on the tripleheader. If your interest is the broader pattern across ESPN, Prime Video, NBC and Peacock, the season guide is the right next read.',
]);

addDepth('nba-2026-27-viewing-guide', 'season-deep-dive', 'Season-long NBA viewing scenarios', [
  'A full-season NBA plan starts with the team you care about most. If that team is local, regional access and local blackouts are the first issue. If that team is out of market, League Pass may be useful for many games but national blackouts still apply. If you are a neutral viewer, national windows may be enough. Those three viewer types can look at the same schedule and need completely different products.',
  'The schedule release’s 80-assigned-games detail is more important than it looks. It means some December games cannot be known until NBA Cup Group Play results determine which teams advance and which teams need reassigned regular-season games. Fans who see gaps in early December should not assume the schedule is broken. It is intentionally designed around tournament outcomes.',
  'Recurring windows help fans build habits. Monday Peacock games, Tuesday NBC/Peacock games, Wednesday ESPN games, Thursday Prime Video games, Friday Prime Video or ESPN games, Saturday ABC or Prime Video games and Sunday ABC or NBC/Peacock games create a weekly rhythm. But rhythm is not entitlement. The exact game, platform and blackout status still need verification every time.',
  'Christmas deserves its own reminder because it attracts casual viewers who may not watch regular-season basketball every week. The NBA says Christmas has five games on ABC/ESPN/ESPN App for the 19th consecutive year. That makes December 25 a national basketball day, but it also means viewers should verify whether they will use ABC, ESPN, the ESPN App or a live TV package before holiday travel begins.',
  'The Play-In Tournament changes the end of the regular season. Teams near the middle of each conference may be fighting for direct playoff entry, Play-In position or elimination avoidance. That can make April games more meaningful than their national-profile status suggests. A favorite-team fan should track standings weekly in March and April instead of waiting for the final Sunday. A national viewer can focus on games with direct seeding implications.',
  'For League Pass users, travel is a real variable. The NBA says blackout restrictions are based on device location, IP address or location services and ZIP code. A fan who watches one team from home may see different restrictions while traveling for work. If you plan to watch on the road, open the app from the location where you will actually watch and confirm the live availability before tipoff.',
  'Device ecosystems also matter. ESPN App, Peacock, Prime Video, League Pass, local provider apps and live TV services may not all support the same older smart TV. A streaming stick can be the more stable solution if your television’s built-in app store is outdated. The time to learn that is in October, not during the Play-In Tournament or Christmas Day.',
  'The season-long plan should be revised three times: after NBA Cup Group Play, after the All-Star break and entering the final two weeks. Each checkpoint changes what matters. Cup results settle December games. The All-Star break clarifies contenders and injuries. The final two weeks clarify Play-In and playoff races. A static October calendar is useful, but an updated calendar is much better.',
]);

addDepth('2026-nba-cup-guide', 'cup-deep-dive', 'More NBA Cup examples and misconceptions', [
  'Point differential creates one of the tournament’s most unusual viewing incentives. In an ordinary regular-season game, the margin matters mainly for team evaluation and tiebreakers outside the game. In the Cup, margin can directly affect Group Play standings if teams tie. That can make the final minute of a 12-point game feel relevant, although coaches still have to balance player health, sportsmanship and normal game management.',
  'Total points scored is another reason not to stop watching only because a team has won. If point differential is tied, total Group Play points can become the next separator. A high-scoring style can therefore matter in standings math. Viewers should still rely on official NBA standings, because overtime exclusions and tie protocols can make manual calculations tricky.',
  'The prior-season record tiebreaker shows how the Cup connects to the broader league. It is not the first separator, but it can matter if teams remain tied after Group Play results, point differential and total points. That gives the tournament a built-in connection to the prior year without letting last season dominate the first tiebreaker.',
  'Wild-card races are easy to misunderstand because a team can fail to win its group and still advance. Each conference sends one wild card in addition to group winners. That means a second-place team in a very strong group might still have a path if its record and tiebreakers beat other non-winners. Fans should follow both the group table and the conference wild-card picture.',
  'The championship not counting in the regular-season standings is a deliberate distinction. It lets the Cup crown a winner without giving the two finalists an extra regular-season game that other teams do not play. For viewers, that means the championship is a trophy game, not a standings game. When checking team records after December 11, do not add the championship result as a normal regular-season win or loss.',
  'Cup games can be local-market viewing problems just like other NBA games. A game identified as a Cup game may still be available through a local broadcaster, League Pass with restrictions, or a national partner depending on the listing. The tournament label tells you the game counts for Cup standings; it does not by itself tell you the viewing platform.',
  'The national Group Play games are helpful for casual fans because they spotlight the tournament. The NBA says 15 Group Play games are broadcast across Prime Video, NBC and ESPN. If you only want to sample the Cup, start with those national windows. If you follow a team, track all four of its Group Play games, including any that are not part of the national selection.',
  'A final misconception is that the Cup interrupts the season. It is better understood as a layer placed on top of selected regular-season games. Most participating games still count normally, team records still matter, and non-Cup games continue around the tournament. The Cup adds stakes; it does not pause the NBA calendar.',
]);

addDepth('college-football-october-2026-tv-guide', 'college-deep-dive', 'Additional college football October planning depth', [
  'College football is more sensitive to late selection than most professional sports because networks want the strongest games in the best windows after teams reveal their current form. A matchup that looked ordinary in August can become a ranked showdown by October. A game that looked huge can lose national appeal after injuries or losses. Late TV selection is not chaos; it is part of how the sport maximizes relevance.',
  'Conference realignment also makes old assumptions less reliable. Viewers who learned a school’s traditional conference package years ago may now find that the team appears in different windows or on different partners. The safest source is the current season’s official schedule, not a memory of how the matchup used to be televised. This is especially important for fans returning to college football after a few seasons away.',
  'Rankings should be read as weekly context. A ranked label on NCAA.com helps explain why a game appears in a national window, but rankings are not permanent metadata. If a team loses the week before, the ranking can change. If a team wins a major game, it can move up. A viewer planning late October should refresh rankings and schedules together rather than treating an old ranked label as current truth.',
  'The noon ET window can be deceptively strong. Some conferences and networks intentionally place major games at noon, especially when they want a national lead-in or a signature broadcast window. Do not assume the best game is always at night. On October 10, the listed noon examples include several ranked or major-conference games. A viewer who waits until evening may miss the day’s most important result.',
  'Late-night college football is its own viewing category. Games that start around 10 p.m. ET can be comfortable in the Mountain or Pacific time zones but run past midnight in the East. If you follow a western team from the East Coast, decide whether live viewing is worth the late finish. If you use replays or highlights, turn off score alerts before going to sleep.',
  'Neutral-site games require special care. A rivalry listed as “vs.” at a neutral location can have different TV, ticket and local-time implications than a normal home game. Do not infer the venue from one team’s name. Check the official listing for stadium or city, especially for long-running rivalries that may change venues or use special event branding.',
  'Streaming labels can be confusing because the same company name may appear in different products. ESPN, ESPN2, ESPNU, SEC Network, ACC Network and ESPN+ are not interchangeable. Peacock is not the same as NBC over the air. FOX is not the same as FS1 or Big Ten Network. A schedule guide is useful only when it preserves the exact channel or platform label.',
  'For multi-game Saturdays, use a three-tier list: must-watch live, follow by score, and watch highlights later. Put rivalries, ranked matchups involving your team and elimination-like conference games in the first tier. Put secondary ranked games in the second tier. Put curiosity games in the third tier. That structure makes a 12-hour Saturday feel manageable instead of random.',
]);

addDepth('how-to-watch-2026-wnba-playoffs-finals', 'wnba-deep-dive', 'Additional WNBA playoff viewing depth', [
  'The single-bracket format is one of the most important WNBA playoff details for new viewers. Because the top eight teams qualify regardless of conference, seeding reflects the league-wide regular-season order rather than a conference split. That can create matchups that look different from NBA or other league brackets. The number beside the team is the bracket seed, and that seed drives home-court advantage.',
  'The first-round home pattern is unusual enough to remember: the higher seed hosts Games 1 and 3, while the lower seed hosts Game 2. That means the lower seed gets a home game quickly, but the higher seed hosts the deciding game if the series reaches Game 3. For viewers, Game 2 can be a dramatic swing because it is the lower seed’s home chance to extend or control the series.',
  'Semifinals create more breathing room but also more schedule uncertainty. Games 1 and 2 at the higher seed can produce a 2-0 lead before the lower seed hosts. Games 3 and 4 can either close the series or force a return trip. Game 5 is only played if the teams split enough results to require it. A fan should check the bracket after every semifinal game rather than assuming every listed date will happen.',
  'The Finals best-of-seven format brings the WNBA closer to the familiar championship rhythm of other major leagues. A series can end in four, five, six or seven games. Each length creates a different October calendar. A sweep ends before the final week. A six-game series reaches October 29. A seven-game series reaches October 31, potentially overlapping with World Series Game 7 and college football. Conditional labeling is essential.',
  'Broadcast platform names should be preserved exactly. NBC, USA and Peacock are not the same viewing path even when they belong to the same broader media family. A viewer may receive NBC but not USA, or have Peacock but not a live TV package. A live TV service may include USA but local NBC availability may vary. Check every Finals game row because the listed coverage changes by game.',
  'Replay viewing is especially useful for weeknight Finals games at 8 p.m. ET if work, family or travel prevents live viewing. But replay timing is not the same as live availability. WNBA League Pass and support guidance should be checked for blackouts and replay access. If avoiding spoilers matters, turn off push notifications from the WNBA app, team apps and general sports apps.',
  'Home-court context can help viewers interpret momentum. If the higher seed wins Games 1 and 2, the lower seed still has a home response opportunity. If the lower seed steals one of the first two games, the middle of the series becomes much more tense. Knowing the venue pattern makes it easier to understand why commentators emphasize a “split,” a “hold serve” or a “must-win home game.”',
  'The WNBA postseason also deserves its own plan rather than being treated as background to NBA Opening Night or MLB. The Finals dates are specific, the format is different, and the national coverage windows are separate. Use cross-sport calendars for conflicts, but keep the WNBA bracket page open for the actual championship path.',
]);

addDepth('october-2026-sports-calendar', 'calendar-deep-dive', 'More cross-sport calendar planning examples', [
  'The most useful October calendar habit is to rank events by replaceability. A regular-season NFL game has standings value but will have highlights, recaps and possibly replay options. A World Series Game 7, if it exists, is a once-only championship decider. A WNBA Finals Game 7, if it exists, is the same kind of event. NBA Opening Night is fixed and celebratory, but it does not eliminate a team. College football rivalry games can be emotionally irreplaceable for fans even when they are regular-season games. The calendar cannot choose for you, but it can show the tradeoffs.',
  'The first two weeks of October are football-and-baseball heavy. NBA fans may be waiting for October 20, but NFL, college football, MLB postseason and WNBA semifinals are already active. That means a sports household should not postpone planning until Opening Night. By then, several postseason series may already have changed the late-month calendar.',
  'The middle of the month is where series tracking matters most. MLB League Championship Series games can disappear if one team wins quickly, while WNBA semifinal dates can vanish if a best-of-five series ends early. A calendar app can hold every possible date, but you should update it after each result. Otherwise, your month fills with games that no longer exist.',
  'The October 19-25 stretch is the most diverse week. It includes WNBA Finals games, NBA Opening Night, NBA opening-week games, World Series Games 1 and 2, NFL Week 7 and college football. A casual viewer might choose only the national showcase events. A committed household might need a nightly screen plan. The hub’s job is to show that the week is dense before it arrives.',
  'The final week can swing dramatically based on baseball and WNBA results. If both championship series end early, the week is led by NBA Cup launch, NFL and college football. If both series go long, the week can include multiple championship-level games. That uncertainty is not a flaw in the calendar; it is the nature of postseason sports.',
  'Time zones make cross-sport overlap more complicated. A 3:30 p.m. ET WNBA game is early afternoon in the West. A 9:30 p.m. ET NBA tip is comfortable in the West but late in the East. A 9:30 a.m. ET NFL London game is very early on the Pacific coast. When comparing sports, convert the times before deciding which games truly overlap in your household.',
  'For MoaTV readers, this hub should be paired with device planning. A household with one primary TV, one tablet and one phone can handle overlap better than a household that assumes everything must run through the same screen. Decide which device handles secondary games, which app needs sign-in, and which sport gets the room with the best audio.',
  'The calendar also helps avoid overclaiming. It points to official league schedules and sport-specific guides, but it does not promise that MoaTV carries a network, event or league package. That distinction protects the reader. First verify the official event and listed broadcaster, then verify your legal access, then use MoaTV site pages only for confirmed setup and plan information.',
]);

addDepth('2026-world-series-viewing-guide', 'world-series-access-notes', 'World Series access checks before Game 1', [
  'Before Game 1, run a complete access rehearsal. If you use an antenna, tune to the local FOX station during another live program and confirm the signal is stable. If you use a live TV streaming service, search the guide for the local FOX station, FOX Deportes if needed, and any app tile tied to FOX One. If you use a provider login, sign out and sign back in so you know the password works. This sounds excessive until a championship broadcast begins and the household discovers the app has expired credentials.',
  'The Spanish-language viewing path deserves its own check. FOX Deportes is listed by MLB, but not every household package includes it. A bilingual household may want English audio on one screen and Spanish-language coverage on another, or may prefer the Spanish-language telecast entirely. Confirm that availability before the series begins because adding or changing a TV package on game night may not be practical.',
  'If you plan to host guests, write the schedule in conditional language. “Game 6 if necessary, Friday, October 30” is clearer than “World Series party Friday.” Guests who are less familiar with baseball may not understand that a series can end before every listed date. Use the series score in the invitation thread or calendar note so everyone knows whether the plan is still live.',
  'For parents and families, late endings matter. A game listed in prime time can run well past normal bedtime, especially with pitching changes, reviews and high-leverage innings. If children want to watch, decide whether the plan is first pitch only, through the fifth inning, or the full game if it is close. That expectation avoids arguments during the most important innings.',
  'The safest final rule is to keep one official source and one household source. The official source is MLB.com for dates, teams and if-necessary status. The household source is your provider or app guide for access. Do not let social posts, old screenshots or search snippets outrank either of those sources once the series begins.',
]);

addDepth('nfl-october-2026-tv-guide', 'nfl-october-local-method', 'A local-market verification method for October Sundays', [
  'A reliable Sunday afternoon method has four steps. First, identify the game you want from NFL.com. Second, determine whether it is in your local market by checking the teams involved and the affiliate guide for your ZIP code. Third, confirm whether the game appears on CBS, FOX or an out-of-market product in your household. Fourth, test the device before kickoff. This method is slower than scanning a national schedule, but it answers the question that actually matters: can this household watch this game live?',
  'The method also helps traveling fans. If you leave your home market for a weekend, the local game available on the hotel TV or streaming app can change. A fan who normally receives a local team at home may become out of market on the road. Conversely, a fan traveling into a team’s market may receive a game that is unavailable at home. Location matters in NFL viewing, so verify from the place where you will watch.',
  'Use October as a rehearsal for the higher-stakes part of the season. Flex procedures become more consequential later, playoff races tighten, and holiday windows add special access rules. If you learn the difference between local Sunday games, national windows, NFL+ mobile access and Sunday Ticket in October, December becomes much less confusing.',
]);

addDepth('nfl-week-5-viewing-guide-2026', 'week-5-troubleshooting', 'Week 5 troubleshooting by viewing window', [
  'For Thursday night, the common problem is account or device access. Open Prime Video early, search for Thursday Night Football, and confirm whether the live event tile appears. If you are in a participating local market, check the local over-the-air or station option separately. Do not assume the presence of Prime Video movies and shows means the sports entitlement is ready on every profile or device.',
  'For the London game, the common problem is timing. A viewer may wake up ten minutes before kickoff and discover that the app needs an update or the TV is on the wrong input. Because the game starts so early in much of the country, prepare the night before. Put the device on the correct input, update apps and save the game listing if the platform allows it.',
  'For Sunday afternoon, the common problem is game selection. The guide might show NFL football on CBS or FOX, but not the specific game you want. If the local affiliate is carrying a different matchup, the schedule is not wrong; your market assignment is different. Decide whether radio, highlights, Sunday Ticket or a legal replay is the realistic alternative.',
  'For Sunday and Monday night, the common problem is assuming all prime-time games use the same app. Sunday night and Monday night can involve different network families and provider requirements. If you watched the Sunday night game successfully, that does not prove the Monday night game is ready. Check each window on its own terms.',
  'For fans using multiple devices, label them by role. The living-room TV gets the main game. A tablet gets score updates or a legally available secondary stream. A phone gets fantasy, stats or audio. This prevents frantic switching and makes the long Week 5 Sunday easier to manage.',
]);

addDepth('nba-opening-night-2026-watch-guide', 'opening-night-broadcast-flow', 'Opening Night broadcast-flow details', [
  'Opening Night broadcasts often include more ceremony than a normal January game. The Knicks banner context, the league’s national return window and the first look at new rosters can all stretch the pregame conversation. That does not mean the tipoff time is wrong; it means the broadcast product is bigger than the game clock. If you care about introductions, join early. If you only care about live play, the listed tip time is still the anchor.',
  'Commercial breaks, halftime shows and studio segments can also affect how a viewer uses the night. A tripleheader can feel like continuous basketball, but the breaks between games may include analysis, interviews and schedule previews. Use those breaks to check other sports scores, reset food, or switch devices if the next game matters more to another person in the household.',
  'The first week of the NBA season is also when app surfaces change. Peacock, NBC, NBA.com and team apps may promote different tiles, highlight packages or live-entry points. If you cannot find the game, search by team names rather than only by “Opening Night.” The game tile may be labeled by matchup, league event, network show or live channel.',
  'For replay viewers, decide whether you want the full broadcast or a condensed version. A full replay preserves ceremonies and commentary, while highlights prioritize possessions and final-score context. If you are avoiding spoilers, do not open a sports homepage casually; the final score may appear before you reach the replay page.',
  'Opening Night is also a good moment to test the season routine. If NBC/Peacock works well on October 20, keep the login available for later NBCUniversal windows. If the setup is frustrating, solve it before the next national game. The first night can double as a technical rehearsal for the rest of the season.',
]);

addDepth('nba-2026-27-viewing-guide', 'season-calendar-maintenance', 'Maintaining an NBA viewing calendar all season', [
  'A season calendar should not be built once and ignored. Add the official schedule in October, then revisit it after Cup Group Play, after the trade deadline period, after All-Star, and with two weeks left in the regular season. The games that matter most can change as standings, injuries and national relevance change. A smart viewer keeps the calendar alive instead of treating opening-week priorities as permanent.',
  'For team-specific calendars, subscribe to the team’s official calendar if available, but still check national listings for platform changes. Team calendars are useful for date and opponent, while league and broadcaster pages are useful for national access. If a game is flexed, moved, added after Cup results or selected for a national window, the freshest official source should guide the final plan.',
  'For families, divide the season into must-watch categories. Opening Night, rivalry games, a favorite team’s national appearances, Christmas, NBA Cup knockout games, All-Star events, Play-In games and playoffs all deserve different attention levels. Not every Tuesday in January requires the same effort. Categorizing games prevents burnout during an 82-game season.',
  'For out-of-market fans, watch the national schedule carefully. A team that is easy to watch on League Pass during ordinary local broadcasts can become harder to watch live when selected for ABC, ESPN, NBC, Peacock or Prime Video. National attention is good for visibility but can change the access path. The viewer has to follow both fandom and rights.',
  'For local fans, the regional provider remains central. National games are exciting, but most of a team’s season may still be local. If your local provider changes, your live access can change even when the NBA schedule does not. Confirm local carriage before the season and again if you move, travel or change TV packages.',
  'For postseason-minded viewers, the final month is the most important maintenance period. Teams may rest players, chase seeding, avoid Play-In risk or fight for home court. National partners may emphasize games with standings consequences. Check the schedule and standings together rather than reading the game list in isolation.',
]);

addDepth('2026-nba-cup-guide', 'cup-tracking-method', 'A practical method for tracking Cup standings', [
  'After each Cup Night, write down four numbers for the team you follow: Cup wins, Cup losses, point differential and total points. Then compare that note with the official NBA standings. If your note disagrees with the NBA table, trust the official table because overtime treatment, corrections or tiebreaker scope may explain the difference.',
  'Track the group first, then the conference wild card. A team cannot worry about the wild card until it knows whether a group title is still realistic. If two teams are tied at the top and your team owns the head-to-head result, the path is different than if your team needs point differential help. The official standings usually make that easier to see than a raw schedule list.',
  'Do not overreact to one high-margin win. Point differential matters, but Group Play is only four games. A team can undo a large advantage with one bad loss. Conversely, a narrow loss to the strongest group opponent does not always eliminate a team if the wild-card path remains open. The tournament is short, but it still requires full-table context.',
  'When the knockout bracket arrives, reset the mental model. Group math no longer matters once the single-elimination games begin. A quarterfinal is simply win and advance. A semifinal is win and reach the championship. The championship is win and lift the Cup, but it does not count as a regular-season standings result. That shift from math to bracket is part of what makes the tournament readable.',
  'Viewers should also keep ordinary team goals in mind. A coach may want to win the Cup, develop rotations, manage minutes and maintain long-term regular-season health at the same time. The tournament adds stakes, but it does not erase the rest of the season. That is why some late-game decisions may look different from what a fan focused only on point differential expects.',
  'The cleanest way to explain the Cup to a new viewer is this: four group games decide eight knockout teams, tiebreakers can involve margin and scoring, the knockout rounds are single elimination, and the final crowns a Cup champion without adding a normal regular-season win. Everything else is detail layered on that core.',
]);

addDepth('college-football-october-2026-tv-guide', 'college-verification-workflow', 'A game-week verification workflow', [
  'On Monday or Tuesday, scan NCAA.com and conference pages for the week’s structure. On Wednesday, check school schedule pages for updates. On Thursday or Friday, confirm app and provider access for any weeknight games. On Saturday morning, refresh the full slate because late changes, weather notes or network clarifications can appear. This workflow fits the way college football information arrives.',
  'For ranked games, take screenshots only for personal reference and still revisit the source. Rankings, channels and kickoff notes can change from week to week. A screenshot from Sunday night may be useful, but it should not outrank the official listing on Friday. College football fans often share graphics quickly; official pages are slower but safer.',
  'For conference-network games, confirm the exact network in your TV package. SEC Network and SEC Network+ are different access concepts. ACC Network and an ACC game on ESPN are different paths. Big Ten Network is not the same as a game on FOX. If you are helping a less technical family member watch, write down the exact app or channel rather than only the conference name.',
  'For neutral-site games, check both teams’ schedule pages and the event site if available. Neutral games can have special branding, different ticketing, and sometimes unusual broadcast presentation. The venue can also affect time-zone assumptions. A game between two eastern teams is not automatically played in the Eastern time zone if the neutral site is elsewhere.',
  'For late-night games, build a spoiler plan. If you intend to watch a West Coast or Mountain time-zone game the next morning, turn off alerts for both teams and the conference. College football apps often push final scores immediately. A replay plan without notification control is rarely spoiler-free.',
]);

addDepth('how-to-watch-2026-wnba-playoffs-finals', 'wnba-series-management', 'Managing a WNBA playoff series as a viewer', [
  'A playoff series should be followed as a state machine: series score, next venue, next broadcast and elimination status. After every game, update those four fields. If the score is 2-0 in a best-of-five, the next game may be a clincher. If the score is 2-2, the next game is winner-take-all. If the Finals are 3-1, Game 5 can end the season. This simple tracking habit makes the bracket easier to understand.',
  'For the Finals, create conditional calendar entries with notes. Game 5: only if no team wins Games 1-4. Game 6: only if the trailing team wins at least two of the first five. Game 7: only if the series is tied 3-3. The exact wording is less important than the label. A conditional label prevents family or friends from assuming every listed game is guaranteed.',
  'The NBC/USA/Peacock pattern means viewers should verify multiple access paths. A household may watch Game 1 on local NBC and then discover Game 2 is on USA and Peacock. If the live TV package does not include USA, the plan changes. Check the entire Finals table before Game 1, not one game at a time after each result.',
  'Semifinal timing can affect Finals preparation. If one semifinal ends early and the other goes long, one finalist may have more rest. This guide does not predict performance from rest, but viewers should know why commentators discuss it. The bracket path, travel and rest can all become storylines before Game 1. Official WNBA previews are the best source for those current storylines.',
  'For fans new to the league, seed numbers are more useful than conference labels. A No. 2 versus No. 3 semifinal tells you the teams were close in the regular-season hierarchy, while a No. 1 versus No. 4 path tells a different story. Because the playoff field is league-wide, the seed is the quickest shorthand for regular-season position.',
  'For households following both WNBA and NBA, keep the competitions separate. NBA Opening Night is a regular-season start. The WNBA Finals are a championship series. If they overlap in the same week, the WNBA game may carry elimination stakes while the NBA game is an opener. That does not dictate what you watch, but it explains why the stakes are not equivalent.',
  'For mobile viewers, battery and data matter during playoff games. A full basketball broadcast can run long, and overtime is possible. If you plan to watch away from home, charge the device, use Wi-Fi where reliable and have headphones ready. Technical preparation is part of watching legally and comfortably.',
]);

addDepth('october-2026-sports-calendar', 'calendar-final-depth', 'Final calendar decision rules', [
  'When two live events overlap, ask three questions. Is either event an elimination or championship game? Is either event tied to my favorite team? Is either event difficult to replay without spoilers? Those questions usually produce a better answer than defaulting to the sport with the biggest national audience. October is personal as well as national.',
  'When an event is conditional, wait until the prior result before making expensive or complicated plans. A World Series Game 6 watch party, a WNBA Finals Game 7 gathering or a late-month double-screen night can be great, but it should not be treated as guaranteed. Conditional planning works best when everyone understands the trigger.',
  'When an event has pending TV details, save the date but not the final access path. This applies most often to college football and some local NFL Sunday assignments. Add a reminder to verify the channel later. A calendar that says “check network Thursday” is more useful than a calendar that guesses wrong.',
]);

addDepth('nba-opening-night-2026-watch-guide', 'opening-night-last-mile', 'Last-mile Opening Night checks', [
  'If you watch with a group, choose the broadcast priority before the first game starts. Some viewers want every studio segment, while others only care about live possessions. With three games on one night, that difference can create remote-control fatigue. Decide whether the stream stays on continuously or whether the group will pause between games for other sports, dinner or highlights.',
  'If you are watching from outside your usual home setup, verify the plan from that location. A Peacock login that works on your living-room TV may need a new device code on a hotel television. A local NBC station available at home may not appear in another city’s live TV package. Opening Night is national, but your device and account still behave locally.',
]);

addDepth('nba-2026-27-viewing-guide', 'season-last-mile', 'Final season-planning notes', [
  'Do not ignore radio and team audio. Some fans cannot watch every game live, but audio can be a useful legal way to follow a team while commuting, working or traveling. Audio rights are separate from video rights, so check the NBA app, team app or local radio information for the exact game. A good season plan includes video for priority games and audio or recaps for nights when live viewing is unrealistic.',
  'Finally, keep expectations realistic during an 82-game season. No viewer needs to watch every national window to be well informed. Pick the games that match your team, your schedule and your access. The goal of this guide is not to turn the season into homework; it is to make the important games easier to find when you actually want to watch.',
  'If a game listing changes, update one calendar rather than several scattered reminders. Duplicate reminders are how fans end up following an old time or opening the wrong app. Use the official NBA schedule as the master reference and let personal reminders follow it.',
]);

addDepth('2026-nba-cup-guide', 'cup-last-mile', 'Last-mile Cup viewing notes', [
  'The Cup is easiest to follow if you separate team loyalty from tournament curiosity. A team fan should track every group game involving that team. A neutral fan can focus on nationally televised Cup Nights, then return for quarterfinals, semifinals and the championship. Both approaches are valid, and neither requires watching all 60 Group Play games live.',
  'If you explain the Cup to someone during a game, avoid starting with every tiebreaker. Start with the stakes: this regular-season game also counts toward a four-game group table. If teams tie, the NBA has ordered tiebreakers. That short explanation is usually enough until the standings actually become close.',
  'Because Cup Nights are spread across several weeks, reminders should include the word Cup in the event title. Otherwise a Friday game can look like an ordinary regular-season listing and the tournament context gets lost.',
]);

addDepth('how-to-watch-2026-wnba-playoffs-finals', 'wnba-last-mile', 'Last-mile WNBA playoff checks', [
  'If the Finals reach the final week, review both the WNBA and MLB calendars together. October 29 and October 31 can become crowded if multiple championship series go long. Decide whether the WNBA game is the main-screen event before the night begins, especially if other household members are following baseball or football.',
  'If your preferred viewing path is Peacock, test both NBC/Peacock and USA/Peacock game entries. The branding can look similar, but the live event tile may differ by game. Add the Finals series to your watchlist if the app supports it, and do not assume that watching Game 1 automatically saves every later game.',
  'For new WNBA fans, the best context comes from pairing the bracket with one team story. Learn the seed, the path through the first round, and the semifinal result. That gives each Finals game meaning beyond the score and makes the home-court pattern easier to follow.',
]);

addDepth('october-2026-sports-calendar', 'calendar-last-mile', 'Last-mile calendar reminders', [
  'A final practical habit is to keep one weekly note for sports conflicts. List the must-watch events, the conditional events and the events that can move to highlights. Review it each Sunday night for the week ahead. October changes too quickly for a single month-view calendar to stay accurate without that weekly reset.',
]);

for (const article of data.articles.filter((item) => item.category === 'Sports')) {
  const secondImage = article.sectionImages?.[1];
  if (!secondImage) continue;
  const target = article.sections.find((section) => section.id === 'related-guides')
    || article.sections.find((section) => section.id === 'guide-index')
    || article.sections.at(-1);
  if (target && !target.body.some((block) => block.type === 'image' && block.image?.src === secondImage.src)) {
    target.body.unshift({ type: 'image', image: secondImage });
  }
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Expanded 10 sports articles for 2,500+ visible-word validation.');
