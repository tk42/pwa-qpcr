import { Well, WellType, getWell } from './welltype';
import { hash, now } from './common';

export class Style {
    private static storage_key = "qpcrtracer.style"

    value: string = '';
    label: string = '';
    color: string = '';

    constructor(init?: Partial<Style>) {
        Object.assign(this, init);
    }

    static LoadItems(): Style[] {
        return JSON.parse(localStorage.getItem(Style.storage_key) || "[]");
    }

    LoadItem(key: string): Style | undefined {
        return Style.LoadItems().find(e => e.value === key);
    }

    SaveItem(): void {
        const styles: Style[] = Style.LoadItems();
        styles.push(this);
        localStorage.setItem(Style.storage_key, JSON.stringify(styles));
    }

    SaveItems(items: Style[]): void {
        localStorage.setItem(Style.storage_key, JSON.stringify(items));
    }

    static ClearItems(): void {
        localStorage.clear();
    }
}

export const DEFAULT_STYLE: Style = new Style({
    label: "Standard-A",
    value: "std-a",
    color: "#ffcccc",
});

export const DEFAULT_BLANK_STYLE: Style = new Style({
    value: "__blank__",
    label: "blank",
    color: "#fff",
});

export const DEFAULT_THEME: Style[] = [
    DEFAULT_BLANK_STYLE,
    DEFAULT_STYLE,
    new Style({
        label: "Sample-A",
        value: "sample-a",
        color: "#ff7f7f",
    }),
    // new Style({
    //   label: "Standard2",
    //   value: "std2",
    //   color: "#ffcce5",  
    // }),
    // new Style({
    //   label: "Sample2",
    //   value: "sample2",
    //   color: "#ff7fbf",  
    // }),
    // new Style({
    //   label: "Standard3",
    //   value: "std3",
    //   color: "#ffccff",  
    // }),
    // new Style({
    //   label: "Sample3",
    //   value: "sample3",
    //   color: "#ff7fff",  
    // }),
    new Style({
        label: "Standard-B",
        value: "std-b",
        color: "#e5ccff",
    }),
    new Style({
        label: "Sample-B",
        value: "sample-b",
        color: "#bf7fff",
    }),
    new Style({
        label: "Standard-C",
        value: "std-c",
        color: "#ccccff",
    }),
    new Style({
        label: "Sample-C",
        value: "sample-c",
        color: "#7f7fff",
    }),
    new Style({
        label: "Standard-D",
        value: "std-d",
        color: "#cce5ff",
    }),
    new Style({
        label: "Sample-D",
        value: "sample-d",
        color: "#7fbfff",
    }),
    // new Style({
    //   label: "Standard7",
    //   value: "std7",
    //   color: "#ccffff",  
    // }),
    // new Style({
    //   label: "Sample7",
    //   value: "sample7",
    //   color: "#7fffff",  
    // }),
    // new Style({
    //   label: "Standard8",
    //   value: "std8",
    //   color: "#ccffe5",  
    // }),
    // new Style({
    //   label: "Sample8",
    //   value: "sample8",
    //   color: "#7fffbf",  
    // }),
    new Style({
        label: "Standard-E",
        value: "std-e",
        color: "#ccffcc",
    }),
    new Style({
        label: "Sample-E",
        value: "sample-e",
        color: "#7fff7f",
    }),
    // new Style({
    //   label: "Standard10",
    //   value: "std10",
    //   color: "#e5ffcc",  
    // }),
    // new Style({
    //   label: "Sample10",
    //   value: "sample10",
    //   color: "#bfff7f",  
    // }),
    // new Style({
    //   label: "Standard11",
    //   value: "std11",
    //   color: "#ffffcc",  
    // }),
    // new Style({
    //   label: "Sample11",
    //   value: "sample11",
    //   color: "#ffff7f",  
    // }),
    new Style({
        label: "Standard-F",
        value: "std-f",
        color: "#ffe5cc",
    }),
    new Style({
        label: "Sample-F",
        value: "sample-f",
        color: "#ffbf7f",
    }),
]


export class Cell {
    // private static storage: LowSync<Cell[]> = new LowSync(new JSONFileSync<Cell[]>('style.json'));

    id: string = '';
    parent_id: string = '';
    label: number = 0;
    x: number = 0;
    y: number = 0;
    style: string = ''; // style_id

