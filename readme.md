# spents

This is a web component micro-library built on top of [snabbdom](https://github.com/snabbdom/snabbdom) and the [web component standard](https://www.webcomponents.org/specs).

I wanted to create a development experience similar to [React](https://reactjs.org/) so my colleagues wouldn't have to learn a new library. So it uses many of the same strategies/patterns as React, including:

-   Inheriting from a `Component` class to create components
-   Overriding a `render` function to return the template
-   A `setState` function that triggers re-rendering

Also supported are most of React's lifecycle functions:

-   getDerivedStateFromProps()
-   shouldComponentUpdate()
-   componentDidUpdate()
-   componentDidMount()
-   componentWillUnmount()

## Advantages Over React

-   Much smaller footprint (9kb minified).
-   Inheritance actually works. Build base components, inherit from them, and override their methods to extend them. (Inheritance does NOT work in React.)
-   Components run on top of the [web component standard](https://www.webcomponents.org/specs). To run a component, just add it to the page.
-   [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom): Components can be optionally configured to execute in their own isolated sandbox so their styling and inner workings don't bleed over into the rest of the page and vice-versa.

## Utility functions

-   `bind(fns)`: Pass an array of functions to bind their context to the component.
-   `triggerEvent(name, detail)`: Dispatch a custom event with an optional detail payload from the component.
-   `on(name, selector, fn`: Add an event handler using event delegation. Event handlers added with `on` will automatically be removed when the component is disconnected from the DOM.
-   `off(name, selector, fn)`: Remove an event handler add with `on`.

## Why

The use case for spents is to provide a more structured way of introducing dynamic behavior into traditional server-rendered web applications. Server-rendered web applications still tend to be the domain of jQuery. The problem with jQuery and similar libraries is that there is no formal mechanism for creating and managing data-driven behaviors. I typically see JavaScript that binds event handlers directly to DOM elements which then make changes directly to the DOM when those handlers are triggered. This tightly couples behaviors to specific DOM elements, making the page hard to change and easy to break.

By introducing a small web component library built on the web component standard which also has virtual DOM capabilities, we can begin to replace loose jQuery-based scripts with web components, giving us more structure, capability, reliability, and reusability. I also like being able to output a custom HTML tag from a server-rendered view and have the browser execute it automatically. No external bootstrapping required, very clean.
