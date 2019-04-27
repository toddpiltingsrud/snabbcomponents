import Component from "../index.js";

describe("Component", function() {
    it("should read search", function() {
        var url = "?a=b&a=c&d=2";

        var attr = Component.prototype.readSearch(url);

        expect(Array.isArray(attr.a)).toEqual(true);
    });

    it("should read search", function() {
        var url = "a=b&a=c&D=2&e=&f";

        var attr = Component.prototype.readSearch(url);

        expect(Array.isArray(attr.a)).toEqual(true);

        expect(attr.a[0]).toEqual("b");
        expect(attr.a[1]).toEqual("c");
        expect(attr.d).toEqual("2");
        expect(attr.D).toBeUndefined();
        expect(attr.e).toEqual(null);
        expect(attr.f).toEqual(null);
    });

    it("should read search", function() {
        var url = "";

        var attr = Component.prototype.readSearch(url);

        expect(attr).toBeDefined(true);
    });

    it("should decode", function() {
        var url = "?a=this+is+a+test";

        var attr = Component.prototype.readSearch(url);

        expect(attr.a).toEqual("this is a test");
    });

    it("should decode", function() {
        var set1 = ";,/?:@&=+$";
        var encoded = "%3B%2C%2F%3F%3A%40%26%3D%2B%24";
        var url = "?arg=" + encoded;
        var attr = Component.prototype.readSearch(url);
        expect(attr.arg).toEqual(set1);
    });

    it("should trigger custom events", function(done) {
        const eventname = "customeventname";
        const detail = "the detail of the event";

        class EventTest extends Component {
            render(h) {
                return super.render(h);
            }
        }

        customElements.define("event-test", EventTest);

        const handler = function(evt) {
            expect(evt.detail).toEqual(detail);
            document.body.removeChild(app);
            done();
        };

        const app = document.createElement("event-test");

        document.body.appendChild(app);

        document.addEventListener(eventname, handler);

        app.triggerEvent(eventname, detail);
    });

    it("should throw if setState is called during render cycle", function() {
        let didThrow = false;
        class badComponent extends Component {
            componentDidUpdate(nextProps, nextState) {
                try {
                    this.setState({});
                } catch {
                    didThrow = true;
                }
            }

            componentDidMount() {
                this.setState({});
            }
        }
        customElements.define("spents-setstateincorrectly", badComponent);

        const bad = document.createElement("spents-setstateincorrectly");
        document.body.appendChild(bad);

        expect(didThrow).toEqual(true);

        document.body.removeChild(bad);
    });

    it("should throw if setProps is called during render cycle", function() {
        let didThrow = false;
        class badComponent extends Component {
            componentDidUpdate(nextProps, nextState) {
                try {
                    this.setProps({});
                } catch {
                    didThrow = true;
                }
            }
            componentDidMount() {
                this.setState({});
            }
        }
        customElements.define("spents-setpropsincorrectly", badComponent);

        const bad = document.createElement("spents-setpropsincorrectly");
        document.body.appendChild(bad);

        expect(didThrow).toEqual(true);

        document.body.removeChild(bad);
    });

    it("should handle event delegation", function() {
        let handled = 0;

        class comp2 extends Component {
            handleClick(evt, target) {
                handled++;
                expect(target).toBeDefined();
            }
            componentDidMount() {
                this.on("click", ".btn", this.handleClick);
            }
            render(h) {
                return h("div", [
                    h("button.btn.button1"),
                    h("button.btn.button2")
                ]);
            }
        }

        customElements.define("spents-comp2", comp2);

        const instance = document.createElement("spents-comp2");
        document.body.appendChild(instance);

        const button1 = instance.querySelector("button.button1");
        const button2 = instance.querySelector("button.button2");
        button1.click();
        button2.click();

        expect(instance.eventHandlers.length).toEqual(1);
        expect(handled).toEqual(2);

        document.body.removeChild(instance);

        expect(instance.eventHandlers.length).toEqual(0);
    });

    it("should not supplant", function() {
        class c extends Component {
            constructor() {
                super();
                this.supplant = false;
            }
        }
        customElements.define("spents-shouldnotsupplant", c);

        const instance = document.createElement("spents-shouldnotsupplant");

        document.body.appendChild(instance);

        const element = document.querySelector("spents-shouldnotsupplant");

        expect(element).toBeDefined();

        document.body.removeChild(instance);
    });

    it("should supplant", function() {
        class c extends Component {
            constructor() {
                super();
                this.supplant = true;
            }
        }
        customElements.define("spents-shouldsupplant", c);

        const instance = document.createElement("spents-shouldsupplant");

        document.body.appendChild(instance);

        const element = document.querySelector("spents-shouldsupplant");

        expect(element).toEqual(null);
    });

    it("should pass props from parent to child", function() {
        const data = [1, 2, 3];

        class parent extends Component {
            render(h) {
                return h(
                    "div",
                    h("spents-child", {
                        props: {
                            data
                        }
                    })
                );
            }
        }

        class child extends Component {
            render(h) {
                return h("ul", this.props.data.map(item => h("li", {}, item)));
            }
        }

        customElements.define("spents-parent", parent);
        customElements.define("spents-child", child);

        const instance = document.createElement("spents-parent");

        document.body.appendChild(instance);

        var list = instance.querySelectorAll("li");

        for (let i = 0; i < data.length; i++) {
            expect(list[i].textContent).toEqual(data[i].toString());
        }

        document.body.removeChild(instance);
    });
});
