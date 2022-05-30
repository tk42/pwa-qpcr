export enum WellType {
    WELL_96,
    WELL_384,
}


export type Well = {
    rows: number;
    columns: number;
    width: number;
    height: number;
}

export const getWell = (wt: WellType): Well | undefined => {
    switch (wt) {
        case WellType.WELL_96:
            return {
                rows: 8 + 1, // plus header
                columns: 12 + 1, // plus header
                width: 51.9685035, // iPad 4th gen. another size in another phone or tablet...
                height: 51.9685035,
            }
        case WellType.WELL_384:
            return {
                rows: 16 + 1, // plus header
                columns: 24 + 1, // plus header
                width: 21.87873995,
                height: 22.411417,
            }
        default:
            console.warn("Unknown WellType:" + JSON.stringify(wt));
    }
}
