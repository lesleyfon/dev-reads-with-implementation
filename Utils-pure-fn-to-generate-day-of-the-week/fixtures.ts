export default [
    {
        description: 'getDayOfTheWeekString returns correct day for 2024-10-08(yyyy-mm-dd)',
        assert: {
            year: 2024,
            month: 10,
            day: 8,
        }, expected: "Tuesday"
    },
    {
        description: 'getDayOfTheWeekString returns correct day for 2023-01-01(yyyy-mm-dd)',
        assert: {
            year: 2023,
            month: 1,
            day: 1,
        }, expected: "Sunday"
    },
    {
        description: 'getDayOfTheWeekString returns correct day for 2000-02-29(yyyy-mm-dd)',
        assert: {
            year: 2000,
            month: 2,
            day: 29
        }, expected: "Tuesday"
    },
    {
        description: 'getDayOfTheWeekString returns correct day for 1999-12-31(yyyy-mm-dd)',
        assert: {
            year: 1999,
            month: 12, day: 31
        }, expected: "Friday"
    },
    {
        description:
            'getDayOfTheWeekString returns correct day for 2022-07-04(yyyy-mm-dd)',
        assert: {
            year: 2022,
            month: 7, day: 4,
        }, expected: "Monday"
    },
]