module.exports = {
    branches: [
        "main",
        { name: "dev", prerelease: true },
        { name: "vnext", prerelease: true },
    ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        ["@semantic-release/npm", { npmPublish: false }],
        [
            "@semantic-release/exec",
            {
                publishCmd: "npm publish --access public --tag <%= nextRelease.channel || 'latest' %>",
            },
        ],
        "@semantic-release/github",
    ],
};
