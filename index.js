import h from "virtual-dom/h";
import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";
import createElement from "virtual-dom/create-element";
import createVNode from "vdom-virtualize";

/*
I once tried to convert this project to TypeScript.
This doesn't work because the syntax of the ES2015 class is required by the web component standard.
Prototype-based inheritance fails for the same reason.
*/

export default class Component extends HTMLElement {
    constructor() {
        super();
        this.root = this;
        this.state = {};
        this.props = {};
        this.srch = this.readSearch();
        this.shadowMode = null;
        this.currentVNode = this;
        this.previousState = null;
        this.previousProps = null;
        this.connecting = false;
        this.rendering = false;
        this.eventHandlers = [];
        this.supplant = false;
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
        return str ? decodeURIComponent(str.replace(/\+/g, " ")) : null;
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
        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(previousProps, previousState) {}

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return h("div");
    }

    parseTemplate() {
        try {
            this.rendering = true;
            this.deriveStateFromProps();
            const newVNode = this.render(h);
            const patches = diff(this.currentVNode, newVNode);
            patch(this.root, patches);
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
        this.currentVNode = this.render(h);

        // can't replace the shadow with an HTML element
        if (this.shadowMode && !this.supplant) {
            root = this.attachShadow({ mode: this.shadowMode });
            root.appendChild(createElement(this.currentVNode));
        } else if (!this.shadowMode && this.supplant) {
            const rootVNode = createVNode(root);
            const patches = diff(rootVNode, this.currentVNode);
            patch(root, patches);
        } else if (!this.shadowMode && !this.supplant) {
            root.appendChild(createElement(this.currentVNode));
        } else if (this.shadowMode && this.supplant) {
            throw new Error("Cannot supplant shadow");
        }

        return root;
    }

    // web component hooks

    connectedCallback() {
        try {
            this.connecting = true;
            const attr = this.readAttributes();
            this.props = {
                ...this.props,
                ...attr
            };
            this.root = this.getRoot();
        } catch (e) {
            throw e;
        } finally {
            this.connecting = false;
            this.componentDidMount();
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
}
