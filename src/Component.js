import * as snabbdom from "snabbdom";

const Component = class extends HTMLElement {
    constructor(selector, props) {
        super();
        this.root = this;
        this.state = {};
        this.props = {};
        this.srch = this.readSearch();
        this.shadow = null;
        this.shadowMode = null;
        this.currentVNode = this;
        this.previousState = null;
        this.previousProps = null;
        this.connecting = false;
        this.rendering = false;
        this.eventHandlers = [];
    }

    getPatch() {
        // override this method to initialize snabbdom with other modules
        return snabbdom.init([require("snabbdom/modules/props").default]);
    }

    bind(fns) {
        const self = this;
        const proto = Object.getPrototypeOf(this);
        const keys = Object.getOwnPropertyNames(proto);
        fns.forEach(function(f) {
            keys.forEach(function(key) {
                if (self[key] === f) {
                    self[key] = f.bind(self);
                }
            });
        });
    }

    decode(str) {
        if (str) {
            return decodeURIComponent(str.replace(/\+/g, " "));
        }
        return null;
    }

    readSearch(arg) {
        let p,
            search = arg || window.location.search;
        const srch = {},
            self = this;

        if (search) {
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }
            const items = search.split("&");
            items.forEach(function(item) {
                p = item.split("=");

                if (p[0]) {
                    // URL's should be user-friendly, so avoid case-sensitive parameter names
                    // if you need case-sensitive URL parameters, override this function
                    let name = p[0].toLowerCase();
                    let val = self.decode(p[1]);
                    if (name in srch) {
                        if (!Array.isArray(srch[name])) {
                            srch[name] = [srch[name]];
                        }
                        srch[name].push(val);
                    } else {
                        srch[name] = val;
                    }
                }
            });
        }
        return srch;
    }

    readAttributes(node) {
        var config = {},
            node = node || this,
            name,
            attr,
            attrs = node.attributes,
            trueFalse = /true|false/i;
        for (var i = attrs.length - 1; i >= 0; i--) {
            attr = attrs[i];
            name = attr.name.toLowerCase().replace("-", "");
            // convert "true", "false" and empty to boolean
            config[name] =
                trueFalse.test(attr.value) || attr.value === ""
                    ? attr.value === "true" || attr.value === ""
                    : attr.value;
        }
        return config;
    }

    // state management

    throwIfRendering() {
        if (this.rendering) {
            throw new Error(
                "setState and setProps cannot be called during the render cycle."
            );
        }
    }

    setState(nextState) {
        this.throwIfRendering();

        const newState = {
            ...this.state,
            ...nextState
        };

        const shouldUpdate = this.shouldComponentUpdate(this.props, newState);

        this.previousState = this.state;

        this.state = newState;

        if (shouldUpdate && !this.connecting) {
            this.parseTemplate();
        }
    }

    setProps(nextProps) {
        this.throwIfRendering();

        const shouldUpdate = this.shouldComponentUpdate(nextProps, this.state);

        this.previousProps = this.props;

        this.props = nextProps;

        if (shouldUpdate && !this.connecting) {
            this.parseTemplate();
        }
    }

    // event handling

    triggerEvent(name, detail) {
        var event = new CustomEvent(name, {
            detail: detail,
            bubbles: true
        });
        this.dispatchEvent(event);
    }

    on(name, fnOrSelector, fn) {
        let self = this,
            handler = typeof fnOrSelector === "function" ? fnOrSelector : fn;
        const selector = typeof fnOrSelector === "string" ? fnOrSelector : null;
        if (selector) {
            // event delegation
            handler = function(evt) {
                const target = evt.target.closest(selector);
                if (target && self.root.contains(target)) {
                    fn.call(self, evt, target);
                }
            };
        }
        this.root.addEventListener(name, handler);
        this.eventHandlers.push({
            name,
            fnOrSelector,
            fn,
            handler
        });
    }

    off(name, fnOrSelector, fn) {
        // remove it from the array
        let eh;
        for (var i = 0; i < this.eventHandlers.length; i++) {
            eh = this.eventHandlers[i];
            if (
                eh.name === name &&
                eh.fnOrSelector === fnOrSelector &&
                eh.fn === fn
            ) {
                this.root.removeEventListener(eh.name, eh.handler);
                this.eventHandlers.splice(i, 1);
                return;
            }
        }
        console.warn("Event handler not found: ", name);
    }

    clearEventHandlers() {
        while (this.eventHandlers.length) {
            let eh = this.eventHandlers.shift();
            this.root.removeEventListener(eh.name, eh.handler);
        }
    }

    // life cycle methods

    deriveStateFromProps() {
        const derivedState = this.constructor.getDerivedStateFromProps(
            this.props,
            this.state
        );
        if (derivedState) {
            this.state = derivedState;
        }
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(previousProps, previousState) {}

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return snabbdom.h("div");
    }

    parseTemplate() {
        try {
            this.rendering = true;
            this.deriveStateFromProps();
            const newVNode = this.render(snabbdom.h);
            this.patch(this.currentVNode, newVNode);
            this.currentVNode = newVNode;
            this.componentDidUpdate(this.previousProps, this.previousState);
        } catch (e) {
            throw e;
        } finally {
            this.rendering = false;
        }
    }

    getRoot() {
        let root = this;
        if (this.shadowMode) {
            root = this.attachShadow({ mode: this.shadowMode });
        }
        // add a div inside the root so snabbdom doesn't replace the custom element
        // this is mandatory if shadow DOM is enabled
        // because snabbdom will error out if the shadow is used as the starting vnode
        // (because it's a document fragment, not an HTMLElement)
        this.currentVNode = document.createElement("div");
        root.appendChild(this.currentVNode);
        return root;
    }

    // web component hooks

    connectedCallback() {
        try {
            this.connecting = true;
            this.patch = this.getPatch();
            const attr = this.readAttributes();
            this.props = {
                ...this.props,
                ...attr
            };
            this.root = this.getRoot();
            this.parseTemplate();
            this.componentDidMount();
        } catch (e) {
            throw e;
        } finally {
            this.connecting = false;
        }
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        const attr = this.readAttributes();
        const props = {
            ...this.props,
            ...attr
        };
        this.setProps(props);
    }

    disconnectedCallback() {
        this.componentWillUnmount();
        this.clearEventHandlers();
    }
};

export default Component;
