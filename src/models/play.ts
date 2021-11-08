export class Play {
    readonly from: string;
    readonly position: [number, number];
    readonly hit: boolean;
    readonly destroyed: boolean;

    constructor(from: string, position: [number, number], hit: boolean, destroyed: boolean) {
        this.from = from;
        this.position = position;
        this.hit = hit;
        this.destroyed = destroyed;
    }

    buildMessage(userName: string) {
        let msg = ``;
        msg += `${this.from === 'user' ? `User ${userName} ` : `CPU `}`;
        if (!this.hit) {
            msg += 'Missed/water';
        } else {
            if (this.destroyed) {
                msg += 'hitted and destroyed a ship';
            } else {
                msg += 'hitted a ship';
            }
        }

        return msg;
    }

}