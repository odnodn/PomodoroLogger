import { SourceData } from '../../dataMerger';

export const data: SourceData = {
    boards: {
        a: {
            _id: 'a',
            description: 'a',
            doneList: 'done',
            focusedList: 'focused',
            lists: ['done', 'focused', 'todo'],
            name: 'a',
            relatedSessions: [],
            spentHours: 0,
            lastVisitTime: 1000,
        },
    },
    cards: {
        card_a: {
            _id: 'card_a',
            content: 'card',
            sessionIds: ['sess0'],
            spentTimeInHour: {
                actual: 10,
                estimated: 100,
            },
            title: 'card',
        },
    },
    lists: {
        done: {
            _id: 'done',
            cards: ['card_a'],
            title: 'done',
        },
        focused: {
            _id: 'focused',
            cards: [],
            title: 'focused',
        },
    },
    move: [
        {
            cardId: 'card_a',
            fromListId: 'done',
            toListId: 'focused',
            time: 1,
        },
        {
            cardId: 'card_a',
            fromListId: 'focused',
            toListId: 'done',
            time: 10,
        },
    ],
    records: [
        {
            _id: 'sess0',
            apps: {},
            spentTimeInHour: 10,
            startTime: 123000,
            switchTimes: 100,
        },
    ],
};
