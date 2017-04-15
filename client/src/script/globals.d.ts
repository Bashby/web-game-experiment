declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// export class Stats {
//     REVISION: number;
//     dom: HTMLDivElement;

//     /**
//      * @param value 0:fps, 1: ms, 2: mb, 3+: custom
//      */
//     showPanel(value: number): void;
//     begin(): void;
//     end(): number;
//     update(): void;
// }