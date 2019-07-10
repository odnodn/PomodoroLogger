import activeWin, { BaseResult } from 'active-win';

export type ActiveWinListener = (result: BaseResult) => void;
export class Monitor {
    timer?: number;
    intervalTimeout: number;
    listener: ActiveWinListener;
    constructor(listener: ActiveWinListener, interval: number = 5000) {
        this.timer = undefined;
        this.intervalTimeout = interval;
        this.listener = listener;
    }

    start = () => {
        if (this.timer) {
            return;
        }

        this.timer = setInterval(this.watch, this.intervalTimeout);
        this.watch();
    };

    watch = async () => {
        const data = await activeWin();
        if (data) {
            this.listener(data);
        }
    };

    stop = () => {
        clearInterval(this.timer);
        this.timer = undefined;
    };
}
