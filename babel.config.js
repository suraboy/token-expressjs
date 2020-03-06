module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    ignore: [
        "node_modules",
        "assets",
        "view",
        "public",
        "test",
        "spec",
        "logs",
        "lib/jasmine_examples",
        "dist"
    ]
};