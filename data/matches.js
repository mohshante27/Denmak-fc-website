/**
 * Denmak FC - Matches & Standings Data
 * Edit this file to update fixtures, scores, and league standings!
 * Works both locally (double-clicking HTML) and when hosted on a server.
 */
const DenmakMatchesData = {
  "league": {
    "name": "FKF Division 1",
    "pool": "Zone A",
    "season": "2026/2027",
    "clubStats": {
      "points": 0,
      "position": 9,
      "matches": 0,
      "won": 0,
      "drawn": 0,
      "lost": 0,
      "goalDifference": "0",
      "form": ["W", "W", "W", "W", "W"]
    }
  },
  "nextMatch": {
    "homeTeam": "Congo Boys",
    "awayTeam": "Denmak FC",
    "date": "November 14, 2026",
    "time": "3:00 PM EAT",
    "venue": "Serani Ground, Mombasa",
    "competition": "FKF Division 1 Zone A",
    "ticketInfo": "Free Entry"
  },
  "fixtures": [
    {
      "id": "fix-1",
      "date": "Nov 14, 2026",
      "time": "3:00 PM",
      "homeTeam": "Congo Boys",
      "awayTeam": "Denmak FC",
      "venue": "Serani Ground",
      "competition": "FKF Division 1 Zone A"
    },
    {
      "id": "fix-2",
      "date": "Nov 18, 2026",
      "time": "2:00 PM",
      "homeTeam": "Young Bulls",
      "awayTeam": "Denmak FC",
      "venue": "Mombasa Sports Club",
      "competition": "FKF Division 1 Zone A"
    },
    {
      "id": "fix-3",
      "date": "Nov 22, 2026",
      "time": "3:00 PM",
      "homeTeam": "Denmak FC",
      "awayTeam": "Wayzata Boys",
      "venue": "Maganyakulo Ground",
      "competition": "FKF Division 1 Zone A"
    }
  ],
  "results": [
    {
      "id": "res-1",
      "date": "Jul 25, 2026",
      "opponent": "Spaki Youth",
      "location": "A",
      "score": "0 - 3",
      "status": "W",
      "outcome": "win",
      "competition": "League"
    },
    {
      "id": "res-2",
      "date": "Jul 18, 2026",
      "opponent": "Ubuntu FC",
      "location": "H",
      "score": "3 - 1",
      "status": "W",
      "outcome": "win",
      "competition": "League"
    },
    {
      "id": "res-3",
      "date": "Jul 11, 2026",
      "opponent": "Matano Mane",
      "location": "H",
      "score": "2 - 0",
      "status": "W/O",
      "outcome": "win",
      "competition": "League"
    },
    {
      "id": "res-4",
      "date": "Jul 5, 2026",
      "opponent": "Inter Dabaso",
      "location": "H",
      "score": "3 - 0",
      "status": "W",
      "outcome": "win",
      "competition": "League"
    },
    {
      "id": "res-5",
      "date": "Jul 25, 2026",
      "opponent": "Junior FC",
      "location": "A",
      "score": "1 - 2",
      "status": "W",
      "outcome": "win",
      "competition": "League"
    }
  ],
  "standings": [
    { "rank": 1, "team": "Teita Estate", "played": 1, "gd": "+1", "points": 3, "isClub": false },
    { "rank": 2, "team": "Gituru", "played": 1, "gd": "+1", "points": 3, "isClub": false },
    { "rank": 3, "team": "KAPA", "played": 1, "gd": "+1", "points": 3, "isClub": false },
    { "rank": 4, "team": "Kahawa United", "played": 1, "gd": "0", "points": 1, "isClub": false },
    { "rank": 5, "team": "Simba Apparel", "played": 1, "gd": "0", "points": 1, "isClub": false },
    { "rank": 6, "team": "Bumbani Stars", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 7, "team": "Congo Boys", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 8, "team": "Delmonte", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 9, "team": "Denmak FC", "played": 0, "gd": "0", "points": 0, "isClub": true },
    { "rank": 10, "team": "Green Berets", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 11, "team": "Kibra United", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 12, "team": "T15 - A", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 13, "team": "T16 - A", "played": 0, "gd": "0", "points": 0, "isClub": false },
    { "rank": 14, "team": "Zetech Titans", "played": 1, "gd": "-1", "points": 0, "isClub": false, "relegation": true },
    { "rank": 15, "team": "Royal Fresh", "played": 1, "gd": "-1", "points": 0, "isClub": false, "relegation": true },
    { "rank": 16, "team": "Strathmore Uni.", "played": 1, "gd": "-1", "points": 0, "isClub": false, "relegation": true }
  ]
};

if (typeof window !== 'undefined') {
  window.DenmakMatchesData = DenmakMatchesData;
}
