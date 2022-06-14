import { SimData, GenObj } from "./interfaces"

const data: SimData = {
    years: {
        min: 2012,
        max: 2021
    },
    monthsList: [
        {
            min: 2012,
            max: 2012,
            sims: ["oct", "dec"]
        },
        {
            min: 2013,
            max: 2017,
            sims: ["feb", "april", "july", "oct", "dec"]
        },
        {
            min: 2018,
            max: 2021,
            sims: ["spring", "summer", "fall", "winter"]
        },
        {
            min: 2022,
            max: 2022,
            sims: ["spring"],
            isMax: true
        }
    ],
    excludeChapters: {
        2015: {
            "april": ["q2"]
        }
    },
    monthsTranslate: {
        'feb': 'פברואר',
        'april': 'אפריל',
        'july': 'יולי',
        'oct': 'אוקטובר',
        'dec': 'דצמבר',
        'winter': 'חורף',
        'spring': 'אביב',
        'summer': 'קיץ',
        'fall': 'סתיו'
    },
    chaptersTranslate: {
        'essay': 'חיבור',
        'v1': 'מילולי 1',
        'v2': 'מילולי 2',
        'q1': 'כמותי 1',
        'q2': 'כמותי 2',
        'e1': 'אנגלית 1',
        'e2': 'אנגלית 2'
    },
    chapters: ['essay', 'v1', 'v2', 'q1', 'q2', 'e1', 'e2']
}

export const chaptersMap: GenObj = {
    default: {
        essay: {
            start: 2,
            end: 3,
            skip: true
        },
        v1: {
            start: 4,
            end: 11
        },
        v2: {
            start: 12,
            end: 19
        },
        q1: {
            start: 20,
            end: 27
        },
        q2: {
            start: 28,
            end: 35
        },
        e1: {
            start: 36,
            end: 43
        },
        e2: {
            start: 44,
            end: 51
        }
    },
    2015: {
        "april": {
            essay: {
                start: 2,
                end: 3,
                skip: true
            },
            v1: {
                start: 4,
                end: 11
            },
            v2: {
                start: 12,
                end: 19
            },
            q1: {
                start: 20,
                end: 27
            },
            e1: {
                start: 29,
                end: 36
            },
            e2: {
                start: 37,
                end: 44
            }
        }
    }
}

export default data

