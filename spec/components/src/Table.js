import { Component } from "../../../src/Component.js";
import h from "snabbdom/h";

export class Table extends Component {
    render() {
        return h("div.table-responsive", this.getTable());
    }

    getTable() {
        return h("table", [this.getHeader(), this.getBody(), this.getFooter()]);
    }

    getHeader() {
        return null;
    }

    getBody() {
        return null;
    }

    getFooter() {
        return null;
    }
}

customElements.define("sc-table", Table);
