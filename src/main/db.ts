/* istanbul ignore file */
import nedb from 'nedb';
import { dbPaths } from '../config';

const { projectDB, sessionDB, settingDB, kanbanDB, cardsDB, listsDB, moveDB } = dbPaths;
export let DBs = {
    projectDB: new nedb({ filename: projectDB }),
    sessionDB: new nedb({ filename: sessionDB }),
    settingDB: new nedb({ filename: settingDB }),
    kanbanDB: new nedb({ filename: kanbanDB }),
    cardsDB: new nedb({ filename: cardsDB }),
    listsDB: new nedb({ filename: listsDB }),
    moveDB: new nedb({ filename: moveDB }),
};

// Avoid nedb init error
export async function loadDBs() {
    const promises = [];
    for (const db in DBs) {
        promises.push(
            new Promise((r, reject) => {
                let times = 0;
                const load = () => {
                    // @ts-ignore
                    DBs[db].loadDatabase((err) => {
                        if (!err) {
                            r();
                            return;
                        }

                        console.error(err);
                        if (times > 20) {
                            reject(
                                `Cannot load database ${db} after 10 times tries. (${err.toString()})`
                            );
                        }

                        setTimeout(load, 500);
                        times += 1;
                    });
                };

                load();
            })
        );
    }

    await Promise.race([
        Promise.all(promises),
        new Promise((_, r) => setTimeout(() => r(new Error('Timeout')), 20000)),
    ]);
}

export async function refreshDbs() {
    DBs = {
        projectDB: new nedb({ filename: projectDB }),
        sessionDB: new nedb({ filename: sessionDB }),
        settingDB: new nedb({ filename: settingDB }),
        kanbanDB: new nedb({ filename: kanbanDB }),
        cardsDB: new nedb({ filename: cardsDB }),
        listsDB: new nedb({ filename: listsDB }),
        moveDB: new nedb({ filename: moveDB }),
    };

    await loadDBs();
    return DBs;
}

export async function compact() {
    const promises = Object.values(DBs).map(
        (db) =>
            new Promise((r) => {
                db.once('compaction.done', r);
                (db as nedb).persistence.persistCachedDatabase(r);
            })
    );

    await Promise.race([Promise.all(promises), new Promise((r) => setTimeout(r, 2000))]);
}
