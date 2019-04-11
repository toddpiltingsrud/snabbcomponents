import Component from "./Component";
import h from "snabbdom/h";

class Table extends Component {
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

export default Table;

customElements.define("jwc-table", Table);
