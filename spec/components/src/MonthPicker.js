import { Table } from "./Table.js";
import h from "snabbdom/h";

export class MonthPicker extends Table {
    constructor() {
        super();

        this.shadowMode = "open";

        const d = new Date();

        this.state = {
            year: d.getFullYear(),
            month: d.getMonth() + 1
        };

        this.bind([this.getHeader, this.getMonthRows]);
    }

    componentDidMount() {
        this.on("click", "a.month", function(evt, target) {
            var month = parseInt(target.value, 10);
            this.setState({ month });
        });
        this.on("click", "a.year", function(evt, target) {
            var year = parseInt(target.value, 10);
            this.setState({ year });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.year !== nextState.year ||
            this.state.month !== nextState.month
        );
    }

    componentDidUpdate() {
        this.setValue();
        const detail = Object.assign({}, this.state);
        this.triggerEvent("change", detail);
    }

    setValue() {
        this.setAttribute(
            "value",
            this.state.month.toString() + "/" + this.state.year.toString()
        );
    }

    getMonthNames() {
        let date;
        const names = [];
        const locale = this.props.locale || "en-us";
        for (var i = 0; i < 12; i++) {
            date = new Date(2019, i, 1);
            names.push(date.toLocaleString(locale, { month: "short" }));
        }
        return names;
    }

    // overrides from Table.js

    getTable() {
        return [
            super.getTable(),
            h(
                "style",
                { props: { type: "text/css" } },
                "div.table-responsive { font-family:sans-serif; text-align: center; border: solid 1px #ddd; display:inline-block; }" +
                    " a { color:black; display: block; text-decoration:none; padding: 5px; border:solid 1px transparent }" +
                    " a.selected { background-color: #e0e0ff; border:solid 1px #cccccc }" +
                    " thead td { padding:5px 5px 0 5px; }" +
                    " thead td:last-child { padding-left:0; }" +
                    " tbody td { padding-top: 5px;padding-left:5px; }" +
                    " tbody td:last-child { padding-right: 5px; }" +
                    " tbody tr:last-child td { padding-bottom:5px; }"
            )
        ];
    }

    getHeader() {
        return h("thead", [
            h("tr", [
                h("th", [
                    h(
                        "a.year",
                        {
                            props: {
                                value: this.state.year - 1,
                                href: "javascript:void(0);"
                            }
                        },
                        "<"
                    )
                ]),
                h(
                    "th.month-picker-year",
                    {
                        props: {
                            colSpan: 2
                        }
                    },
                    this.state.year
                ),
                h("th", [
                    h(
                        "a.year",
                        {
                            props: {
                                value: this.state.year + 1,
                                href: "javascript:void(0);"
                            }
                        },
                        ">"
                    )
                ])
            ])
        ]);
    }

    getBody() {
        const self = this;
        const arr = [];
        const months = this.getMonthNames();
        const rows = [0, 1, 2];
        const cols = [1, 2, 3, 4];

        return h(
            "tbody",
            rows.map(function(row) {
                return h(
                    "tr",
                    cols.map(function(col) {
                        const m = row * 4 + col;
                        return h(
                            "td",
                            h(
                                "a.btn btn-default month" +
                                    (self.state.month === m ? " selected" : ""),
                                {
                                    props: {
                                        value: m,
                                        href: "javascript:void(0)"
                                    }
                                },
                                months[m - 1]
                            )
                        );
                    })
                );
            })
        );
    }
}

customElements.define("sc-monthpicker", MonthPicker);
