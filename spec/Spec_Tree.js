describe("Tree", function() {
    it("Tree class should exist", function() {
        expect(Tree).toBeDefined();
    });

    it("Tree should take a template", function() {
        var instance = new Tree({
            div: {}
        });

        expect(instance).toBeDefined();

        expect(instance.template.div).toBeDefined();
    });

    it("Tree.getType", function() {
        var instance = new Tree({
            div: {}
        });

        let type = instance.getType(null);
        expect(type).toEqual(null);

        type = instance.getType(new Date());
        expect(type).toEqual("scalar");

        type = instance.getType({});
        expect(type).toEqual("object");

        type = instance.getType([]);
        expect(type).toEqual("array");

        type = instance.getType(5.1);
        expect(type).toEqual("scalar");

        type = instance.getType("abc123");
        expect(type).toEqual("scalar");

        type = instance.getType(true);
        expect(type).toEqual("scalar");

        type = instance.getType(function() {});
        expect(type).toEqual("function");
    });

    it("Tree.getNodeType", function() {
        var instance = new Tree({
            div: {}
        });

        let type = instance.getNodeType(null);
        expect(type).toEqual(type, null);

        type = instance.getNodeType({}, "text");
        expect(type).toEqual("text");

        let template = { div: null };
        type = instance.getNodeType(template, "div");
        expect(type).toEqual(null);

        template = { div: {} };
        type = instance.getNodeType(template, "div");
        expect(type).toEqual("element");

        template = { div: [] };
        type = instance.getNodeType(template, "div");
        expect(type).toEqual("arrayOfElement");

        template = { onclick: function() {} };
        type = instance.getNodeType(template, "onclick");
        expect(type).toEqual("eventHandler");

        template = { href: "https://somedomain.com" };
        type = instance.getNodeType(template, "href");
        expect(type).toEqual("attribute");

        template = { readonly: true };
        type = instance.getNodeType(template, "readonly");
        expect(type).toEqual("attribute");

        template = { max: 5 };
        type = instance.getNodeType(template, "max");
        expect(type).toEqual("attribute");

        template = { max: null };
        type = instance.getNodeType(template, "max");
        expect(type).toEqual(null);
    });

    it("Tree.createElement", function() {
        var instance = new Tree({
            div: {}
        });

        let template = { div: {} };
        let node = instance.createElement(template, "div");
        expect(node.type).toEqual("element");
        expect(node.name).toEqual("div");
        expect(node.children.length).toEqual(0);

        template = {
            div: {
                span: {}
            }
        };
        node = instance.createElement(template, "div");
        expect(node.type).toEqual("element");
        expect(node.name).toEqual("div");
        expect(node.children.length).toEqual(1);

        node = node.children[0];
        expect(node.type).toEqual("element");
        expect(node.name).toEqual("span");
        expect(node.children.length).toEqual(0);
    });

    it("Tree.createArrayOfElement", function() {
        var instance = new Tree();

        let template = { div: [] };
        let nodes = instance.createArrayOfElement(template, "div");
        expect(nodes.length).toEqual(0);

        template = {
            div: [{}, {}]
        };

        nodes = instance.createArrayOfElement(template, "div");
        expect(nodes.length).toEqual(2);

        nodes.forEach(function(node) {
            expect(node.type).toEqual("element");
            expect(node.name).toEqual("div");
            expect(node.children.length).toEqual(0);
        });
    });

    it("Tree.createAttribute", function() {
        const instance = new Tree();

        let template = { href: "https://somedomain.com" };
        let node = instance.createAttribute(template, "href");
        expect(node.type).toEqual("attribute");
        expect(node.name).toEqual("href");
        expect(node.value).toEqual("https://somedomain.com");
    });

    it("Tree.createEventHandler", function() {
        const instance = new Tree();

        let template = { onclick: function() {} };
        let node = instance.createEventHandler(template, "onclick");
        expect(node.type).toEqual("eventHandler");
        expect(node.name).toEqual("click");
        expect(node.value).toEqual(template.onclick);
    });

    it("Tree.createTextContent", function() {
        const instance = new Tree();

        let template = { text: "abc123" };
        let node = instance.createTextContent(template, "text");
        expect(node.type).toEqual("text");
        expect(node.value).toEqual("abc123");
    });

    it("Tree.parseObject", function() {
        const instance = new Tree();

        let template = {
            section: {
                id: "main",
                div: [
                    {
                        class: "firstDiv",
                        text: "abd123",
                        span: {
                            text: "def456"
                        }
                    },
                    {
                        class: "secondDiv",
                        button: {
                            text: "click here",
                            onclick: function() {
                                alert("clicked!");
                            }
                        }
                    },
                    "third div"
                ]
            },
            footer: {
                text: "the footer"
            }
        };
        let parsedObject = instance.parseObject(template);

        expect(parsedObject.length).toEqual(2);

        const section = parsedObject[0];

        expect(section.children.length).toEqual(
            4,
            "section element should have 4 children"
        );

        let firstDiv = section.children[1];
        expect(firstDiv.children[0].type).toEqual("attribute");
        expect(firstDiv.children[0].name).toEqual("class");
        expect(firstDiv.children[0].value).toEqual("firstDiv");

        let secondDiv = section.children[2];
        expect(secondDiv.children[0].type).toEqual("attribute");
        expect(secondDiv.children[0].name).toEqual("class");
        expect(secondDiv.children[0].value).toEqual("secondDiv");

        let button = secondDiv.children[1];
        expect(button.children[0].type).toEqual("text");
        expect(button.children[0].value).toEqual("click here");

        let onclick = button.children[1];
        expect(onclick.type).toEqual("eventHandler");
        expect(onclick.name).toEqual("click");

        const footer = parsedObject[1];
        expect(footer.children.length).toEqual(
            1,
            "footer element should have 1 child"
        );
        expect(footer.children[0].type).toEqual("text");
        expect(footer.children[0].value).toEqual("the footer");
    });

    it("Tree.parseObject", function() {
        const instance = new Tree();

        expect(stops).toBeDefined("make sure our data exists");

        let template = {
            table: {
                id: "main",
                tbody: {
                    tr: function() {
                        return stops.map(function(item) {
                            return {
                                td: item
                            };
                        });
                    }
                }
            }
        };

        let parsedObject = instance.parseObject(template);
    });

    it("should set keys", function() {
        expect(stops).toBeDefined("make sure our data exists");

        const template = {
            table: {
                id: "main",
                tbody: {
                    tr: function() {
                        return stops.map(function(item) {
                            return {
                                key: item[0],
                                td: item
                            };
                        });
                    }
                }
            }
        };

        const instance = new Tree(template);

        const tree = instance.getTree();

        const tr = getElementByName(tree, "tr");

        expect(tr.key).toBeDefined();
    });

    it("svg and children should have svg namespace", function() {
        const instance = new Tree();

        let template = {
            div: {
                id: "theDiv",
                svg: {
                    circle: {
                        r: "19px",
                        cx: "24px",
                        cy: "24px"
                    }
                },
                div: {
                    id: "siblingDiv"
                },
                svg: {
                    circle: [
                        {
                            r: "19px",
                            cx: "24px",
                            cy: "24px"
                        },
                        {
                            r: "19px",
                            cx: "24px",
                            cy: "24px"
                        }
                    ]
                }
            }
        };

        let parsedObject = instance.parseObject(template);
        let inSvg = false;
        const svgNamespace = "http://www.w3.org/2000/svg";

        const recurseTemplate = function(children) {
            children.forEach(function(item) {
                if (item.type === "element" && item.name === "svg") {
                    inSvg = true;
                }
                if (item.type === "element" && inSvg) {
                    expect(item.xmlns).toEqual(svgNamespace);
                } else {
                    expect(item.xmlns).not.toEqual(svgNamespace);
                }
                if (item.children) {
                    recurseTemplate(item.children);
                }
                if (item.type === "element" && item.name === "svg") {
                    inSvg = false;
                }
            });
        };

        recurseTemplate(parsedObject);
    });

    it("should process explicit 'children' property", function() {
        const instance = new Tree();

        let template = {
            DIV: {
                children: [
                    { DIV: { text: "first div" } },
                    { SPAN: { text: "middle span" } },
                    { DIV: { text: "last div" } }
                ]
            }
        };

        let tree = instance.parseObject(template);

        expect(tree[0].children[0].type).toEqual("element");
        expect(tree[0].children[1].type).toEqual("element");
        expect(tree[0].children[2].type).toEqual("element");
        expect(tree[0].children[0].name).toEqual("div");
        expect(tree[0].children[1].name).toEqual("span");
        expect(tree[0].children[2].name).toEqual("div");
    });

    it("should process Date instances as scalar", function() {
        const instance = new Tree();

        let template = {
            DIV: [new Date()]
        };

        let tree = instance.parseObject(template);

        expect(tree[0].children[0].type).toEqual("scalar");
    });
});

function getElementByName(tree, name) {
    let i,
        element = null;

    for (i = 0; i < tree.length; i++) {
        if (tree[i].name === name) {
            return tree[i];
        }
    }

    for (i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            element = getElementByName(tree[i].children, name);
            if (element) {
                return element;
            }
        }
    }

    return element;
}