    constructor(init?: Partial<Cell>) {
        Object.assign(this, init);
    }

    // LoadItems(): Cell[] | null {
    //     Cell.storage.read()
    //     return Cell.storage.data;
    // }

    // SaveItem(): void {
    //     (Cell.storage.data || [])?.push(this)
    //     Cell.storage.write()
    // }

    // SaveItems(items: Cell[]): void {
    //     (Cell.storage.data || [])?.push(...items)
    //     Cell.storage.write()
    // }
}

export class Sheet {
    id?: string = '';
    parent_id?: string = '';
    name?: string = '';
    no?: number = 0;
    lock?: boolean = false;
    well?: Well;
    version?: number = 0;
    cells?: Cell[] = []; // last_cnt = cells.length, last_pos = cells[-1]
    theme: Style[] = DEFAULT_THEME; // all styles in the sheet
    style: Style = DEFAULT_STYLE; // current style
    create_at?: number = 0;
    update_at?: number = 0;
    delete?: boolean = false;

    constructor(init?: Partial<Sheet>) {
        Object.assign(this, init);
    }

    // called after double tapped
    AddCells(style: Style, xs: number[], ys: number[], orderMin: number, allSameLabel?: boolean): void {
        let arr: Cell[] = [];

        if (xs.length === 1) {
            const x = xs[0]
            arr = ys.map((y, index) => new Cell({
                id: hash(),
                label: (allSameLabel) ? orderMin : orderMin + index,
                x: x,
                y: y,
                style: style.value,
            }))
            this.update_at = new Date().getTime() / 1000
        } else if (ys.length === 1) {
            const y = ys[0]
            arr = xs.map((x, index) => new Cell({
                id: hash(),
                label: (allSameLabel) ? orderMin : orderMin + index,
                x: x,
                y: y,
                style: style.value,
            }))
            this.update_at = new Date().getTime() / 1000
        }

        this.cells = this.cells!.concat(arr)

        console.log("AddCells", xs.toString(), ",", ys.toString(), " then length is ", this.cells?.length, " and orderMin is ", orderMin)
    }
}

export class Experiment {
    private static storage_key = "qpcrtracer.experiment"

    id?: string = "";
    parent_id: string = "root";
    name?: string = "";
    no?: number = 0;
    datetime?: number = 0;
    count?: number = 0;
    lock?: boolean = false;
    well?: Well;
    create_at?: number = 0;
    update_at?: number = 0;
    version?: number = 0;
    sheets: Sheet[] = [];
    delete?: boolean = false;

    constructor(init?: Partial<Experiment>) {
        Object.assign(this, init);
    }

    UpdateLock(): Experiment {
        this.lock = !this.lock
        return this
    }

    static LoadItems(): Experiment[] {
        return JSON.parse(localStorage.getItem(Experiment.storage_key) || "[]");
    }

    static LoadItem(key: string): Experiment | undefined {
        return Experiment.LoadItems().find(e => e.id === key);
    }

    SaveItem(): void {
        const styles: Experiment[] = Experiment.LoadItems();
        styles.push(this);
        localStorage.setItem(Experiment.storage_key, JSON.stringify(styles));
    }

    SaveItems(items: Experiment[]): void {
        localStorage.setItem(Experiment.storage_key, JSON.stringify(items));
    }

    static ClearItems(): void {
        localStorage.clear();
    }

    static New(titleText: string, wellType: WellType): Experiment {
        const ex = new Experiment({
            id: hash(),
            name: titleText,
            no: Experiment.LoadItems().length,
            well: getWell(wellType)!,
            create_at: now(),
            update_at: now(),
            count: 0,
            lock: false,
            version: 0,
            sheets: [],
        })
        ex.SaveItem()
        return ex
    }

    AddSheet(titleText: string): Sheet {
        const sheet = new Sheet({
            id: hash(),
            parent_id: this.id,
            name: titleText,
            no: this.sheets.length,
            lock: false,
            well: this.well!,
            version: 0,
            cells: [],
            theme: DEFAULT_THEME,
            style: DEFAULT_STYLE,
            create_at: now(),
            update_at: now(),
            delete: false,
        })
        this.sheets.push(sheet)
        this.SaveItem()
        return sheet
    }
}