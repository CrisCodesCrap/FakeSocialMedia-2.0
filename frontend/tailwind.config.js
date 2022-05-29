module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'allaround': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
            },
            height: {
                '112': '28rem',
                '84': '21rem',
            }
        },
        plugins: [],
    }
}