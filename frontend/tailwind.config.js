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
                '1/8': '12.5%',
                '1/7': '13.333333%',
                '6/7': '85714285714%',
                '1/10': '10%',
                '60%': '60%'
            }
        },
        plugins: [],
    }
}