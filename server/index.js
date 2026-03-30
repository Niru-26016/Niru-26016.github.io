require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow your portfolio domain(s)
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://niranjanreddy.me',
        'https://niru-26016.github.io',
        /\.vercel\.app$/
    ]
}));

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'Niru-26016';
const GRAPHQL_URL = 'https://api.github.com/graphql';

// Helper: call GitHub GraphQL
async function githubGraphQL(query, variables = {}) {
    const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'portfolio-api'
        },
        body: JSON.stringify({ query, variables })
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`GitHub API error ${res.status}: ${text}`);
    }

    return res.json();
}

// ─── GET /api/repos — Pinned repositories ───
app.get('/api/repos', async (req, res) => {
    try {
        if (!GITHUB_TOKEN) {
            return res.status(500).json({ error: 'GitHub token not configured' });
        }

        const { data } = await githubGraphQL(`
            query ($username: String!) {
                user(login: $username) {
                    pinnedItems(first: 6, types: REPOSITORY) {
                        nodes {
                            ... on Repository {
                                name
                                description
                                url
                                primaryLanguage { name }
                                stargazerCount
                                forkCount
                                repositoryTopics(first: 6) {
                                    nodes { topic { name } }
                                }
                            }
                        }
                    }
                }
            }
        `, { username: GITHUB_USERNAME });

        const repos = data.user.pinnedItems.nodes.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description provided.',
            language: repo.primaryLanguage?.name || 'Code',
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            url: repo.url,
            topics: repo.repositoryTopics.nodes.map(t => t.topic.name)
        }));

        res.json(repos);
    } catch (err) {
        console.error('Error fetching repos:', err.message);
        res.status(500).json({ error: 'Failed to fetch repos' });
    }
});

// ─── GET /api/contributions — Contribution data ───
app.get('/api/contributions', async (req, res) => {
    try {
        if (!GITHUB_TOKEN) {
            return res.status(500).json({ error: 'GitHub token not configured' });
        }

        const { data } = await githubGraphQL(`
            query ($username: String!) {
                user(login: $username) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                    weekday
                                    color
                                }
                            }
                        }
                    }
                }
            }
        `, { username: GITHUB_USERNAME });

        const calendar = data.user.contributionsCollection.contributionCalendar;

        res.json({
            total: calendar.totalContributions,
            weeks: calendar.weeks
        });
    } catch (err) {
        console.error('Error fetching contributions:', err.message);
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});

// ─── Health check ───
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasToken: !!GITHUB_TOKEN });
});

// Local dev only — Vercel uses the exported app as a serverless function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
    });
}

module.exports = app;
