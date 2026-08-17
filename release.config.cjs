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
                // semantic-release adds node_modules/.bin to PATH, where this
                // repository has an older npm that cannot use OIDC trusted
                // publishing. Invoke the npm upgraded by the workflow directly.
                publishCmd: "\"$(dirname \"$(command -v node)\")/npm\" publish --access public --loglevel verbose --tag <%= nextRelease.channel || 'latest' %>",
            },
        ],
        "@semantic-release/github",
    ],
};
