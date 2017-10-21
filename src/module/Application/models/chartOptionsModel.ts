export class ChartOption {
    constructor(
        public label: string,
        public value: ChartOptionValue,
    ) {}
}

export class ChartOptionValue {
    constructor(
        public name: string,
        public field: string,
    ) {}
}