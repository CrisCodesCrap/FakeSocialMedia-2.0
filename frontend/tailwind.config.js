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
                '1/8': '12.5%',
                '7/8': '87.5%',
            },
            width: {
                '156': '38rem',
                '144': '36rem',
                '180': '45rem',
            },
            maxWidth: {
                '2/3': '66%',
            }

        },
        plugins: [],
    }
}